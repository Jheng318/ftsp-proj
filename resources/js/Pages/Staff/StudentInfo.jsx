import Table from "react-bootstrap/Table";
import pencil from "../../images/edit-icon.svg";

function StudentInfo({ students }) {
    console.log(students);
    function handleEdit() {}
    return (
        <section className="w-90">
            <h3 className="text-primary my-5 fw-semibold">
                Student Information
            </h3>
            <Table className="border border-2 border-danger">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Admin No</th>
                        <th>Resume Upload Status</th>
                        <th>GPA</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.admin_no}</td>
                            <td>
                                {student.resume_status
                                    ? "Uploaded"
                                    : "Not Uploaded"}
                            </td>
                            <td>{student.gpa}</td>
                            <td>{student.location}</td>
                            <td>
                                <button onClick={handleEdit}>{pencil}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    );
}

export default StudentInfo;
