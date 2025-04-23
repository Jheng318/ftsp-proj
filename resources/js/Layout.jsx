import { Link, usePage } from "@inertiajs/react";
import logo from "@/images/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function Layout({ children }) {
    // these hooks help to pass props like shared props to the layouts
    // the auth props have 4 props that we can use like auth.user to get the current loggedin user
    // auth.isAuthenticated to get a boolean that checked whether the user is logged in or not
    // auth.isStaff to get a boolean that checkd whether the user is a staff and is looged in
    // auth.isStudent to get a boolean that checkd whether the user is a student and is looged in

    const { auth } = usePage().props;
    return (
        <>
            <Navbar expand="lg" className="bg-blue-primary">
                <Container className="text-gray">
                    <Navbar.Brand href="/ftsp-proj/">
                        <img src={logo} alt="skill map logo" className="logo" />
                    </Navbar.Brand>

                    <div className="d-flex w-50 justify-content-evenly">
                        {auth.isStaff ? (
                            <>
                                <Nav.Link href="/ftsp-proj/intern-staff">
                                    Internship
                                </Nav.Link>
                                <Nav.Link href="/ftsp-proj/prisim-staff">
                                    PRISIM
                                </Nav.Link>
                                <NavDropdown title="Allocation">
                                    <NavDropdown.Item href="/ftsp-proj/unassigned-allocation">
                                        Unassigned Allocation
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/ftsp-proj/assigned-allocation">
                                        Assigned Allocation
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/ftsp-proj/student-info">
                                    Student Info
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/ftsp-proj/intern-student">
                                    Internship
                                </Nav.Link>
                                <Nav.Link href="/ftsp-proj/prisim-student">
                                    PRISIM
                                </Nav.Link>
                                <Nav.Link href="/ftsp-proj/allocation-student">
                                    Allocation
                                </Nav.Link>
                            </>
                        )}
                    </div>
                    {auth.isAuthenticated ? (
                        <Nav.Link href="/ftsp-proj/logout" className="logout">
                            Logout
                        </Nav.Link>
                    ) : (
                        <Nav.Link href="/ftsp-proj/">Login</Nav.Link>
                    )}
                </Container>
            </Navbar>
            <main>{children}</main>
        </>
    );
}
