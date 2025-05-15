import Card from "react-bootstrap/Card";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";
import locationIcon from "@/images/location.png";
import dateIcon from "@/images/date.png";

function InternPrismCard2({ sortedRecords, prism }) {
  if (prism == false) {
    return (
      sortedRecords.map((internship) => {
        const {
          id,
          title,
          created_at,
          description,
          company_name,
          salary,
          user_name,
          location,
          start,
          end
        } = internship;
        const editedDesc = description.split(".");

        return (
          <a
            href={`/ftsp-proj/detailed-info/${id}?tab=intern`}
            key={id}
            style={{ textDecoration: "none" }}
          >
            <Card style={{ width: "100%", cursor: "pointer", margin: "1rem 0" }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ margin: "0" }}>{editedDesc[0]}.</Card.Text>
                <section
                  className="d-flex flex-column"
                  id="contact_salary"
                >
                  <div className="d-flex align-items-center mb-2 mt-2">
                    <img
                      src={dateIcon}
                      alt="dateIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>{start} ~ {end}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={salaryIcon}
                      alt="salaryIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>{salary}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={locationIcon}
                      alt="locationIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>{location}</p>
                  </div>
                </section>
              </Card.Body>
            </Card>
          </a>
        );
      })
    )
  } else {
    console.log(sortedRecords);
    return (
      sortedRecords.map((project) => {
        const {
          id,
          title,
          created_at,
          no_of_students,
          start,
          end,
          description,
          type,
          user_name,
        } = project;
        const editedDesc = description.split(".");

        return (
          <a
            href={`/ftsp-proj/detailed-info/${id}?tab=prism`}
            key={id}
            style={{ textDecoration: "none" }}
          >
            <Card style={{ width: "100%", cursor: "pointer", margin: "1rem 0" }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ margin: "0" }}>{editedDesc[0]}.</Card.Text>
                <section
                  className="d-flex flex-column"
                  id="contact_salary"
                >
                  <div className="d-flex align-items-center mb-2 mt-2">
                    <img
                      src={dateIcon}
                      alt="dateIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>{start} ~ {end}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={personIcon}
                      alt="personIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>{no_of_students} students required</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={locationIcon}
                      alt="locationIcon"
                      style={{ width: "30px", objectFit: "contain" }}
                    />
                    <p style={{ margin: "0" }}>Nanyang Polytechnic</p>
                  </div>
                </section>
              </Card.Body>
            </Card>
          </a>
        );
      })
    )
  }
}

export default InternPrismCard2;