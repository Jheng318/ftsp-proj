import { useForm, usePage } from "@inertiajs/react";
import "../../css/login.css";
import Button from "../components/Button";

function Login() {
    const { errors } = usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        reset,
    } = useForm({
        email: "",
        password: "",
    });

    function submit(e) {
        e.preventDefault();
        reset();
        post("/ftsp-proj/login");
    }

    return (
        <section id="login">
            <form onSubmit={submit}>
                <div className="con">
                    <h1>Login</h1>
                    <label className="text-gray text-sm">Email</label>
                    <br />
                    <input
                        type="text"
                        value={data.email}
                        placeholder="example@gmail.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <br />
                    {formErrors.email && (
                        <p className="errors">{formErrors.email}</p>
                    )}
                    <label className="text-gray text-sm">Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <br />
                    {formErrors.password && (
                        <p className="errors">{formErrors.password}</p>
                    )}
                    {formErrors.unknown && (
                        <p className="errors">{formErrors.unknown}</p>
                    )}
                    {errors.errors && <p className="errors">{errors.errors}</p>}
                    <Button type="submit" disabled={processing} mt="2rem">
                        Login
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default Login;
