import { useForm } from "@inertiajs/react";

function EditAllo({ data, students, listing, activeTab }) {
    // can make the allocation page the home page for the teachers.
    const {
        post,
        data: formData,
        setData: setFormData,
        processing,
        errors,
    } = useForm({
        allocation_id: "",
        internOrPrism: "",
        student_id: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
    }
    function handleAllocation(e) {
        const { value } = e.target;
        setFormData("allocation_id", +value);
        const selected = data.find((d) => d.id == value);
        if (selected) {
            setFormData("student_id", selected.student_id);
        }
    }
    console.log(formData);

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <select
                    name="editData"
                    id="editData"
                    value={formData.allocation_id}
                    onChange={handleAllocation}
                >
                    <option disabled selected>
                        Select Allocation
                    </option>

                    {data.map((d) => {
                        const active =
                            activeTab == "intern" ? d.internship : d.prism;
                        return (
                            <option key={d.id} value={d.id}>
                                {active.name} - {d.student.name}
                            </option>
                        );
                    })}
                </select>
                <select
                    name="intern"
                    id="intern"
                    value={formData.internOrPrism}
                    onChange={(e) =>
                        setFormData("internOrPrism", +e.target.value)
                    }
                >
                    <option value="">
                        Select {activeTab == "intern" ? "Internship" : "Prism"}
                    </option>
                    {listing.map((list) => {
                        return (
                            <option value={list.id} key={list.id}>
                                {list.name}
                            </option>
                        );
                    })}
                </select>
                <input type="hidden" value={formData.student_id} />
                <button type="submit" className="smallBtn">
                    Edit Allocation
                </button>
            </form>
        </section>
    );
}

export default EditAllo;
