import { Link } from "@inertiajs/react";
import searchIcon from "@/images/search.svg";
import pencil from "@/images/edit-icon.svg";
import filter from "@/images/filter-icon.svg";
import { useState } from "react";

function Unallocated({ unallocatedData }) {
    console.log(unallocatedData);
    const [search, setSearch] = useState(null);

    return (
        <section className="w-90" id="unallo">
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <div>
                    <h3 className="text-primary">Allocation Details</h3>
                </div>
                <div id="right" className="d-flex align-items-center">
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control me-3"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="smallBtn">
                            <img src={searchIcon} alt="search icon" />
                        </button>
                    </div>
                    <label htmlFor="filterBtn" style={{ marginLeft: "5rem" }}>
                        <img src={filter} alt="filter" />
                    </label>
                    <input type="checkbox" id="filterBtn" className="d-none" />
                    <span className="filterOption w-100">
                        <select
                            name="jobRole"
                            id="jobRole"
                            className="w-100"
                            // value={filterOp.role}
                            // onChange={(e) =>
                            //     setFilterOp({
                            //         ...filterOp,
                            //         role: e.target.value,
                            //     })
                            // }
                        >
                            <option value="">Select Role</option>
                            {/* {internships?.map((i) => (
                                <option key={i.id} value={i.name}>
                                    {i.name}
                                </option>
                            ))} */}
                        </select>
                        <select
                            name="languages"
                            id="languages"
                            className="w-100"
                            // value={filterOp.lang}
                            // onChange={(e) =>
                            //     setFilterOp({
                            //         ...filterOp,
                            //         lang: e.target.value,
                            //     })
                            // }
                        >
                            <option value="">Select Language</option>
                            {/* {getUniqueLanguages()?.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))} */}
                        </select>
                        <select
                            name="frameworks"
                            id="frameworks"
                            className="w-100"
                            // value={filterOp.frame}
                            // onChange={(e) =>
                            //     setFilterOp({
                            //         ...filterOp,
                            //         frame: e.target.value,
                            //     })
                            // }
                        >
                            <option value="">Select Framework</option>
                            {/* {getUniqueFramework()?.map((frame) => (
                                <option key={frame} value={frame}>
                                    {frame}
                                </option>
                            ))} */}
                        </select>
                    </span>
                </div>
            </div>
            <table className="w-100 my-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Admin No</th>
                        <th>Company</th>
                        <th>Internship Name</th>
                        <th>Teacher in Charge</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {unallocatedData.data.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.admin_no}</td>
                            <td>Not Assigned</td>
                            <td>Not Assigned</td>
                            <td>Not Assigned</td>
                            <td>
                                <button
                                    // onClick={handleEdit}
                                    data-id={student.id}
                                    style={{ position: "relative" }}
                                >
                                    <img
                                        src={pencil}
                                        alt="edit icon"
                                        className="fill-blue"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="7">
                            <div className="d-flex justify-content-end me-5 align-items-center">
                                <p className="mb-0">
                                    {unallocatedData.current_page}-
                                    {unallocatedData.last_page} of{" "}
                                    {unallocatedData.last_page}
                                </p>
                                <div className="ms-5 align-items-center d-flex gap-3">
                                    {unallocatedData?.prev_page_url && (
                                        <Link
                                            href={
                                                unallocatedData?.prev_page_url
                                            }
                                            prefetch
                                            className="dark-links"
                                            method="get"
                                        >
                                            &lt;
                                        </Link>
                                    )}
                                    {unallocatedData?.next_page_url && (
                                        <Link
                                            href={
                                                unallocatedData?.next_page_url
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
            <button className="primaryBtn fw-bold">Start Matching</button>
        </section>
    );
}

export default Unallocated;
