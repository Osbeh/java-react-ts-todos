import { useParams, Link } from "react-router-dom"
import { ContextType, useAuth } from "./security/AuthContext";
// import  getHelloWorld from './api/helloWorldService'


export default function Welcome() {
 
    const {username} = useParams();

    const authContext:ContextType = useAuth()

    return <div className="Welcome">
        <h1>Welcome {username}</h1>
        <button>
            <Link to="/todos">Your todos</Link>
        </button>
    </div>
}