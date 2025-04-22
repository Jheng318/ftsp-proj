import search from "@/images/search.svg";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../components/CardButton";

function Internship({ internships }) {
    return (
        <section id="internship" className="my-5">
            <div className="d-flex justify-content-between w-90">
                <div className="d-flex align-items-center justify-content-around">
                    <h3 className="pe-5">Internship Listing</h3>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control me-3"
                        />
                        <button className="smallBtn">
                            <img src={search} alt="search icon" />
                        </button>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <button className="smallBtn fw-bold fs-5 me-3">+</button>
                    <label htmlFor="filterBtn">
                        <img src={filter} alt="filter" />
                    </label>
                    <input type="checkbox" id="filterBtn" className="d-none" />
                </div>
            </div>
            <div className="d-grid">
                {internships.map((internship) => {
                    const { id, name, description, user } = internship;
                    const staffName = user.name;
                    return (
                        <div key={id} className="g-3 border-2 border">
                            <div className="d-flex justify-content-between">
                                <h3>{name}</h3>
                                <h3>{id}</h3>
                            </div>
                            <p>Description: {description}</p>
                            <p>Teacher in Charge: {staffName}</p>
                            <div className="d-flex justify-content-between">
                                <CardButton
                                    onClick={() => console.log("hell")}
                                    btnColor="#6393F2"
                                >
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton
                                    onClick={() => console.log("hell")}
                                    btnColor="#F26363"
                                >
                                    <img src={deleteIcon} alt="delete icon" />
                                </CardButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Internship;
