import { useForm, usePage } from "@inertiajs/react";
import Button from "@/js/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditInternship({ internPost }) {
    const { errors } = usePage().props;

    console.log(internPost);

    const {
        data,
        setData,
        put,
        processing,
        errors: formErrors,
    } = useForm({
        jobTitle: internPost?.name || "",
        companyName: internPost?.company_name || "",
        jobDesc: internPost?.description || "",
        location: internPost?.location || "",
        gpaRequirement: internPost?.gpa_requirenment || 0.0,
        salary: internPost?.salary || 0,
        start_date: internPost?.start_date || "",
        end_date: internPost?.end_date || "",
        codingLang: internPost?.languages
            ? internPost?.languages.toLowerCase().split(", ")
            : [],
        othersCoding: "",
        framework: internPost?.frameworks
            ? internPost?.frameworks?.toLowerCase()?.split(", ")
            : [],
        othersFramework: "",
    });
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
        setData({
            jobTitle: "",
            companyName: "",
            jobDesc: "",
            location: "",
            gpaRequirement: 0.0,
            salary: 0,
            start_date: "",
            end_date: "",
            codingLang: [],
            framework: [],
            othersCoding: "",
            othersFramework: "",
        });
        put(`/ftsp-proj/edit-internship`);
    }
    return (
        <section id="edit">
            <h3>Edit Internship</h3>
            <form className="container-fluid gap-6" onSubmit={handleSubmit}>
                <div className="row container-fluid">
                    <div className="col">
                        <label htmlFor="jobTitle">Job Title</label>
                        <br />
                        <input
                            type="text"
                            value={data.jobTitle}
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
                            onChange={(e) => setData("jobDesc", e.target.value)}
                        />
                        <br />
                        <label htmlFor="location">Location</label>
                        <br />
                        <input
                            type="text"
                            value={data.location}
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
                            onChange={(e) => setData("salary", e.target.value)}
                        />
                        <br />
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
                                <div className="row">
                                    <input
                                        id="html"
                                        type="checkbox"
                                        value="html"
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
                                <div className="row">
                                    <input
                                        id="css"
                                        type="checkbox"
                                        value="css"
                                        className="col"
                                        checked={data.codingLang.includes(
                                            "css"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="css" className="col">
                                        CSS
                                    </label>
                                </div>
                                <div className="row">
                                    <input
                                        id="js"
                                        className="col"
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
                                <div className="row">
                                    <input
                                        id="php"
                                        type="checkbox"
                                        value="php"
                                        className="col"
                                        checked={data.codingLang.includes(
                                            "php"
                                        )}
                                        onChange={handleCodingLangChange}
                                    />
                                    <label htmlFor="php" className="col">
                                        PHP
                                    </label>
                                </div>
                                <div className="row">
                                    <input
                                        id="c#"
                                        type="checkbox"
                                        value="c#"
                                        className="col"
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
                                    value={data.othersCoding}
                                    placeholder="C++, Python"
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
                                <div className="row">
                                    <input
                                        id="angular"
                                        type="checkbox"
                                        value="angular"
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
                                <div className="row">
                                    <input
                                        id="vue"
                                        type="checkbox"
                                        value="vue"
                                        className="col"
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
                                <div className="row">
                                    <input
                                        id="asp"
                                        type="checkbox"
                                        value="asp"
                                        className="col"
                                        checked={data.framework.includes("asp")}
                                        onChange={handleFramework}
                                    />
                                    <label htmlFor="asp" className="col">
                                        ASP.NET
                                    </label>
                                </div>
                                <div className="row">
                                    <input
                                        id="laravel"
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
                                    value={data.othersFramework}
                                    placeholder="NodeJS, Flask"
                                    onChange={(e) =>
                                        setData(
                                            "othersFramework",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Button disabled={processing} type="submit">
                    Add Listing
                </Button>
            </form>
        </section>
    );
}

export default EditInternship;
