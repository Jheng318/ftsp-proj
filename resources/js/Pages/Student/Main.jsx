import "@/css/Student/main.css";
import background from "@/images/background.jpg";
function Main() {
    return (
        <>
            <section id="hero" style={{backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background})`}}>
                <div className="backgroundText">
                    <h1 className="h1">Internship/PRISIM Project <br /> Interest Mapping</h1>
                    <h3>Use InternFinder Now!</h3>
                </div>
            </section>
        </>
    );
}

export default Main;
