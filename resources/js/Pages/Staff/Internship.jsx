import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import searchIcon from "@/images/search.svg";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import "@/css/Staff/Internship.css";
import "react-toastify/dist/ReactToastify.css";

function Internship({ internships }) {
    const { errors } = usePage().props;
    const [search, setSearch] = useState("");
    const [filteredIntern, setFilteredIntern] = useState(internships ?? []);

    const BASE_PATH = "/ftsp-proj";

    // these getUniqueLanguages and framework is done by gpt :(
    const getUniqueLanguages = () => {
        const allLanguages = internships
            .map((i) => i.languages.split(","))
            .flat()
            .map((lang) => lang.trim().toLowerCase())
            .filter((lang) => lang.length > 0);

        return [...new Set(allLanguages)]
            .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
            .sort();
    };
    const getUniqueFramework = () => {
        const allFramework = internships
            .map((i) => i.frameworks.split(","))
            .flat()
            .map((frame) => frame.trim().toLowerCase())
            .filter((frame) => frame.length > 0);
        return [...new Set(allFramework)]
            .map((frame) => frame.charAt(0).toUpperCase() + frame.slice(1))
            .sort();
    };
    function handleEdit(e) {
        const id = e.currentTarget.dataset.id;
        router.get(`${BASE_PATH}/edit-internship/${id}`);
    }
    function handleDelete(e) {
        const id = e.currentTarget.dataset.id;
        router.delete(`${BASE_PATH}/delete-internship/${id}`);
    }
    function handleAdd() {
        router.get(`${BASE_PATH}/add-internship`);
    }
    // to changed the internshhip listing base on the search result
    function handleSearch() {
        const filtered = internships.filter(
            (internship) =>
                internship.name.toLowerCase().includes(search.toLowerCase()) ||
                internship.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
        setFilteredIntern(filtered);
    }
    // to show the error when there is error passed from the StaffController
    useEffect(() => {
        if (errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);
    // to render the cards with the search result or all of them based on the state of the search result
    useEffect(() => {
        if (search !== "") handleSearch();
        else setFilteredIntern(internships);
    }, [search]);
    return (
        <section id="internship" className="my-5">
            <ToastContainer
                closeOnClick
                autoClose={3000}
                position="top-center"
            />

            <div className="d-flex justify-content-between w-90">
                <div className="d-flex align-items-center justify-content-around">
                    <h3 className="pe-5">Internship Listing</h3>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control me-3"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="smallBtn" onClick={handleSearch}>
                            <img src={searchIcon} alt="search icon" />
                        </button>
                    </div>
                </div>
                <div className="d-flex align-items-center" id="right">
                    <button
                        className="smallBtn fw-bold fs-5 me-3"
                        onClick={handleAdd}
                    >
                        +
                    </button>
                    <label htmlFor="filterBtn">
                        <img src={filter} alt="filter" />
                    </label>
                    <input type="checkbox" id="filterBtn" className="d-none" />
                    <span className="filterOption w-100">
                        <select
                            name="jobRole"
                            id="jobRole"
                            className="w-100"
                            defaultValue="Job"
                        >
                            {internships.map((i) => (
                                <option key={i.id} value={i.name}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name="languages"
                            id="languages"
                            className="w-100"
                            defaultValue="language"
                        >
                            {getUniqueLanguages().map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <select
                            name="frameworks"
                            id="frameworks"
                            className="w-100"
                            defaultValue="framework"
                        >
                            {getUniqueFramework().map((frame) => (
                                <option key={frame} value={frame}>
                                    {frame}
                                </option>
                            ))}
                        </select>
                    </span>
                </div>
            </div>
            <div className="container-fluid grid-con">
                {filteredIntern.map((internship) => {
                    const { id, name, description, user } = internship;
                    const staffName = user.name;
                    return (
                        <div key={id} className="grid-item">
                            <div className="d-flex justify-content-between container-fluid header">
                                <h3>{name}</h3>
                                <h3>{id}</h3>
                            </div>
                            <p>Description: {description}</p>
                            <p>Teacher in Charge: {staffName}</p>
                            <div className="d-flex justify-content-between px-16px container-fluid buttonsDiv">
                                <CardButton
                                    onClick={handleEdit}
                                    btnColor="#6393F2"
                                    id={id}
                                >
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton
                                    onClick={handleDelete}
                                    btnColor="#F26363"
                                    id={id}
                                >
                                    <img src={deleteIcon} alt="delete icon" />
                                </CardButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Internship;
