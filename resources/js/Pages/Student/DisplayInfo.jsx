import { useState, useMemo } from "react";
import InternPrismCard from "@/js/components/InternPrismCard";
import SortControl from "@/js/components/SortControl";
import InternPrismCard2 from "../../components/InternPrismCard2";
import DisplayInfomation from "../../components/DisplayInformation";

function DisplayInfo({ allInternships, allPrisms, specificInternship, specificPrism, activeTab }) {

  const [activatedTab, setActivatedTab] = useState(activeTab);
  const [sortDir, setSortDir] = useState("");

  const currentData =
    activatedTab == "intern" ? allInternships : allPrisms;

  function toggleActive(tab) {
    setActivatedTab(tab);
  }

  const DisplayData = ({ data, sortDir, prism }) => {
    if (prism) {
      const sortedRecords = useMemo(
        () => data.sort((a, b) => {
          switch (sortDir) {
            case "newest":
              return new Date(b.end_date) - new Date(a.start_date);
            case "oldest":
              return new Date(a.end_date) - new Date(b.start_date);
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
              return new Date(b.end_date) - new Date(a.start_date);
            case "oldest":
              return new Date(a.end_date) - new Date(b.start_date);
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
        <div className="toggle" style={{ margin: '0', cursor: "pointer" }}>
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
        <DisplayInfomation specificInternship={specificInternship} specificPrism={specificPrism}></DisplayInfomation>
      </div>
    </div>

  </section>

}

export default DisplayInfo;