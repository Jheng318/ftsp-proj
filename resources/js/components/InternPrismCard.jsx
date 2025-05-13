import Card from "react-bootstrap/Card";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";

function InternPrismCard({ sortedRecords, prism }) {
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
        } = internship;
        const editedDesc = description.split(".");

        return (
          <a
            href={`/ftsp-proj/detailed-info/${id}?tab=intern`}
            key={id}
            style={{ textDecoration: "none" }}
          >
            <Card style={{ width: "100%", cursor: "pointer" }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                  <span>Posted {created_at}</span>
                  <span className="dot">&#x2022;</span>
                  {company_name}
                </Card.Subtitle>
                <Card.Text>{editedDesc[0]}.</Card.Text>
                <section
                  className="d-flex align-items-center"
                  id="contact_salary"
                >
                  <div>
                    <img
                      src={personIcon}
                      alt="personIcon"
                    />
                    {user_name}
                  </div>
                  <div>
                    <img
                      src={salaryIcon}
                      alt="salaryIcon"
                    />
                    ${salary}
                  </div>
                </section>
              </Card.Body>
            </Card>
          </a>
        );
      })
    )
  } else {
    return (
      sortedRecords.map((project) => {
        const {
          id,
          title,
          created_at,
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
            <Card style={{ width: "100%", cursor: "pointer" }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                  <span>Posted {created_at}</span>
                  <span className="dot">&#x2022;</span>
                  {type}
                </Card.Subtitle>
                <Card.Text>{editedDesc[0]}.</Card.Text>
                <section
                  className="d-flex align-items-center"
                  id="contact_salary"
                >
                  <div>
                    <img
                      src={personIcon}
                      alt="personIcon"
                    />
                    {user_name}
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

export default InternPrismCard;