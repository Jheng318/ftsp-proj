import { useEffect, useState, useCallback } from "react";
import "@/css/Staff/allocated.css";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import Modal from "../../components/Modal";
import InternModalItem from "../../components/InternModalItem";
import PrismModalItem from "../../components/PrismModalItem";

// the filter, delete, edit is not working
function Allocated({ allocatedIntern, allocatedPrism }) {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("intern");
    const [openModal, setOpenModal] = useState(false);
    const [selectedAllo, setSelectedAllo] = useState(false);
    const [filterData, setFilterData] = useState(allocatedIntern?.data);
    const [filterInternOp, setFilterInternOp] = useState({
        company: "",
        internPeriod: "",
        teacher: "",
        projectType: "",
        projectDuration: "",
    });

    const currentData =
        activeTab == "intern" ? allocatedIntern : allocatedPrism;

    useEffect(() => {
        setFilterData(currentData || []);
    }, [activeTab, currentData]);

    function toggleActive(tab) {
        setActiveTab(tab);
    }
    function handleSearch() {
        const result = currentData?.filter(
            (data) =>
                data?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
                data?.company_name
                    ?.toLowerCase()
                    ?.includes(search.toLowerCase()) ||
                data?.user?.name
                    ?.toLowerCase()
                    ?.includes(search.toLowerCase()) ||
                data?.type?.toLowerCase()?.includes(search.toLowerCase()) ||
                data?.location?.toLowerCase()?.includes(search.toLowerCase())
        );

        setFilterData(result);
    }

    const openModalFn = useCallback(
        (id) => {
            const arr = currentData.filter((i) => i.id === id);
            setOpenModal(true);
            setSelectedAllo(arr);
        },
        [currentData]
    );

    const closeModal = useCallback(() => {
        setOpenModal(false);
        setSelectedAllo(null);
    }, []);
    useEffect(() => {
        if (search) {
            handleSearch();
        } else setFilterData(currentData);
    }, [search]);

    return (
        <section id="allocated" className="w-90">
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="flex">
                    <h3 className="text-primary">Allocation Details</h3>
                    <div className="toggle">
                        <div
                            className={`intern ${
                                activeTab == "intern" ? "active" : "inactive"
                            }`}
                            onClick={() => toggleActive("intern")}
                        >
                            Internship
                        </div>
                        <div
                            className={`prism ${
                                activeTab == "prism" ? "active" : "inactive"
                            }`}
                            onClick={() => toggleActive("prism")}
                        >
                            Prism
                        </div>
                    </div>
                </div>
                <div id="right" className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control me-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label htmlFor="filterBtn">
                        <img src={filter} alt="filter" />
                    </label>
                    <input type="checkbox" id="filterBtn" className="d-none" />
                    <span className="filterOption w-100">
                        <select name="company" id="company" className="w-100">
                            <option value="">Select Company</option>
                        </select>
                        <select name="jobRole" id="jobRole" className="w-100">
                            <option value="">Select Role</option>
                        </select>
                        <select
                            name="itpPeriod"
                            id="itpPeriod"
                            className="w-100"
                        >
                            <option value="">Select ITP Period</option>
                        </select>
                    </span>
                </div>
            </div>
            <div className="grid-con w-100">
                {filterData?.map((data) => {
                    const {
                        id,
                        name,
                        company_name = undefined,
                        location = undefined,
                        type = undefined,
                    } = data;
                    const { name: staffName } = data?.user;

                    let source =
                        activeTab == "intern"
                            ? data?.student_internship
                            : data?.student_prism;

                    // the new Set helps to filter out duplicates
                    const studentNames = [
                        ...new Set(source?.map((d) => d?.student?.name)),
                    ];

                    return (
                        <div
                            key={id}
                            className="grid-item"
                            onClick={() => id && openModalFn(id)}
                        >
                            <div className="d-flex justify-content-between container-fluid header">
                                <h3>{name}</h3>
                                <h3>{id}</h3>
                            </div>
                            <p>
                                {activeTab == "intern"
                                    ? `Company Name: ${company_name}`
                                    : `Project Name : ${name}`}
                            </p>
                            <p>
                                {activeTab == "intern"
                                    ? `Location: ${location}`
                                    : `Project Type: ${type}`}
                            </p>
                            <p>
                                Students:{" "}
                                {studentNames.map((name) => (
                                    <span key={name}>{name} </span>
                                ))}
                            </p>
                            <p>Teacher in Charge: {staffName}</p>
                            <div className="d-flex justify-content-between px-16px container-fluid buttonsDiv">
                                <CardButton
                                    btnColor="#6393F2"
                                    id={id}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton
                                    btnColor="#F26363"
                                    id={id}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img src={deleteIcon} alt="delete icon" />
                                </CardButton>
                            </div>
                        </div>
                    );
                })}
            </div>
            {openModal && selectedAllo && (
                <Modal isOpen={openModal} onClose={closeModal} className="w-75">
                    {" "}
                    {activeTab == "intern" ? (
                        <InternModalItem
                            selectedAllo={selectedAllo}
                            closeModal={closeModal}
                        />
                    ) : (
                        <PrismModalItem
                            selectedAllo={selectedAllo}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            )}
        </section>
    );
}

export default Allocated;
