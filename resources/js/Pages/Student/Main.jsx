import "@/css/Student/main.css";
import background from "@/images/background.jpg";
import image from "@/images/studentimage-1.jpg";

import SortControl from "@/js/components/SortControl";
import InternPrismCard from "@/js/components/InternPrismCard";
import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

function Main({ internships, prism_projects, allocation }) {
    const { auth } = usePage().props;
    const [sortDir, setSortDir] = useState("lowtohigh_price");

    const DisplayData = ({ data, sortDir, prism }) => {
        if (prism) {
            const sortedRecords = useMemo(
                () => data.sort((a, b) => {
                    switch (sortDir) {
                        case "newest":
                            return new Date(b.date_created_at) - new Date(a.date_created_at);
                        case "oldest":
                            return new Date(a.date_created_at) - new Date(b.date_created_at);
                    }
                }),
                [sortDir]
            );
            return <InternPrismCard sortedRecords={sortedRecords} prism={true}></InternPrismCard>
        } else {
            const sortedRecords = useMemo(
                () => data.sort((a, b) => {
                    switch (sortDir) {
                        case "lowtohigh_price":
                            return a.salary - b.salary;
                        case "hightolow_price":
                            return b.salary - a.salary;
                        case "newest":
                            return new Date(b.date_created_at) - new Date(a.date_created_at);
                        case "oldest":
                            return new Date(a.date_created_at) - new Date(b.date_created_at);
                    }
                }),
                [sortDir]
            );
            return <InternPrismCard sortedRecords={sortedRecords} prism={false}></InternPrismCard>
        }
    }

    return (
        <>
            <section
                id="hero"
                style={{
                    backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background})`,
                }}
            >
                <div className="backgroundText">
                    <h1 className="h1">
                        Internship/prism Project <br /> Interest Mapping
                    </h1>
                    <h3>Use SkillMap Now!</h3>
                </div>
            </section>

            <div className="title">
                <h2>Allocation Status</h2>
            </div>

            <section id="allocation">
                {allocation.allocation_status == false && (
                    <>
                        <h3 className="blue margin-left">
                            Unsuccessful Allocation
                        </h3>
                        <p className="description margin-left">
                            You have not been assigned to a internship/PRISM
                            allocation yet. Please hold.
                        </p>
                    </>
                )}
                {allocation.allocation_type == "Internship" && (
                    <>
                        <h3 className="blue margin-left">
                            Congratulations!
                        </h3>
                        <p className="description margin-left">
                            You will be interning as a <b>{allocation.job_title}</b> at <b>{allocation.company_name}!</b><br></br>
                            Click below to see your internship details
                        </p>
                        <button className="detail-btn"
                            onClick={() => {
                                router.get(
                                    `allocation-student`
                                );
                            }}
                        >
                            View Details
                        </button>
                    </>
                )}
                {allocation.allocation_type == "Prism" && (
                    <>
                        <h3 className="blue margin-left">
                            Congratulations!
                        </h3>
                        <p className="description margin-left">
                            Your project is a <b>{allocation.project_title}</b> relating to <b>{allocation.project_type}!</b><br></br>
                            Click below to see your PRISM project details
                        </p>
                        <button className="detail-btn"
                            onClick={() => {
                                router.get(
                                    `allocation-student`
                                );
                            }}
                        >
                            View Details
                        </button>
                    </>
                )}

            </section>

            <div className="title">
                <h2>Indicate your Interest</h2>
            </div>

            <section id="interests">
                <div className="description">
                    <p>
                        In order for successful allocation, you will need to
                        submit a form depending on which allocation and indicate
                        your skills and strengths.
                    </p>
                    <div className="d-flex">
                        <div className="detail-btn">
                            <button
                                onClick={() => {
                                    router.get(
                                        `intern-interest`
                                    );
                                }}
                            >
                                Internship Interest
                            </button>
                        </div>
                        <div className="detail-btn">
                            <button
                                onClick={() => {
                                    router.get(
                                        `prism-interest`
                                    );
                                }}
                            >
                                PRISM Interest
                            </button>
                        </div>
                    </div>
                </div>

                <img src={image} alt="image1" />
            </section>

            <div className="d-flex justify-content-between align-items-center title">
                <h2>Posted Internships</h2>
                <SortControl setSortDir={setSortDir} prism={false}></SortControl>
            </div>

            <section id="all-internships">
                <DisplayData sortDir={sortDir} data={internships} prism={false}></DisplayData>
            </section>

            <div className="view-btn">
                <a href="/ftsp-proj/detailed-info?tab=intern">View More</a>
            </div>

            <div className="d-flex justify-content-between align-items-center title">
                <h2>Posted PRISM Projects</h2>
                <SortControl setSortDir={setSortDir} prism={true}></SortControl>
            </div>

            <section id="all-prism">
                <DisplayData sortDir={sortDir} data={prism_projects} prism={true}></DisplayData>
            </section>

            <div className="view-btn">
                <a href="/prism-proj/detailed-info?tab=prism">View More</a>
            </div>

            <div className=""></div>
        </>
    );
}
export default Main;
