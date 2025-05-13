import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "@/css/Staff/unallocated.css";

function ManageAllo({ allocatedI, allocatedP }) {
    const { errors } = usePage().props;
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("intern");
    const [filterData, setFilterData] = useState(allocatedI?.data);

    const currentData = activeTab == "intern" ? allocatedI : allocatedP;

    function toggleActive(tab) {
        setActiveTab(tab);
    }

    useEffect(() => {
        setFilterData(currentData?.data || []);
    }, [activeTab, currentData]);

    useEffect(() => {
        if (search) {
            handleSearch();
        } else setFilterData(currentData?.data);
    }, [search]);

    return (
        <section className="w-90" id="manageAllo">
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
            <div></div>
        </section>
    );
}

export default ManageAllo;
