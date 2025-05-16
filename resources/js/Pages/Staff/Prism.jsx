import { router, usePage } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/Modal";
import { formatDate } from "@/js/reusable.js";

function Prism({ prism }) {
    const BASE_PATH = "/ftsp-proj";
    const { errors, flash } = usePage().props;
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedPrism, setSelectedPrism] = useState(null);
    const [filteredPrism, setFilteredPrism] = useState(prism ?? []);
    const [filterOp, setFilterOp] = useState({
        role: "",
        lang: "",
        frame: "",
    });
    function handleEdit(e) {
        const id = e.currentTarget.dataset.id;
        router.get(`${BASE_PATH}/edit-prism/${id}`);
    }

    function handleDelete(e) {
        const id = e.currentTarget.dataset.id;
        router.delete(`${BASE_PATH}/delete-prism/${id}`);
    }

    function handleSearch() {
        const filtered = prism.filter(
            (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase()) ||
                p.user.name.toLowerCase().includes(search.toLocaleLowerCase())
        );
        setFilteredPrism(filtered);
    }
    function handleFilter() {
        const filtered = prism.filter((p) => {
            const matchesRole = !filterOp.role || p.name === filterOp.role;

            const matchesLang =
                !filterOp.lang ||
                p.languages
                    .toLowerCase()
                    .split(",")
                    .map((l) => l.trim())
                    .includes(filterOp.lang.toLowerCase());

            const matchesFrame =
                !filterOp.frame ||
                p.frameworks
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
            const arr = prism.filter((p) => p.id === id);
            setOpenModal(true);
            setSelectedPrism(arr);
        },
        [prism]
    );

    const closeModal = useCallback(() => {
        setOpenModal(false);
        setSelectedPrism(null);
    }, []);

    useEffect(() => {
        setFilteredPrism(prism);
    }, [prism]);
    // to check whether there is an error and if there is, show it in the form of a toast
    useEffect(() => {
        if (errors?.error) {
            toast.error(errors.error);
            errors.error = "";
        }
        if (flash?.message) {
            toast.success(flash?.message);
            flash.message = "";
        }
    }, [errors, flash]);

    // filter by search result
    useEffect(() => {
        if (search !== "") handleSearch();
        else setFilteredPrism(prism);
    }, [search]);

    // filter by the selected role, framework or language
    useEffect(() => {
        if (
            filterOp.role !== "" ||
            filterOp.frame !== "" ||
            filterOp.lang !== ""
        )
            handleFilter();
        else setFilteredPrism(prism);
    }, [filterOp]);
    return (
        <section id="prism">
            <ToastContainer
                closeOnClick
                autoClose={3000}
                position="top-center"
            />

            <div className="d-flex justify-content-between w-90">
                <div className="d-flex align-items-center justify-content-around mt-5">
                    <h3 className="pe-5">Prism Listing</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control me-3"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center" id="right">
                    <button
                        className="smallBtn fw-bold fs-5 me-3"
                        onClick={() => {
                            router.get(`${BASE_PATH}/add-prism`);
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
                        >
                            <option value="">Select Role</option>
                        </select>
                        <select
                            name="languages"
                            id="languages"
                            className="w-100"
                            value={filterOp.lang}
                        >
                            <option value="">Select Language</option>
                        </select>
                        <select
                            name="frameworks"
                            id="frameworks"
                            className="w-100"
                            value={filterOp.frame}
                        >
                            <option value="">Select Framework</option>
                        </select>
                    </span>
                </div>
            </div>

            <div className="container-fluid grid-con">
                {filteredPrism.map((p) => {
                    const { id, name, description, user } = p;
                    const staffName = user?.name;
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
                                    btnColor="#6393F2"
                                    id={id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(e);
                                    }}
                                >
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton
                                    btnColor="#F26363"
                                    id={id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(e);
                                    }}
                                >
                                    <img src={deleteIcon} alt="delete icon" />
                                </CardButton>
                            </div>
                        </div>
                    );
                })}
            </div>

            {openModal && selectedPrism && (
                <Modal isOpen={openModal} onClose={closeModal}>
                    <div className="w-90 my-4">
                        <div className=" my-3 flex align-items-center justify-content-between ">
                            <h3>{selectedPrism?.[0]?.name}</h3>
                            <button onClick={closeModal} className="pointer">
                                &times;
                            </button>
                        </div>
                        <p className="descrip">
                            Description: {selectedPrism?.[0]?.description}
                        </p>
                        <p>Project Type: {selectedPrism?.[0]?.type}</p>
                        <p>
                            Internship Period:{" "}
                            {formatDate(selectedPrism?.[0]?.start_date)} to{" "}
                            {formatDate(selectedPrism?.[0]?.end_date)}{" "}
                        </p>
                        <p>
                            Number of Students:{" "}
                            {selectedPrism?.[0]?.no_of_students}
                        </p>
                        <p>
                            GPA Constraints:{" "}
                            {selectedPrism?.[0]?.gpa_constraints}
                        </p>
                        <p>
                            Teacher in Charge: {selectedPrism?.[0]?.user?.name}
                        </p>
                    </div>
                </Modal>
            )}
        </section>
    );
}

export default Prism;
