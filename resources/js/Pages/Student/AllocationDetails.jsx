import { router, usePage } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";

function AllocationDetails({ studentDetails, details, otherRecords }) {
  const { auth } = usePage().props;
  console.log(otherRecords);

  return <section id="allocation" className="m-4">
    <h3 className="mt-4 mb-3">Allocation Details</h3>
    <h5 className="mb-4 h5">Personal Information</h5>
    <div className="grid-layout">
      <div>
        <h6>Full Name</h6>
        {auth.user.name}
      </div>
      <div>
        <h6>Admin No</h6>
        {studentDetails.admin_no}
      </div>
      <div>
        <h6>Contact No</h6>
        {auth.user.contact}
      </div>
      <div>
        <h6>Lecturer in Charge</h6>
        {details.lecturer_name}
      </div>
      <div>
        <h6>Contact No</h6>
        {details.lecturer_contact}
      </div>
    </div>

    {details.detail_type == "Internship" && (
      <>
        <h5 className="mb-4 mt-5 h5">Company Information</h5>
        <div className="grid-layout2">
          <div>
            <h6>Job Title</h6>
            {details.job_title}
          </div>
          <div>
            <h6>Company Name</h6>
            {details.company_name}
          </div>
          <div>
            <h6>Salary</h6>
            ${details.salary}
          </div>
          <div>
            <h6>Location</h6>
            {details.location}
          </div>
        </div>
      </>

    )}
    {details.detail_type == "Prism" && (
      <>
        <h5 className="mb-4 mt-5 h5">Project Information</h5>
        <div className="grid-layout2">
          <div>
            <h6>Project Title</h6>
            {details.project_name}
          </div>
          <div>
            <h6>Project Type</h6>
            {details.project_type}
          </div>
        </div>
      </>
    )}

    <h5 className="mb-4 mt-5 h5">Other Students Allocation</h5>
    <table className="w-100">
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Admin No</th>
          <th>Resume Upload Status</th>
          <th>Download Resume</th>
        </tr>
      </thead>
      <tbody>
        {otherRecords ? otherRecords.map((record) => {
          return (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.student.name}</td>
              <td>{record.student.admin_no}</td>
              <td>{record.student.resume_status == 0 ? <>Not Uploaded</> : <>Uploaded</>}</td>
              <td> {record.student.resume_status == 0 ? <>No resume</> : <button className="download-btn"
                onClick={() => {
                  const downloadUrl = `api/download/${record.student.resume_name}.pdf`;
                  window.open(downloadUrl, '_blank');
                }}
              >
                Download
              </button>} </td>
            </tr>
          )

        }) : <tr aria-rowspan={4} className="text-center align-middle fs-5">No record found</tr>}
      </tbody>
    </table>

    <div className="d-flex justify-content-end mt-3">
      <button
        onClick={() => {
          router.get(
            `main`
          );
        }}
      >
        Back to Home
      </button>
    </div>
    <br></br>
  </section>
}

export default AllocationDetails;