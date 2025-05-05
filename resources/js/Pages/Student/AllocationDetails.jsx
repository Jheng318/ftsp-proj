import { router, usePage } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";

function AllocationDetails({ studentDetails, internshipDetails }) {
  const { auth, allocation } = usePage().props;
  console.log(internshipDetails);

  return <section id="allocation" className="ps-4">
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
        {internshipDetails[0].lecturer_name}
      </div>
      <div>
        <h6>Contact No</h6>
        {internshipDetails[0].lecturer_contact}
      </div>
    </div>
    <h5 className="mb-4 mt-5 h5">Company Information</h5>
    <div className="grid-layout2">
      <div>
        <h6>Job Title</h6>
        {internshipDetails[0].job_title}
      </div>
      <div>
        <h6>Company Name</h6>
        {internshipDetails[0].company_name}
      </div>
      <div>
        <h6>Salary</h6>
        ${internshipDetails[0].salary}
      </div>
      <div>
        <h6>Location</h6>
        {internshipDetails[0].location}
      </div>
    </div>
      <button className="d-flex justify-self-end mt-4"
        onClick={() => {
          router.get(
            `main`
          );
        }}
      >
        Back to Home
      </button>
  </section>
}

export default AllocationDetails;