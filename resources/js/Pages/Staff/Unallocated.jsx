import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "@/css/Staff/unallocated.css";

function Unallocated({ unallocatedDataI, unallocatedDataP }) {
    const {errors} = usePage().props;
    console.log(errors.error);
    const [search, setSearch] = useState(null);
    const [activeTab, setActiveTab] = useState("intern");
    const [filterData, setFilterData] = useState(unallocatedDataI?.data);

    const currentData =
        activeTab == "intern" ? unallocatedDataI : unallocatedDataP;

    useEffect(() => {
        setFilterData(currentData?.data || []);
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

    useEffect(() => {
        if (search) {
            handleSearch();
        } else setFilterData(currentData?.data);
    }, [search]);

    return (
        <section className="w-90" id="unallo">
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div className="flex">
                    <h3 className="text-primary">Unallocated Details</h3>
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
            <table className="w-100 my-5">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Admin No</th>
                        <th>Company</th>
                        <th>Internship Name</th>
                        <th>Teacher in Charge</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.admin_no}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="7">
                            <div className="d-flex justify-content-end me-5 align-items-center">
                                <p className="mb-0">
                                    {unallocatedDataI?.current_page}-
                                    {unallocatedDataI?.last_page} of{" "}
                                    {unallocatedDataI?.last_page}
                                </p>
                                <div className="ms-5 align-items-center d-flex gap-3">
                                    {unallocatedDataI?.prev_page_url && (
                                        <Link
                                            href={
                                                unallocatedDataI?.prev_page_url
                                            }
                                            prefetch
                                            className="dark-links"
                                            method="get"
                                        >
                                            &lt;
                                        </Link>
                                    )}
                                    {unallocatedDataI?.next_page_url && (
                                        <Link
                                            href={
                                                unallocatedDataI?.next_page_url
                                            }
                                            prefetch
                                            className="dark-links"
                                            method="get"
                                        >
                                            &gt;
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                className="primaryBtn fw-bold mb-5"
                onClick={() =>
                    router.get("/ftsp-proj/matchStudents", {
                        tab: activeTab,
                    })
                }
            >
                Start Matching
            </button>
        </section>
    );
}

export default Unallocated;
