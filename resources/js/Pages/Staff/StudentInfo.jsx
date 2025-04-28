import pencil from "@/images/edit-icon.svg";
import { Link } from "@inertiajs/react";

function StudentInfo({ students }) {
    function handleEdit(e) {
        console.log(e.currentTarget.dataset.id);
    }
    return (
        <section className="w-90">
            <h3 className="text-primary my-5 fw-semibold">
                Student Information
            </h3>
            <table className="w-100">
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
                    {students.data.map((student) => (
                        <tr key={student.id}>
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
                                <button
                                    onClick={handleEdit}
                                    data-id={student.id}
                                >
                                    <img
                                        src={pencil}
                                        alt="edit icon"
                                        className="fill-blue"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="7">
                            <div className="d-flex justify-content-end me-5 align-items-center">
                                <p className="mb-0">
                                    {students.current_page}-{students.last_page}{" "}
                                    of {students.last_page}
                                </p>
                                <div className="ms-5 align-items-center d-flex gap-3">
                                    {students?.prev_page_url && (
                                        <Link
                                            href={students?.prev_page_url}
                                            prefetch
                                            className="dark-links"
                                            method="get"
                                        >
                                            &lt;
                                        </Link>
                                    )}
                                    {students?.next_page_url && (
                                        <Link
                                            href={students?.next_page_url}
                                            prefetch
                                            className="dark-links"
                                            method="get"
                                        >
                                            &gt;
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default StudentInfo;
