import { useEffect, useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import "@/css/Staff/allocated.css";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import Modal from "../../components/Modal";
import InternModalItem from "../../components/InternModalItem";
import PrismModalItem from "../../components/PrismModalItem";

// the delete, edit is not working
function Allocated({ allocatedIntern, allocatedPrism }) {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("intern");
    const [openModal, setOpenModal] = useState(false);
    const [selectedAllo, setSelectedAllo] = useState(false);
    const [filterData, setFilterData] = useState(allocatedIntern?.data);
    const [filterOp, setFilterOp] = useState({
        company: "",
        jobRole: "",
        teacher: "",
        projectType: "",
    });

    const currentData =
        activeTab == "intern" ? allocatedIntern : allocatedPrism;

    useEffect(() => {
        setFilterData(currentData || []);
    }, [activeTab, currentData]);

    // filter by the selected Internship: role, company. Prism: teacher, projectType
    useEffect(() => {
        if (
            filterOp.company !== "" ||
            filterOp.teacher !== "" ||
            filterOp.projectType !== "" ||
            filterOp.jobRole !== ""
        )
            handleFilter();
        else setFilterOp(currentData);
    }, [filterOp]);

    function handleFilter() {
        const filtered = currentData.filter((data) => {
            if (activeTab === "intern") {
                return (
                    (!filterOp.company ||
                        data.company_name === filterOp.company) &&
                    (!filterOp.jobRole || data.name === filterOp.jobRole)
                );
            } else {
                return (
                    (!filterOp.projectType ||
                        data.type === filterOp.projectType) &&
                    (!filterOp.teacher || data.user?.name === filterOp.teacher)
                );
            }
        });
        setFilterData(filtered);
    }

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

    useEffect(() => {
        filterOp.company !== "" ||
            filterOp.jobRole !== "" ||
            filterOp.projectType !== "" ||
            filterOp.teacher;
    }, [filterOp]);
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
                        {activeTab == "intern" ? (
                            <InternFilterOp
                                filterOp={filterOp}
                                setFilterOp={setFilterOp}
                                currentData={currentData}
                            />
                        ) : (
                            <PrismFilterOp
                                filterOp={filterOp}
                                setFilterOp={setFilterOp}
                                currentData={currentData}
                            />
                        )}
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
                                {activeTab == "intern" &&
                                    `Company Name: ${company_name}`}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const id = e.currentTarget.dataset.id;
                                        router.get(
                                            `/ftsp-proj/delete-allo/${id}`,
                                            { activeTab }
                                        );
                                    }}
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
function InternFilterOp({ filterOp, setFilterOp, currentData }) {
    const companies = [
        ...new Set(currentData?.map((data) => data.company_name)),
    ].filter(Boolean);
    const jobRoles = [...new Set(currentData?.map((data) => data.name))].filter(
        Boolean
    );
    return (
        <>
            <select
                name="company"
                id="company"
                className="w-100"
                value={filterOp.company}
                onChange={(e) =>
                    setFilterOp({ ...filterOp, company: e.target.value })
                }
            >
                <option value="">Select Company</option>
                {companies.map((company) => (
                    <option key={company} value={company}>
                        {company}
                    </option>
                ))}
            </select>
            <select
                name="jobRole"
                id="jobRole"
                className="w-100"
                value={filterOp.jobRole}
                onChange={(e) =>
                    setFilterOp({ ...filterOp, jobRole: e.target.value })
                }
            >
                <option value="">Select Role</option>
                {jobRoles.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
        </>
    );
}
function PrismFilterOp({ filterOp, setFilterOp, currentData }) {
    const projectTypes = [
        ...new Set(currentData?.map((data) => data.type)),
    ].filter(Boolean);
    const teachers = [
        ...new Set(currentData?.map((data) => data.user?.name)),
    ].filter(Boolean);
    return (
        <>
            <select
                name="projType"
                id="projType"
                className="w-100"
                value={filterOp.projectType}
                onChange={(e) =>
                    setFilterOp({ ...filterOp, projectType: e.target.value })
                }
            >
                <option value="">Select Project Type</option>
                {projectTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <select
                name="teacher"
                id="teacher"
                className="w-100"
                value={filterOp.teacher}
                onChange={(e) =>
                    setFilterOp({ ...filterOp, teacher: e.target.value })
                }
            >
                <option value="">Select Teacher in Charge</option>
                {teachers.map((teacher) => (
                    <option key={teacher} value={teacher}>
                        {teacher}
                    </option>
                ))}
            </select>
        </>
    );
}
