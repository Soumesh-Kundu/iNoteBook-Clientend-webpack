import { Link, useLocation } from "react-router-dom"
export default function Navbar(props) {
    let location = useLocation()
    const authToken = localStorage.getItem("authToken")
    const removeAuthentication = (e) => {
        if (authToken) {
            localStorage.removeItem("authToken")
            props.showAlert("See ya","You have been logged out, Have a nice Day","success")
        }
    }
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="logoColor f-1">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} 
                                ${(location.pathname==='/login' || location.pathname==='/signup')?"d-none":""}
                                `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""} ${(location.pathname==='/login' || location.pathname==='/signup')?"d-none":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link className={`btn btn-primary mx-2 ${location.pathname==="/login"? "d-none" : ""}`} type="submit" role="button" to="/login" onClick={removeAuthentication}>{authToken === null ? "Log In" : "Log Out"}</Link>
                            <Link className={`btn btn-primary mx-2 ${location.pathname==="/signup" ||authToken!==null? "d-none" : ""}`} to="/signup" type="submit" role="button">Sign Up</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
