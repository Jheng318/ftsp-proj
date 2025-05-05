import { useForm, usePage } from "@inertiajs/react";
import Button from "@/js/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function AddInternship() {
    const { errors, auth } = usePage().props;
    const {
        data,
        setData,
        post,
        reset,
        processing,
        errors: formErrors,
    } = useForm({
        jobTitle: "",
        companyName: "",
        jobDesc: "",
        location: "",
        gpaRequirement: 0.0,
        salary: 0,
        start_date: "",
        end_date: "",
        codingLang: [],
        othersCoding: "",
        framework: [],
        othersFramework: "",
        user_id: "",
        no_of_students: 1,
    });
    console.log(auth.user.id);
    const handleCodingLangChange = (e) => {
        const { value, checked } = e.target;
        // it adds the new lang that was checked into the data.codingLang and removes it if it is unchecked
        setData((prevData) => ({
            ...prevData,
            codingLang: checked
                ? [...prevData.codingLang, value]
                : prevData.codingLang.filter((lang) => lang !== value),
        }));
    };
    const handleFramework = (e) => {
        const { value, checked } = e.target;
        // it adds the new framework that was checked into the data.codingFramework and removes it if it is unchecked
        setData((prevData) => ({
            ...prevData,
            framework: checked
                ? [...prevData.framework, value]
                : prevData.framework.filter((f) => f !== value),
        }));
    };
    function handleSubmit(e) {
        e.preventDefault();
        post(`/ftsp-proj/add-internship`);
        reset();
    }

    // to set the user id when it is first rendered
    useEffect(() => {
        setData("user_id", auth.user.id);
    }, []);
    // show the toast depending on whether there is a error message
    useEffect(() => {
        if (errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);
    return (
        <section id="add">
            {errors.error && (
                <ToastContainer
                    closeOnClick
                    autoClose={3000}
                    position="top-center"
                />
            )}
            <h3 className="ps-4 my-4">Add Internship</h3>
            <form className="container-fluid gap-6" onSubmit={handleSubmit}>
                <div className="row container-fluid">
                    <div className="col">
                        <label htmlFor="jobTitle">Job Title</label>
                        <br />
                        <input
                            type="text"
                            value={data.jobTitle}
                            className="w-90 mb-4"
                            name="jobTitle"
                            onChange={(e) =>
                                setData("jobTitle", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="companyName">Company Name</label>
                        <br />
                        <input
                            type="text"
                            value={data.companyName}
                            className="w-90 mb-4"
                            name="companyName"
                            onChange={(e) =>
                                setData("companyName", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="jobDesc">Job Description</label>
                        <br />
                        <input
                            type="text"
                            value={data.jobDesc}
                            className="w-90 mb-4"
                            onChange={(e) => setData("jobDesc", e.target.value)}
                        />
                        <br />
                        <label htmlFor="location">Location</label>
                        <br />
                        <input
                            type="text"
                            value={data.location}
                            name="location"
                            className="w-90 mb-4"
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="gpaRequirement">GPA Requirement</label>
                        <br />
                        <input
                            type="number"
                            value={data.gpaRequirement}
                            className="w-90 mb-4"
                            name="gpaRequirement"
                            onChange={(e) =>
                                setData("gpaRequirement", e.target.value)
                            }
                        />
                        <br />
                        <label htmlFor="salary">Salary</label>
                        <br />
                        <input
                            type="number"
                            value={data.salary}
                            name="salary"
                            className="w-90 mb-4"
                            onChange={(e) => setData("salary", e.target.value)}
                        />
                        <br />
                        <label>Number of Students</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={data.no_of_students}
                            name="no_of_students"
                            className="w-90"
                            step="1"
                            onChange={(e) =>
                                setData("no_of_students", e.target.value)
                            }
                        />
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="internPeriod">
                                    Start of Internship
                                </label>
                                <br />
                                <input
                                    type="date"
                                    value={data.start_date}
                                    name="start_date"
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="internPeriod">
                                    End of Internship
                                </label>
                                <br />
                                <input
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <br />
                        <label htmlFor="coding">
                            What Coding Languages are the company looking for?
                        </label>
                        <div className="row gap-5">
                            <div className="col ">
                                <div className="row my-3">
                                    <input
                                        id="html"
                                        type="checkbox"
                                        value="html"
                                        name="codingLang"
                                        className="col"
                                        checked={data.codingLang.includes(
                                            "html"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="html" className="col">
                                        HTML
                                    </label>
                                </div>
                                <div className="row my-3">
                                    <input
                                        id="css"
                                        type="checkbox"
                                        value="css"
                                        className="col"
                                        name="codingLang"
                                        checked={data.codingLang.includes(
                                            "css"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="css" className="col">
                                        CSS
                                    </label>
                                </div>
                                <div className="row ">
                                    <input
                                        id="js"
                                        className="col"
                                        name="codingLang"
                                        type="checkbox"
                                        value="javascript"
                                        checked={data.codingLang.includes(
                                            "javascript"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="js" className="col">
                                        Javascript
                                    </label>
                                </div>
                            </div>
                            <div className="col ">
                                <div className="row my-3">
                                    <input
                                        id="php"
                                        type="checkbox"
                                        value="php"
                                        className="col"
                                        name="codingLang"
                                        checked={data.codingLang.includes(
                                            "php"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="php" className="col">
                                        PHP
                                    </label>
                                </div>
                                <div className="row my-3">
                                    <input
                                        id="c#"
                                        type="checkbox"
                                        value="c#"
                                        className="col"
                                        name="codingLang"
                                        checked={data.codingLang.includes("c#")}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="c#" className="col">
                                        C#
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <label>Others</label>
                                <br />
                                <input
                                    className="col"
                                    type="string"
                                    placeholder="C++, Python"
                                    name="otherCoding"
                                    value={data.othersCoding}
                                    onChange={(e) =>
                                        setData("othersCoding", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <br />
                        <label htmlFor="framework">
                            What frameworks are the company looking for?
                        </label>

                        <div className="row gap-5">
                            <div className="col ">
                                <div className="row my-3">
                                    <input
                                        id="angular"
                                        type="checkbox"
                                        value="angular"
                                        name="framework"
                                        className="col"
                                        checked={data.framework.includes(
                                            "angular"
                                        )}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="angular" className="col">
                                        Angular
                                    </label>
                                </div>
                                <div className="row my-3">
                                    <input
                                        id="vue"
                                        type="checkbox"
                                        value="vue"
                                        className="col"
                                        name="framework"
                                        checked={data.framework.includes("vue")}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="vue" className="col">
                                        Vue.js
                                    </label>
                                </div>
                                <div className="row">
                                    <input
                                        id="react"
                                        className="col"
                                        type="checkbox"
                                        name="framework"
                                        value="react"
                                        checked={data.framework.includes(
                                            "react"
                                        )}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="react" className="col">
                                        React.js
                                    </label>
                                </div>
                            </div>
                            <div className="col ">
                                <div className="row my-3">
                                    <input
                                        id="asp"
                                        type="checkbox"
                                        value="asp"
                                        className="col"
                                        name="framework"
                                        checked={data.framework.includes("asp")}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="asp" className="col">
                                        ASP.NET
                                    </label>
                                </div>
                                <div className="row ">
                                    <input
                                        id="laravel"
                                        name="framework"
                                        type="checkbox"
                                        value="laravel"
                                        className="col"
                                        checked={data.framework.includes(
                                            "laravel"
                                        )}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="laravel" className="col">
                                        Laravel
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <label>Others</label>
                                <br />
                                <input
                                    className="col"
                                    type="string"
                                    name="otherFramework"
                                    placeholder="NodeJS, Flask"
                                    value={data.othersFramework}
                                    onChange={(e) =>
                                        setData(
                                            "othersFramework",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <input hidden value={data.user_id} readOnly />
                        <Button
                            disabled={processing}
                            type="submit"
                            className="ms-2 mt-5"
                        >
                            Add Listing
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AddInternship;
