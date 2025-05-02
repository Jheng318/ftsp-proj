import { useEffect, useState, useCallback } from "react";
import "@/css/Staff/allocated.css";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import Modal from "../../components/Modal";
import { formatDate } from "../../reusable";

function Allocated({ allocatedIntern, allocatedPrism }) {
    const [search, setSearch] = useState(null);
    const [activeTab, setActiveTab] = useState("intern");
    const [openModal, setOpenModal] = useState(false);
    const [selectedAllo, setSelectedAllo] = useState(false);
    const [filterData, setFilterData] = useState(allocatedIntern?.data);
    const [filterOp, setFilterOp] = useState({
        role: "",
        lang: "",
        frame: "",
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
        const result = currentData?.data?.filter(
            (data) =>
                data.name.toLowerCase().includes(search.toLowerCase()) ||
                data.admin_no.toLowerCase().includes(search.toLowerCase())
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
        } else setFilterData(currentData?.data);
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
                {currentData?.map((data) => {
                    const { id, name, company_name, location } = data;
                    const { name: staffName } = data.user;

                    // the new Set helps to filter out duplicates
                    const studentNames = [
                        ...new Set(
                            data?.student_internship?.map(
                                (d) => d?.student?.name
                            )
                        ),
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
                            <p>Company Name: {company_name}</p>
                            <p>Location: {location}</p>
                            <p>
                                Students:{" "}
                                {studentNames.map((name) => (
                                    <span>{name} </span>
                                ))}
                            </p>
                            <p>Teacher in Charge: {staffName}</p>
                            <div className="d-flex justify-content-between px-16px container-fluid buttonsDiv">
                                <CardButton btnColor="#6393F2" id={id}>
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton btnColor="#F26363" id={id}>
                                    <img src={deleteIcon} alt="delete icon" />
                                </CardButton>
                            </div>
                        </div>
                    );
                })}
            </div>
            {openModal && selectedAllo && (
                <Modal isOpen={openModal} onClose={closeModal}>
                    <h3 className="text-primary">{selectedAllo[0].name}</h3>
                    <div className="flex">
                        <div>
                            <p>Description: {selectedAllo[0]?.description}</p>
                            <p>Company Name: {selectedAllo[0]?.company_name}</p>
                            <p>Location: {selectedAllo[0]?.location}</p>
                            <p>Salary: ${selectedAllo[0]?.salary}</p>
                            <p>Languages: {selectedAllo[0]?.languages}</p>
                            <p>Frameworks: {selectedAllo[0]?.frameworks}</p>
                            <p>
                                Internship Period:{" "}
                                {formatDate(selectedAllo[0]?.start_date)} to{" "}
                                {formatDate(selectedAllo[0]?.end_date)}
                            </p>
                        </div>
                        <div>
                            <p className="fw-bold">Students</p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Admin No</td>
                                        <td>GPA</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedAllo[0]?.student_internship?.map(
                                        (student) => {
                                            console.log(student);
                                            return (
                                                <tr>
                                                    <td>
                                                        {student.student.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            student.student
                                                                .admin_no
                                                        }
                                                    </td>
                                                    <td>
                                                        {student.student.gpa}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                            <p>
                                Number of Students:{" "}
                                {selectedAllo[0]?.no_of_students}
                            </p>
                            <p>
                                Teacher in Charge: {selectedAllo[0]?.user?.name}
                            </p>
                            <p>
                                GPA Requirement:{" "}
                                {selectedAllo[0]?.gpa_requirement}
                            </p>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
}

export default Allocated;
