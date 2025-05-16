import Card from "react-bootstrap/Card";

function DisplayInfomation({ specificInternship, specificPrism }) {
  {
    let languages = [];
    let frameworks = [];
    if (specificInternship) {
      languages = specificInternship.languages.split(", ");
      frameworks = specificInternship.frameworks.split(", ");
    }

    if (specificInternship !== undefined && specificPrism == undefined) {
      return <Card style={{ width: "100%", margin: "1rem 0", height: "fit-content", position: 'sticky', top: "10px" }}>
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
                {languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
            <div className="col">
              <h5 className="mt-2 mb-2 text-muted">Frameworks</h5>
              <ul className="m-0">
                {frameworks.map((framework, index) => (
                  <li key={index}>{framework}</li>
                ))}
              </ul>
            </div>
          </div>
          <h4 className="blue mt-4">Description</h4>
          <p>{specificInternship.description}</p>
        </Card.Body>
      </Card>
    } 
    
    else if (specificInternship == undefined && specificPrism !== undefined) {
      console.log(specificPrism);
      return <Card style={{ width: "100%", margin: "1rem 0", height: "fit-content", position: 'sticky', top: "10px" }}>
        <Card.Body style={{ position: "relative" }}>
          <div style={{ position: "absolute", right: "0" }} className="me-4">
            <h6 className="mb-0">Intern Period</h6>
            <p>{specificPrism.start_date} to {specificPrism.end_date}</p>
          </div>
          <Card.Title>{specificPrism.title}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">{specificPrism.company_name}</Card.Subtitle>
          <Card.Text>
            <span className="blue">Lecturer in Charge:</span> {specificPrism.user_name}<br />
            <span className="blue">Number of students:</span> {specificPrism.no_of_students}<br />
            <span className="blue">Location:</span> Nanyang Polytechnic
          </Card.Text>
          <h4 className="blue mt-4">Description</h4>
          <p>{specificPrism.description}</p>
        </Card.Body>
      </Card>

    } 
    
    else {
      return <Card style={{ width: "100%", margin: "1rem 0", height: "fit-content", position: 'sticky', top: "10px" }}>
        <Card.Body style={{height: "400px"}}>
          <Card.Title className="d-flex justify-content-center align-items-center h-100 text-black">
            Select an Internship/PRISM Project to view details
          </Card.Title>
        </Card.Body>
      </Card>
    }
  }
}

export default DisplayInfomation;