import "@/css/Student/main.css";
import background from "@/images/background.jpg";
import image from "@/images/studentimage-1.jpg";
import Card from "react-bootstrap/Card";
import CardButton from "../../components/CardButton";
import sortIcon from "@/images/sort.png";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";
import { router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

function Main({ internships, prism_projects, allocation }) {
    const { auth } = usePage().props;
    const [sortDir, setSortDir] = useState("lowtohigh_price");
    const DropDown = ({ setSortDir }) => (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '5px', backgroundColor: 'white', width: '150px' }} className="dropdown">
            <div onClick={() => setSortDir('lowtohigh_price')}>Price: Low to High</div>
            <div onClick={() => setSortDir('hightolow_price')}>Price: High to Low</div>
            <div onClick={() => setSortDir('newest')}>Newest</div>
            <div onClick={() => setSortDir('oldest')}>Oldest</div>
        </div>
    );

    const SortControl = ({ setSortDir }) => {

        // 1. State to manage dropdown visibility
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        // 2. Function to toggle the state
        const toggleDropdown = () => {
            setIsDropdownOpen(prevIsOpen => !prevIsOpen);
        };

        // Function to handle selection and close dropdown
        const handleSortSelection = (value) => {
            setSortDir(value);       // Update the sort direction state
            setIsDropdownOpen(false); // Close the dropdown
        };

        return (
            <div style={{ position: 'relative' }}> {/* 3. Relative positioning for the container */}
                {/* 4. Add onClick handler to the button */}
                <CardButton btnColor="#6393F2" onClick={toggleDropdown}>
                    <img src={sortIcon} alt="sortIcon" id="sortIcon" style={{ marginRight: '5px' }} />
                    <span className="text-gray">Sort By</span>
                </CardButton>

                {/* 5. Conditionally render the DropDown based on state */}
                {isDropdownOpen && (
                    // 6. Absolute positioning for the dropdown itself
                    <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: '4px' }}>
                        {/* 7. Pass the wrapper function to handle selection and closing */}
                        <DropDown setSortDir={handleSortSelection} />
                    </div>
                )}
            </div>
        );
    };

    const DisplayDataInternship = ({ internships, sortDir }) => {
        const sortedRecords = useMemo(
            () => internships.sort((a, b) => {
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
        return (
            sortedRecords.map((internship) => {
                const {
                    id,
                    title,
                    created_at,
                    description,
                    company_name,
                    salary,
                    user_name,
                } = internship;
                const editedDesc = description.split(".");

                return (
                    <a
                        href={`/ftsp-proj/intern-student/${id}`}
                        key={id}
                        style={{ textDecoration: "none" }}
                    >
                        <Card style={{ width: "100%", cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                                    <span>Posted {created_at}</span>
                                    <span className="dot">&#x2022;</span>
                                    {company_name}
                                </Card.Subtitle>
                                <Card.Text>{editedDesc[0]}.</Card.Text>
                                <section
                                    className="d-flex align-items-center"
                                    id="contact_salary"
                                >
                                    <div>
                                        <img
                                            src={personIcon}
                                            alt="personIcon"
                                        />
                                        {user_name}
                                    </div>
                                    <div>
                                        <img
                                            src={salaryIcon}
                                            alt="salaryIcon"
                                        />
                                        ${salary}
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </a>
                );
            })
        )
    }
    
    const DisplayDataPrism = ({ prism_projects, sortDir }) => {
        const sortedRecords = useMemo(
            () => prism_projects.sort((a, b) => {
                switch (sortDir) {
                    case "newest":
                        return new Date(b.date_created_at) - new Date(a.date_created_at);
                    case "oldest":
                        return new Date(a.date_created_at) - new Date(b.date_created_at);
                }
            }),
            [sortDir]
        );
        return (
            sortedRecords.map((project) => {
                const {
                    id,
                    title,
                    created_at,
                    description,
                    type,
                    user_name,
                } = project;
                const editedDesc = description.split(".");

                return (
                    <a
                        href={`/ftsp-proj/prism-student/${id}`}
                        key={id}
                        style={{ textDecoration: "none" }}
                    >
                        <Card style={{ width: "100%", cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
                                    <span>Posted {created_at}</span>
                                    <span className="dot">&#x2022;</span>
                                    {type}
                                </Card.Subtitle>
                                <Card.Text>{editedDesc[0]}.</Card.Text>
                                <section
                                    className="d-flex align-items-center"
                                    id="contact_salary"
                                >
                                    <div>
                                        <img
                                            src={personIcon}
                                            alt="personIcon"
                                        />
                                        {user_name}
                                    </div>
                                </section>
                            </Card.Body>
                        </Card>
                    </a>
                );
            })
        )
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
                                        `intern-interest/${auth.user.id}`
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
                                        `prism-interest/${auth.user.id}`
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
                <SortControl setSortDir={setSortDir}></SortControl>
            </div>

            <section id="all-internships">
                <DisplayDataInternship sortDir={sortDir} internships={internships}></DisplayDataInternship>
            </section>

            <div className="view-btn">
                <a href="/ftsp-proj/intern-student">View More</a>
            </div>

            <div className="d-flex justify-content-between align-items-center title">
                <h2>Posted PRISM Projects</h2>
                <SortControl setSortDir={setSortDir}></SortControl>
            </div>

            <section id="all-prism">
               <DisplayDataPrism sortDir={sortDir} prism_projects={prism_projects}></DisplayDataPrism>
            </section>

            <div className="view-btn">
                <a href="/prism-proj/intern-student">View More</a>
            </div>

            <div className=""></div>
        </>
    );
}
export default Main;
