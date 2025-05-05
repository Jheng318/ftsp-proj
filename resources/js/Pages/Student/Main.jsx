import "@/css/Student/main.css";
import background from "@/images/background.jpg";
import image from "@/images/studentimage-1.jpg";
import Card from "react-bootstrap/Card";
import CardButton from "../../components/CardButton";
import sortIcon from "@/images/sort.png";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";
import { router, usePage } from "@inertiajs/react";

function Main({ internships, prism_projects, allocation }) {
    const { auth } = usePage().props;
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
                <CardButton btnColor="#6393F2">
                    <img src={sortIcon} alt="sortIcon" id="sortIcon" />
                    <span className="text-gray">Sort By</span>
                </CardButton>
            </div>

            <section id="all-internships">
                {internships.map((internship) => {
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
                })}
            </section>

            <div className="view-btn">
                <a href="/ftsp-proj/intern-student">View More</a>
            </div>

            <div className="d-flex justify-content-between align-items-center title">
                <h2>Posted PRISM Projects</h2>
                <CardButton btnColor="#6393F2">
                    <img src={sortIcon} alt="sortIcon" id="sortIcon" />
                    <span className="text-gray">Sort By</span>
                </CardButton>
            </div>

            <section id="all-prism">
                {prism_projects.map((project) => {
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
                })}
            </section>

            <div className="view-btn">
                <a href="/prism-proj/intern-student">View More</a>
            </div>

            <div className=""></div>
        </>
    );
}
export default Main;
