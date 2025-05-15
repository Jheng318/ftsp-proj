import pencil from "@/images/edit-icon.svg";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";
import Modal from "../../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "@/js/components/Button.jsx";

function StudentInfo({ students }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredStudent, setHoveredStudent] = useState(null);
    const { flash, errors } = usePage().props;

    const {
        data,
        setData,
        put,
        processing,
        errors: formErrors,
        reset,
    } = useForm({
        name: "",
        adminNo: "",
        gpa: 0.0,
        location: "",
        user_id: 0,
    });
    const {
        data: bulkData,
        setData: setBulkData,
        post,
        processing: bulkProcessing,
        reset: bulkReset,
    } = useForm({ csvfile: null });

    function handleBulkSubmit(e) {
        e.preventDefault();
        post("/ftsp-proj/bulk-addStudents");
        bulkReset();
    }

    const fetchStudentData = useCallback(
        async (id) => {
            try {
                const res = await fetch(`/ftsp-proj/api/students/${id}`);
                const studentData = await res.json();
                setData({
                    name: studentData.name,
                    adminNo: studentData.admin_no,
                    gpa: parseFloat(studentData.gpa),
                    location: studentData.location,
                    user_id: +id,
                });
                return studentData;
            } catch (err) {
                console.error(err);
            }
        },
        [setData]
    );

    // Modified handleEdit to use the combined fetch function
    const handleEdit = async (e) => {
        const { id } = e.currentTarget.dataset;
        const data = await fetchStudentData(id);
        if (data) setIsOpen(true);
    };

    // Cleanup effect
    useEffect(() => {
        return () => {
            setIsOpen(false);
            reset();
        };
    }, []);

    useEffect(() => {
        if (hoveredStudent === null) {
            setData({
                name: "",
                adminNo: "",
                gpa: 0.0,
                location: "",
                user_id: 0,
            });
            return; // Add early return to prevent unnecessary setData call
        }
    }, [hoveredStudent]);

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash?.message);
            flash.message = "";
        }
        if (errors?.error) {
            if (typeof errors.error === "object") {
                Object.entries(JSON.parse(errors?.error)).forEach(
                    ([key, message]) => toast.error(`${key}: ${message}`)
                );
            } else {
                toast.error(errors.error);
            }
            errors.error = "";
        }
    }, [flash, errors]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsOpen(false);
        put("/ftsp-proj/editStudent");
        reset();
    }

    return (
        <section className="w-90">
            {(errors.error || flash.message) && (
                <ToastContainer
                    closeOnClick
                    autoClose={3000}
                    position="top-center"
                />
            )}
            <div className="flex justify-content-between my-5 align-center">
                <h3 className="text-primary">Student Information</h3>
                <div className="d-flex w-50 justify-content-between align-items-center">
                    <Form
                        method="post"
                        onSubmit={handleBulkSubmit}
                        encType="multipart/form-data"
                        className="d-flex align-items-center flex-nowrap w-100"
                    >
                        <Form.Label className="flex-shrink-0 pe-3 mb-0">
                            Bulk Add:
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept=".csv"
                            name="csvfile"
                            className="flex-grow-1"
                            onChange={(e) =>
                                setBulkData("csvfile", e.target.files[0])
                            }
                        />
                        {bulkData.csvfile && (
                            <input
                                type="submit"
                                disabled={bulkProcessing}
                                className="px-2 py-1 bg-primary text-gray rounded rounded-3 border-0 ms-3"
                                value={
                                    bulkProcessing ? "Uploading" : "Bulk Add"
                                }
                            />
                        )}
                    </Form>
                    <Button
                        className="smallBtn fw-bold fs-5 ms-5"
                        onClick={() => {
                            router.get("/ftsp-proj/add-student");
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>

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
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="p-4"
                >
                    {isOpen && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-primary">Edit Student Info</h3>
                            <label htmlFor="">Name</label>
                            <br />
                            <input
                                type="text"
                                value={data.name}
                                className="input-group"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <br />
                            <label htmlFor="">Admin No</label>
                            <br />
                            <input
                                type="text"
                                value={data.adminNo}
                                className="input-group"
                                onChange={(e) =>
                                    setData("adminNo", e.target.value)
                                }
                            />
                            <br />
                            <label htmlFor="">GPA</label>
                            <br />
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="4"
                                value={data.gpa}
                                className="input-group"
                                onChange={(e) =>
                                    setData("gpa", parseFloat(e.target.value))
                                }
                            />
                            <br />
                            <label htmlFor="">Location</label>
                            <br />

                            <input
                                type="text"
                                value={data.location}
                                className="input-group"
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />
                            <br />

                            <input
                                className="smallBtn"
                                type="submit"
                                value="edit"
                                disabled={processing}
                            />
                        </form>
                    )}
                </Modal>
            )}
        </section>
    );
}

export default StudentInfo;
