import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import CardButton from "../../components/CardButton";
import deleteIcon from "@/images/red-delete-icon.svg";
import "react-toastify/dist/ReactToastify.css";

function DeleteAllo({ data, activeTab }) {
    const { errors, flash } = usePage().props;
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState(data ?? []);

    function handleSearch() {
        const filtered = data.filter((d) => {
            const { name: studName, admin_no } = d.student;
            return (
                studName.toLowerCase().includes(search.toLowerCase()) ||
                admin_no.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilterData(filtered);
    }

    useEffect(() => {
        if (search !== "") handleSearch();
        else setFilterData(data);
    }, [search]);

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash?.message);
            flash.message = "";
        }
        if (errors?.error) {
            toast.error(errors?.error);
            errors.error = "";
        }
    }, [errors, flash]);

    return (
        <section className="w-90" id="unallo">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
            />
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <h3 className="text-primary">Remove Allocated Students</h3>
                <div id="right" className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {filterData.length > 0 ? (
                <table className="w-100 my-5">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student's Admin No</th>
                            <th>
                                {activeTab == "intern" ? "Internship" : "Prism"}{" "}
                                Name
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((d) => {
                            const { name: studName, admin_no } = d.student;
                            const {
                                student_id,
                                internship_id = null,
                                prism_id = null,
                            } = d;
                            const { name } =
                                activeTab == "intern" ? d.internship : d.prism;

                            return (
                                <tr key={d.id}>
                                    <td>{studName}</td>
                                    <td>{admin_no}</td>
                                    <td>{name}</td>
                                    <td>
                                        <CardButton
                                            onClick={() => {
                                                router.get(
                                                    `/ftsp-proj/delete-allo/${
                                                        activeTab == "intern"
                                                            ? internship_id
                                                            : prism_id
                                                    }`,
                                                    {
                                                        student_id,
                                                        activeTab,
                                                    }
                                                );
                                            }}
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
            ) : (
                <p className="text-danger">
                    No Students Assign to this Prism Project or Internship
                </p>
            )}
        </section>
    );
}

export default DeleteAllo;
