import { useState } from "react";
import CardButton from "../../components/CardButton";
import deleteIcon from "@/images/delete-icon.svg";

function DeleteAllo({ data, activeTab }) {
    return (
        <section className="w-90" id="unallo">
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <h3 className="text-primary">Remove Allocated Students</h3>
                <div id="right" className="d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control me-3"
                    />
                </div>
            </div>
            <table className="w-100 my-5">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student's Admin No</th>
                        <th>
                            {activeTab == "intern" ? "Internship" : "Prism"}{" "}
                            Name
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d) => {
                        const { name: studName, admin_no } = d.student;
                        const { name } =
                            activeTab == "intern" ? d.internship : d.prism;
                        return (
                            <tr key={d.id}>
                                <td>{studName}</td>
                                <td>{admin_no}</td>
                                <td>{name}</td>
                                <td className="text-center">
                                    <CardButton btnColor="#F26363">
                                        <img
                                            src={deleteIcon}
                                            alt="delete icon"
                                        />
                                    </CardButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default DeleteAllo;
