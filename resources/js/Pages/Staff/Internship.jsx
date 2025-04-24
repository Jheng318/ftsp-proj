import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import search from "@/images/search.svg";
import filter from "@/images/filter-icon.svg";
import edit from "@/images/edit-icon.svg";
import deleteIcon from "@/images/delete-icon.svg";
import CardButton from "../../components/CardButton";
import "@/css/Staff/Internship.css";
import "react-toastify/dist/ReactToastify.css";

function Internship({ internships }) {
    const { errors } = usePage().props;
    console.log(internships);

    const BASE_PATH = "/ftsp-proj";
    function handleEdit(e) {
        const id = e.currentTarget.dataset.id;
        router.get(`${BASE_PATH}/edit-internship/${id}`);
    }
    function handleDelete(e) {
        // to get the data-id that is in the button
        const id = e.currentTarget.dataset.id;
        // to go trigger the delete intern route in the StaffController in the backend
        router.delete(`${BASE_PATH}/delete-internship/${id}`);
    }
    function handleAdd() {
        router.get(`${BASE_PATH}/add-internship`);
    }
    // show the toast depending on whether there is a error message
    useEffect(() => {
        if (errors.error) {
            toast.error(errors.error);
        }
    }, [errors]);
    return (
        <section id="internship" className="my-5">
            {errors.error && (
                <ToastContainer
                    closeOnClick
                    autoClose={3000}
                    position="top-center"
                />
            )}

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
                    <button
                        className="smallBtn fw-bold fs-5 me-3"
                        onClick={handleAdd}
                    >
                        +
                    </button>
                    <label htmlFor="filterBtn">
                        <img src={filter} alt="filter" />
                    </label>
                    <input type="checkbox" id="filterBtn" className="d-none" />
                </div>
            </div>
            <div className="container-fluid grid-con">
                {internships.map((internship) => {
                    const { id, name, description, user } = internship;
                    const staffName = user.name;
                    return (
                        <div key={id} className="grid-item">
                            <div className="d-flex justify-content-between container-fluid header">
                                <h3>{name}</h3>
                                <h3>{id}</h3>
                            </div>
                            <p>Description: {description}</p>
                            <p>Teacher in Charge: {staffName}</p>
                            <div className="d-flex justify-content-between px-16px container-fluid buttonsDiv">
                                <CardButton
                                    onClick={handleEdit}
                                    btnColor="#6393F2"
                                    id={id}
                                >
                                    <img src={edit} alt="edit icon" />
                                </CardButton>
                                <CardButton
                                    onClick={handleDelete}
                                    btnColor="#F26363"
                                    id={id}
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
