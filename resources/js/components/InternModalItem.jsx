import { formatDate } from "../reusable";
function InternModalItem({ selectedAllo, closeModal }) {
    const allo = selectedAllo[0];
    return (
        <div className="px-5 py-4">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                <h3 className="text-primary mb-0">{selectedAllo[0].name}</h3>
                <button onClick={closeModal}>&times;</button>
            </div>
            <div className="d-flex justify-content-between position-relative">
                <div className="w-50 ">
                    <p>Description: {allo?.description}</p>
                    <p>Company Name: {allo?.company_name}</p>
                    <p>Location: {allo?.location}</p>
                    <p>Salary: ${allo?.salary}</p>
                    <p>Languages: {allo?.languages}</p>
                    <p>Frameworks: {allo?.frameworks}</p>
                    <p>
                        Internship Period: {formatDate(allo?.start_date)} to{" "}
                        {formatDate(allo?.end_date)}
                    </p>
                </div>
                <div className="w-50 ps-5">
                    <p className="fw-bold">Students</p>
                    <table className="w-100 mb-4">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Admin No</td>
                                <td>GPA</td>
                            </tr>
                        </thead>
                        <tbody>
                            {allo?.student_internship?.map((student) => {
                                return (
                                    <tr key={student.student.admin_no}>
                                        <td>{student.student.name}</td>
                                        <td>{student.student.admin_no}</td>
                                        <td>{student.student.gpa}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <p>Number of Students: {allo?.no_of_students}</p>
                    <p>Teacher in Charge: {allo?.user?.name}</p>
                    <p>GPA Requirement: {allo?.gpa_requirement}</p>
                </div>
            </div>
        </div>
    );
}

export default InternModalItem;
