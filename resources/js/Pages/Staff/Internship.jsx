import { router, usePage } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import searchIcon from "@/images/search.svg";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import "@/css/Staff/Internship.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/Modal";
import { formatDate } from "@/js/reusable.js";

function Internship({ internships }) {
    const { errors } = usePage().props;
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [filteredIntern, setFilteredIntern] = useState(internships ?? []);
    const [filterOp, setFilterOp] = useState({
        role: "",
        lang: "",
        frame: "",
    });

    const BASE_PATH = "/ftsp-proj";

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
    function handleFilter() {
        const filtered = internships.filter((internship) => {
            const matchesRole =
                !filterOp.role || internship.name === filterOp.role;

            const matchesLang =
                !filterOp.lang ||
                internship.languages
                    .toLowerCase()
                    .split(",")
                    .map((l) => l.trim())
                    .includes(filterOp.lang.toLowerCase());

            const matchesFrame =
                !filterOp.frame ||
                internship.frameworks
                    .toLowerCase()
                    .split(",")
                    .map((f) => f.trim())
                    .includes(filterOp.frame.toLowerCase());

            return matchesRole && matchesLang && matchesFrame;
        });
        setFilteredIntern(filtered);
    }
    const openModalFn = useCallback(
        (id) => {
            const arr = internships.filter((i) => i.id === id);
            setOpenModal(true);
            setSelectedIntern(arr);
        },
        [internships]
    );

    const closeModal = useCallback(() => {
        setOpenModal(false);
        setSelectedIntern(null);
    }, []);
    // to check whether there is an error and if there is, show it in the form of a toast
    useEffect(() => {
        if (errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);

    // filter by search result
    useEffect(() => {
        if (search !== "") handleSearch();
        else setFilteredIntern(internships);
    }, [search]);

    // filter by the selected role, framework or language
    useEffect(() => {
        if (
            filterOp.role !== "" ||
            filterOp.frame !== "" ||
            filterOp.lang !== ""
        )
            handleFilter();
        else setFilteredIntern(internships);
    }, [filterOp]);

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
                        onClick={() => {
                            router.get(`${BASE_PATH}/add-internship`);
                        }}
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
                            value={filterOp.role}
                            onChange={(e) =>
                                setFilterOp({
                                    ...filterOp,
                                    role: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Role</option>
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
                            value={filterOp.lang}
                            onChange={(e) =>
                                setFilterOp({
                                    ...filterOp,
                                    lang: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Language</option>
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
                            value={filterOp.frame}
                            onChange={(e) =>
                                setFilterOp({
                                    ...filterOp,
                                    frame: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Framework</option>
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
                        <div
                            key={id}
                            className="grid-item"
                            onClick={() => openModalFn(id)}
                        >
                            <div className="d-flex justify-content-between container-fluid header">
                                <h3>{name}</h3>
                                <h3>{id}</h3>
                            </div>
                            <p className="cutoff-text">
                                Description: {description}
                            </p>
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

            {openModal && selectedIntern && (
                <Modal isOpen={openModal} onClose={closeModal}>
                    <div className="w-90 my-4">
                        <div className=" my-3 flex align-items-center justify-content-between ">
                            <h3>{selectedIntern?.[0]?.name}</h3>
                            <button onClick={closeModal} className="pointer">
                                &times;
                            </button>
                        </div>
                        <p className="descrip">
                            Description: {selectedIntern?.[0]?.description}
                        </p>
                        <p>Company Name: {selectedIntern?.[0]?.company_name}</p>
                        <p>Salary: ${selectedIntern?.[0]?.salary}</p>
                        <p>Location: {selectedIntern?.[0]?.location}</p>
                        <p>
                            Programming Languages:{" "}
                            {selectedIntern?.[0]?.languages}
                        </p>
                        <p>Framework: {selectedIntern?.[0]?.frameworks}</p>
                        <p>
                            Internship Period:{" "}
                            {formatDate(selectedIntern?.[0]?.start_date)} to{" "}
                            {formatDate(selectedIntern?.[0]?.end_date)}{" "}
                        </p>
                        <p>
                            Number of Students:{" "}
                            {selectedIntern?.[0]?.no_of_students}
                        </p>
                        <p>
                            Teacher in Charge: {selectedIntern?.[0]?.user?.name}
                        </p>
                    </div>
                </Modal>
            )}
        </section>
    );
}

export default Internship;
