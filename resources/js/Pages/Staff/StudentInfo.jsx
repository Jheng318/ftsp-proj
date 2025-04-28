import pencil from "@/images/edit-icon.svg";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Modal from "../../components/Modal";

function StudentInfo({ students }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredStudent, setHoveredStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = (e) => {
        const { id } = e.currentTarget.dataset;
        // First fetch student data before opening modal
        if (hoveredStudent === null) return;
        fetch(`/ftsp-proj/api/students/${id}`, {
            method: "GET",
            redirect: "follow",
        })
            .then((res) => res.json())
            .then((data) => {
                setHoveredStudent(data);
                setIsOpen(true); // Only open modal after data is fetched
            })
            .catch((err) => console.error(err));
    };

    const handleMouseEnter = (id) => {
        setIsLoading(true);
        fetch(`/ftsp-proj/api/students/${id}`, {
            method: "GET",
            redirect: "follow",
        })
            .then((res) => res.json())
            .then((data) => setHoveredStudent(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false)); // Fix: Wrap in arrow function
    };

    const handleMouseLeave = () => {
        setHoveredStudent(null);
    };

    function handleSubmit(e) {
        e.preventDefault();
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
                                    onMouseEnter={() =>
                                        handleMouseEnter(student.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    style={{ position: "relative" }}
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
            {isOpen && (
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    {!isLoading && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">Name</label>
                            <br />
                            <input type="text" value={hoveredStudent?.name} />
                            <br />
                            <label htmlFor="">Admin No</label>
                            <br />
                            <input
                                type="text"
                                value={hoveredStudent?.admin_no}
                            />
                            <br />
                            <label htmlFor="">GPA</label>
                            <br />
                            <input type="text" value={hoveredStudent?.gpa} />
                            <br />
                            <label htmlFor="">Location</label>
                            <br />

                            <input
                                type="text"
                                value={hoveredStudent?.location}
                            />
                            <br />
                            <input type="submit" value="edit" />
                        </form>
                    )}
                </Modal>
            )}
        </section>
    );
}

export default StudentInfo;
