import Card from "react-bootstrap/Card";
import { useState, useMemo } from "react";
import InternPrismCard from "@/js/components/InternPrismCard";
import SortControl from "@/js/components/SortControl";
import InternPrismCard2 from "../../components/InternPrismCard2";

function DisplayInfo({ allInternships, allPrisms, specificInternship, specificPrism, activeTab }) {

  const [activatedTab, setActivatedTab] = useState(activeTab);
  const [sortDir, setSortDir] = useState("");
  console.log(allInternships);
  console.log(specificInternship);
  const currentData =
    activatedTab == "intern" ? allInternships : allPrisms;

  function toggleActive(tab) {
    setActivatedTab(tab);
  }
  let languages = [];
  let frameworks = [];
  if (specificInternship) {
    languages = specificInternship.languages.split(", ");
    frameworks = specificInternship.frameworks.split(", ");
  }

  const DisplayData = ({ data, sortDir, prism }) => {
    if (prism) {
      const sortedRecords = useMemo(
        () => data.sort((a, b) => {
          switch (sortDir) {
            case "newest":
              return new Date(b.date_created_at) - new Date(a.date_created_at);
            case "oldest":
              return new Date(a.date_created_at) - new Date(b.date_created_at);
          }
        }),
        [sortDir]
      );
      return <InternPrismCard2 sortedRecords={sortedRecords} prism={true}></InternPrismCard2>
    } else {
      const sortedRecords = useMemo(
        () => data.sort((a, b) => {
          switch (sortDir) {
            case "lowtohigh_price":
              return a.salary - b.salary;
            case "hightolow_price":
              return b.salary - a.salary;
            case "newest":
              return new Date(b.date_created_at) - new Date(a.date_created_at);
            case "oldest":
              return new Date(a.date_created_at) - new Date(b.date_created_at);
          }
        }),
        [sortDir]
      );
      return <InternPrismCard2 sortedRecords={sortedRecords} prism={false}></InternPrismCard2>
    }
  }

  return <section id="unallo" style={{ marginLeft: '1rem', marginRight: '1rem', width: 'auto' }}>
    <div className="mt-4 mb-4 d-flex">
      <div className="d-flex align-items-center justify-content-between" style={{ width: '400px' }}>
        <div className="toggle" style={{ margin: '0' }}>
          <div
            className={`intern ${activatedTab == "intern" ? "active" : "inactive"
              }`}
            onClick={() => toggleActive("intern")}
          >
            Internship
          </div>
          <div
            className={`prism ${activatedTab == "prism" ? "active" : "inactive"
              }`}
            onClick={() => toggleActive("prism")}
          >
            Prism
          </div>
        </div>
        <SortControl setSortDir={setSortDir} prism={activatedTab == "intern" ? false : true}></SortControl>
      </div>
    </div>
    <div className="row">
      <div className="col-4" style={{ height: 'fit-content' }}>
        <DisplayData sortDir={sortDir} data={currentData} prism={activatedTab == "intern" ? false : true}></DisplayData>
      </div>
      <div className="col">
        {specificInternship !== undefined && specificPrism == undefined && (
          <Card style={{ width: "100%", margin: "1rem 0", height: "fit-content", position: 'sticky', top: "10px" }}>
            <Card.Body style={{ position: "relative" }}>
              <div style={{ position: "absolute", right: "0" }} className="me-4">
                <h6 className="mb-0">Intern Period</h6>
                <p>{specificInternship.start_date} to {specificInternship.end_date}</p>
              </div>
              <Card.Title>{specificInternship.title}</Card.Title>

              <Card.Subtitle className="mb-2 text-muted">{specificInternship.company_name}</Card.Subtitle>
              <Card.Text>
                <span className="blue">Lecturer in Charge:</span> {specificInternship.user_name}<br />
                <span className="blue">Salary:</span> ${specificInternship.salary} per month<br />
                <span className="blue">Location:</span> {specificInternship.location}
              </Card.Text>
              <h4 className="blue mt-4">Requirements</h4>
              <div className="row">
                <div className="col">
                  <h5 className="mt-2 mb-2 text-muted">Languages</h5>
                  <ul className="m-0">
                    {languages.map((language) => (
                      <li>{language}</li>
                    ))}
                  </ul>
                </div>
                <div className="col">
                  <h5 className="mt-2 mb-2 text-muted">Frameworks</h5>
                  <ul className="m-0">
                    {frameworks.map((framework) => (
                      <li>{framework}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h4 className="blue mt-4">Description</h4>
              <p>{specificInternship.description}</p>
            </Card.Body>
          </Card>
        )
        }
        {specificInternship == undefined && specificPrism == undefined && (
          <Card style={{ width: "100%", margin: "1rem 0", height: "fit-content" }}>
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        )}


      </div>
    </div>

  </section>

}

export default DisplayInfo;