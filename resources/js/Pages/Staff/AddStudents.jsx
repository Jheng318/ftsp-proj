import { useForm, usePage } from "@inertiajs/react";
import Button from "../../components/Button";

function AddStudents() {
    const { errors } = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        reset,
    } = useForm({
        name: "",
        admin_no: "",
        location: "",
        gpa: "",
        internship_start: "",
        internship_end: "",
    });
    const inputStyling = "w-100 form-control mb-4 form-control";

    function submit(e) {
        e.preventDefault();
        reset();
        post("/ftsp-proj/add-student");
    }

    return (
        <section className="w-90">
            <h3 className="text-primary my-5">Add Student Information</h3>
            <form onSubmit={submit}>
                <div className="d-flex justify-content-between w-100 gap-5">
                    <div className="w-50">
                        <label>Student's name:</label>
                        <br />
                        <input
                            type="text"
                            value={data.name}
                            className={inputStyling}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <br />
                        <label>Student's Admin Number:</label>
                        <br />
                        <input
                            type="text"
                            value={data.admin_no}
                            onChange={(e) =>
                                setData("admin_no", e.target.value)
                            }
                            className={inputStyling}
                        />
                        <br />
                        <label>Student's GPA:</label>
                        <br />
                        <input
                            type="number"
                            step="0.01"
                            value={data.gpa}
                            onChange={(e) => setData("gpa", e.target.value)}
                            className={inputStyling}
                        />
                        <br />
                    </div>
                    <div className="w-50">
                        <label>Student's Home Address:</label>
                        <br />
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                            className={inputStyling}
                        />
                        <br />
                        <label>Student's Start Date:</label>
                        <br />
                        <input
                            type="date"
                            value={data.internship_start}
                            onChange={(e) =>
                                setData("internship_start", e.target.value)
                            }
                            className={inputStyling}
                        />
                        <br />
                        <label>Student's End Date:</label>
                        <br />
                        <input
                            type="date"
                            value={data.internship_end}
                            onChange={(e) =>
                                setData("internship_end", e.target.value)
                            }
                            className={inputStyling}
                        />
                        <br />
                    </div>
                </div>
                <Button type="submit" className="smallBtn">
                    Add Student
                </Button>
            </form>
        </section>
    );
}

export default AddStudents;
