import { useForm, usePage } from "@inertiajs/react";
import Button from "@/js/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function AddPrism() {
    const { errors, auth } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        reset,
    } = useForm({
        projName: "",
        projDesc: "",
        projType: "",
        start_date: "",
        end_date: "",
        no_of_students: "",
        gpa_constraints: "",
        user_id: auth.user.id,
    });
    function handleSubmit(e) {
        e.preventDefault();
        reset();
        post(`/ftsp-proj/add-prism`);
    }
    // show the toast depending on whether there is a error message
    useEffect(() => {
        if (errors?.error) {
            toast.error(errors?.error);
            errors.error = "";
        }
    }, [errors]);

    return (
        <section id="addPrism">
            {errors?.error && (
                <ToastContainer
                    closeOnClick
                    autoClose={3000}
                    position="top-center"
                />
            )}
            <h3 className="ps-4 my-5 text-primary">Add Internship</h3>
            <form className="container-fluid gap-6" onSubmit={handleSubmit}>
                <div className="row container-fluid">
                    <div className="col">
                        <label htmlFor="projName">Project Name</label>
                        <br />
                        <input
                            type="text"
                            value={data.projName}
                            className="w-90 mb-4"
                            onChange={(e) =>
                                setData("projName", e.target.value)
                            }
                        />
                        <br />

                        <label htmlFor="projType">Project type</label>
                        <br />
                        <input
                            type="text"
                            value={data.projType}
                            className="w-90 mb-4"
                            onChange={(e) =>
                                setData("projType", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="projDesc">Project Description</label>
                        <br />
                        <textarea
                            value={data.projDesc}
                            className="w-90 h-30"
                            onChange={(e) =>
                                setData("projDesc", e.target.value)
                            }
                        />
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="internPeriod">
                                    Start of Project
                                </label>
                                <br />
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="internPeriod">
                                    End of Project
                                </label>
                                <br />
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <br />
                        <label htmlFor="gpaConstraints">GPA Constraints</label>
                        <br />
                        <input
                            type="text"
                            value={data.gpa_constraints}
                            placeholder="3.1, 2.5, 2.1"
                            className="mb-4 w-83"
                            onChange={(e) =>
                                setData("gpa_constraints", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="no_of_students">
                            Number of Students
                        </label>
                        <br />
                        <input
                            type="number"
                            value={data.no_of_students}
                            className="w-83"
                            onChange={(e) => {
                                setData("no_of_students", e.target.value);
                            }}
                        />
                        <br />
                        <input
                            type="hidden"
                            name="user_id"
                            value={data.user_id}
                        />
                        <Button
                            disabled={processing}
                            type="submit"
                            className="mt-3"
                        >
                            Add Listing
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AddPrism;
