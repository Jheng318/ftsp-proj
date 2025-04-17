import React from "react";
import { useForm } from "@inertiajs/react";
function upload() {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });
    function handleSubmission(e) {
        e.preventDefault();
        post("/ftsp-proj/api/file");
    }
    return (
        <form onSubmit={handleSubmission} encType="multipart/form-data">
            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setData("file", e.target.files[0])}
            />
            {errors.file && <div>{errors.email}</div>}
            <input type="submit" value="submit" disabled={processing} />
        </form>
    );
}

export default upload;
