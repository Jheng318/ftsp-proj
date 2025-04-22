import { Link, usePage } from "@inertiajs/react";
import "@/css/layout.css";
export default function Layout({ children }) {
    // these hooks help to pass props like shared props to the layouts
    // the auth props have 4 props that we can use like auth.user to get the current loggedin user
    // auth.isAuthenticated to get a boolean that checked whether the user is logged in or not
    // auth.isStaff to get a boolean that checkd whether the user is a staff and is looged in
    // auth.isStudent to get a boolean that checkd whether the user is a student and is looged in

    const { auth } = usePage().props;
    return (
        <>
            <nav>
                <Link href="/ftsp-proj/" prefetch>
                    Home
                </Link>
                {!auth.isAuthenticated && (
                    <Link href="/ftsp-proj/login" prefetch>
                        Login
                    </Link>
                )}
                {auth.isStaff && (
                    <Link href="/ftsp-proj/dashboard">Dashboard</Link>
                )}
                {auth.isStudent && <Link href="/ftsp-proj/main">Main</Link>}
                {auth.isAuthenticated && (
                    <>
                        <Link href="/ftsp-proj/intern">Internship</Link>
                        <Link href="/ftsp-proj/prisim">PRISIM</Link>
                        <Link href="/ftsp-proj/logout">Logout</Link>
                    </>
                )}
            </nav>
            <main>{children}</main>
        </>
    );
}
