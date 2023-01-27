import { Link } from "react-router-dom"

export default function Logout() {
   return <div className="logout">
        <h1>You are logged out</h1>
        Thank you come again!
        <button>
            <Link to="/login">Relogin</Link>
        </button>
    </div>
}