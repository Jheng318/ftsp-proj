import "@/css/Student/accessdenied.css";


function AccessDenied({status}) {
  return <section id="access-denied" className="d-flex justify-content-center flex-column align-items-center m-5">
    <h1>Access Denied</h1>
    <h4>Unable to access {status.denied == "PRISM" ? "PRISM" : "Internship"} interest form due to one of the following reasons:</h4>
    <ul>
      <li>Assigned Allocation for {status.denied == "PRISM" ? "Internship" : "PRISM"}</li>
      <li>Submission of {status.denied == "PRISM" ? "Internship" : "PRISM"} Interest Form</li>
    </ul>
    <button onClick={() => {
      window.history.back();
    }}>Back to home page</button>
  </section>
}

export default AccessDenied;