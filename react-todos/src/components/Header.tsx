import { Link } from "react-router-dom"
import { ContextType, useAuth  } from "./security/AuthContext"

export default function Header() {

    const authContext:ContextType = useAuth()
    const isAuthenticated = authContext.authenticated
    const username = authContext.username

    function logout() {
        authContext.logout()
    }

   return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                 <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-light" href="https://www.twoday.com"><i>t</i>woday</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav text-light">
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link text-light" to={`/welcome/${username}`}>Home </Link> }
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link text-light" to="/todos">Todos</Link>}
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav text-light">
                        <li className="nav-item fs-5">
                            {!isAuthenticated && <Link className="nav-link text-light" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item fs-5">
                            {isAuthenticated && <Link className="nav-link text-light" to="/logout" onClick={logout}>Logout</Link>}
                        </li>
                    </ul>
                </nav> 
            </div>
        </div>
    </header>
    )
}