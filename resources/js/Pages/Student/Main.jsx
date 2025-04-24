import { router, usePage } from "@inertiajs/react";
import "@/css/Student/main.css";
import background from "@/images/background.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from 'react-bootstrap/Card';
import CardButton from "../../components/CardButton";
import sortIcon from "@/images/sort.png";
import personIcon from "@/images/person.png";
import salaryIcon from "@/images/salary.png";



function Main({ internships, prism_projects }) {

    return (
        <section>
            <section id="hero" style={{ backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background})` }}>
                <div className="backgroundText">
                    <h1 className="h1">Internship/PRISIM Project <br /> Interest Mapping</h1>
                    <h3>Use SkillMap Now!</h3>
                </div>
            </section>
            <div className="d-flex justify-content-between align-items-center" id="title">
                <h2>Posted Internships</h2>
                <CardButton
                    btnColor="#6393F2"
                >
                    <img src={sortIcon} alt="sortIcon" />Sort By
                </CardButton>
            </div>

            <section id="all-internships">
                {internships.map((internship) => {
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

                                    </section>
                                </Card.Body>
                            </Card>
                        </a>
                    );
                })}
            </section>

            <div className="d-flex justify-content-between align-items-center" id="title">
                <h2>Posted PRISM Projects</h2>
                <CardButton
                    btnColor="#6393F2"
                >
                    <img src={sortIcon} alt="sortIcon" />Sort By
                </CardButton>
            </div>

            <section id="all-prism">
                {prism_projects.map((project) => {
                    const { id, title, created_at, description, company_name, salary, user_name } = project;
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

                                    </section>
                                </Card.Body>
                            </Card>
                        </a>
                    );
                })}
            </section>
        </section>
    );
}
export default Main;
