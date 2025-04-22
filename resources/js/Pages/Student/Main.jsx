import "@/css/Student/main.css";
import background from "@/images/background.jpg";
function Main() {
    return (
        <>
            <section id="hero" style={{backgroundImage: `url(${background})`}}>
                <h1>
                    Internship/PRISIM Project <br />
                    Interest Mapping <br />
                    User InternFinder now!
                </h1>
            </section>
        </>
    );
}

export default Main;
