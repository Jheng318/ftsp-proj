import { router, usePage, useForm } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "@/css/Staff/unallocated.css";
import "react-toastify/dist/ReactToastify.css";
import editIcon from "@/images/blue-edit-icon.svg";
import deleteIcon from "@/images/red-delete-icon.svg";
import CardButton from "../../components/CardButton";
import Modal from "../../components/Modal";

function ManageAllo({
    allocatedI,
    allocatedP,
    internships = null,
    prisms = null,
}) {
    const { errors, flash } = usePage().props;
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("intern");
    const currentData = activeTab == "intern" ? allocatedI : allocatedP;
    const [filterData, setFilterData] = useState(currentData);
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        id: "",
        name: "",
        internAllo: "",
        prismAllo: "",
        activeTab: "",
    });

    function toggleActive(tab) {
        setActiveTab(tab);
    }
    const fetchStudentData = useCallback(
        async (id) => {
            try {
                const res = await fetch(
                    `/ftsp-proj/api/studentAllocation/${id}?activeTab=${activeTab}`
                );
                const studentData = await res.json();

                setData({
                    name: studentData.student?.name,
                    internAllo: studentData?.internship?.name
                        ? studentData?.internship?.name
                        : "",
                    prismAllo: studentData?.prism?.name
                        ? studentData?.prism?.name
                        : "",
                });
                return studentData;
            } catch (err) {
                console.error(err);
            }
        },
        [setData, activeTab]
    );

    const handleEdit = async (e) => {
        const { id } = e.currentTarget.dataset;
        const data = await fetchStudentData(id);
        if (data) {
            setIsOpen(true);
            setData("id", id);
            setData("activeTab", activeTab);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        setIsOpen(false);
        post(`/ftsp-proj/editAllocation`);
        reset();
    }

    function handleSearch() {
        const filtered = currentData.filter(
            (data) =>
                data?.student?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data?.internship?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data?.internship?.company_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data?.prism?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data?.student?.admin_no
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
        setFilterData(filtered);
    }

    useEffect(() => {
        setFilterData(currentData || []);
    }, [currentData, activeTab]);

    useEffect(() => {
        if (search) {
            handleSearch();
        } else setFilterData(currentData);
    }, [search]);

    useEffect(() => {
        if (errors?.error) {
            toast.error(errors?.error);
            errors.error = "";
        }
        if (flash?.message) {
            toast.success(flash?.message);
            flash.message = "";
        }
    }, [errors, flash]);

    return (
        <section className="w-90" id="manageAllo">
            <ToastContainer
                closeOnClick
                autoClose={3000}
                position="top-center"
            />
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="flex">
                    <h3 className="text-primary">Manage Allocation</h3>
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
                </div>
            </div>
            <div>
                <table className="w-100 my-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Admin No</th>
                            <th>
                                {activeTab == "intern"
                                    ? "Internship Name"
                                    : "Prism Name"}
                            </th>
                            {activeTab == "intern" && <th>Company Name</th>}
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((data) => {
                            const { name: studName, admin_no } = data.student;

                            return (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{studName}</td>
                                    <td>{admin_no}</td>
                                    <td>
                                        {activeTab == "intern"
                                            ? data?.internship?.name
                                            : data?.prism?.name}
                                    </td>
                                    {activeTab == "intern" && (
                                        <td>
                                            {data?.internship?.company_name}
                                        </td>
                                    )}
                                    <td>
                                        <CardButton
                                            id={data.id}
                                            onClick={handleEdit}
                                        >
                                            <img
                                                src={editIcon}
                                                alt="edit icon"
                                            />
                                        </CardButton>
                                    </td>
                                    <td>
                                        <CardButton
                                            id={data.id}
                                            onClick={() =>
                                                router.get(
                                                    `/ftsp-proj/deleteAllo/${data.id}`,
                                                    { activeTab }
                                                )
                                            }
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="delete icon"
                                            />
                                        </CardButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {isOpen && (
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        className="p-4"
                    >
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-primary">Edit Allocation</h3>
                            <label htmlFor="">Name</label>
                            <br />
                            <input
                                type="text"
                                value={data.name}
                                className="input-group"
                                readOnly
                            />
                            {data.internAllo && (
                                <>
                                    <br />
                                    <label htmlFor="">
                                        Internship Allocation
                                    </label>
                                    <br />
                                    <select
                                        name="intern_allo"
                                        id="intern_allo"
                                        className="form-select"
                                        value={data.internAllo}
                                        onChange={(e) =>
                                            setData(
                                                "internAllo",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {internships?.map((intern) => (
                                            <option
                                                key={intern?.id}
                                                value={intern?.id}
                                            >
                                                {intern?.name} -{" "}
                                                {intern?.company_name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {data?.prismAllo && (
                                <>
                                    <br />
                                    <label htmlFor="">Prism Allocation</label>
                                    <br />
                                    <select
                                        name="prism_allo"
                                        id="prism_allo"
                                        className="form-select"
                                        value={data?.prismAllo}
                                        onChange={(e) =>
                                            setData("prismAllo", e.target.value)
                                        }
                                    >
                                        {prisms?.map((prism) => (
                                            <option
                                                key={prism?.id}
                                                value={prism?.id}
                                            >
                                                {prism?.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                            <br />
                            <input
                                className="smallBtn"
                                type="submit"
                                value="edit"
                                disabled={processing}
                            />
                        </form>
                    </Modal>
                )}
            </div>
        </section>
    );
}

export default ManageAllo;
