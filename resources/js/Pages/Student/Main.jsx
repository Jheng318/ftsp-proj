import "@/css/Student/main.css";
import background from "@/images/background.jpg";
import image from "@/images/studentimage-1.jpg"
import Card from "react-bootstrap/Card";
import CardButton from "../../components/CardButton";
import sortIcon from "@/images/sort.png";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";
import { usePage } from "@inertiajs/react";

function Main({ internships, prism_projects, allocation}) {
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
                        Internship/PRISIM Project <br /> Interest Mapping
                    </h1>
                    <h3>Use SkillMap Now!</h3>
                </div>
            </section>

            <div className="title">
                <h2>Indicate your Interest</h2>
            </div>

            <section id="interests">
                <div className="description">
                    <p>In order for successful allocation, you will need to submit a form depending on which allocation and indicate your skills and strengths.</p>
                    <p>If you have submitted either of the interest forms, you can also edit your interests by clicking the respective links below.</p>
                    <div className="d-flex">
<<<<<<< Updated upstream
                        <div className="detail-btn right">
                            <a href="/prism-proj/intern-student">Internship</a>
                        </div>
                        <div className="detail-btn">
                            <a href="/prism-proj/intern-student">PRISM</a>
=======
                        <div className="detail-btn">
                            <a href="/prism-proj/intern-student">View More</a>
                        </div>
                        <div className="detail-btn">
                            <a href="/prism-proj/intern-student">View More</a>
>>>>>>> Stashed changes
                        </div>
                    </div>
                </div>

                <img src={image} alt="image1" />
            </section>


            <div className="d-flex justify-content-between align-items-center title">
                <h2>Posted Internships</h2>
<<<<<<< Updated upstream
                <CardButton btnColor="#6393F2">
                    <img src={sortIcon} alt="sortIcon" />
                    Sort By
=======
                <CardButton
                    btnColor="#6393F2"
                >
                    <img src={sortIcon} alt="sortIcon" />Sort By
>>>>>>> Stashed changes
                </CardButton>
            </div>

            <section id="all-internships">
                {internships.map((internship) => {
<<<<<<< Updated upstream
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
=======
                    const { id, title, created_at, description, company_name, salary, user_name } = internship;
                    const editedDesc = description.split('.');

                    return (
                        <a href={`/ftsp-proj/intern-student/${id}`} key={id} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '100%', cursor: 'pointer' }} >
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted d-flex align-items-center"><span>Posted {created_at}</span><span className="dot">&#x2022;</span>{company_name}</Card.Subtitle>
                                    <Card.Text>
                                        {editedDesc[0]}.
                                    </Card.Text>
                                    <section className="d-flex align-items-center" id="contact_salary">
                                        <div>
                                            <img src={personIcon} alt="personIcon" />
                                            {user_name}
                                        </div>
                                        <div>
                                            <img src={salaryIcon} alt="salaryIcon" />
                                            ${salary}
                                        </div>

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <CardButton btnColor="#6393F2">
                    <img src={sortIcon} alt="sortIcon" />
                    Sort By
=======
                <CardButton
                    btnColor="#6393F2"
                >
                    <img src={sortIcon} alt="sortIcon" />Sort By
>>>>>>> Stashed changes
                </CardButton>
            </div>

            <section id="all-prism">
                {prism_projects.map((project) => {
<<<<<<< Updated upstream
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
=======
                    const { id, title, created_at, description, type, user_name } = project;
                    const editedDesc = description.split('.');

                    return (
                        <a href={`/ftsp-proj/prism-student/${id}`} key={id} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '100%', cursor: 'pointer' }} >
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted d-flex align-items-center"><span>Posted {created_at}</span><span className="dot">&#x2022;</span>{type}</Card.Subtitle>
                                    <Card.Text>
                                        {editedDesc[0]}.
                                    </Card.Text>
                                    <section className="d-flex align-items-center" id="contact_salary">
                                        <div>
                                            <img src={personIcon} alt="personIcon" />
                                            {user_name}
                                        </div>

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

            <div className="title">
                <h2>Allocation Status</h2>
            </div>

            <section id="interests">
                {allocation.allocation_status == false && <div>Test</div>}
            </section>
=======
>>>>>>> Stashed changes
        </>
    );
}
export default Main;
