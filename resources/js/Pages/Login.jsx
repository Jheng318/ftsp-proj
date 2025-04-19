import { useForm } from "@inertiajs/react";
import "../../css/login.css";
import Button from "../components/Button";

function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        unknown: ""
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
                    {errors.email && <p className="errors">{errors.email}</p>}
                    <label className="text-gray text-sm ">Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <br />
                    {errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                    {errors.unknown && (
                        <p className="errors">{errors.unknown}</p>
                    )}
                    <Button type="submit" disabled={processing} mt="2rem">
                        Login
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default Login;
