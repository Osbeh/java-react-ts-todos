import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ContextType, useAuth } from "./security/AuthContext"


// type Props = {
//     message: string;
// }

export default function Login() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState(false)

    const navigate=useNavigate()

    const authContext:ContextType = useAuth()

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        if (await authContext.login(username, password)) {
            setLoginError(false)
            navigate(`/welcome/${username}`)
        } else {
            setLoginError(true)
        }
    }

    return <div className="Login">
        {/* {error ? <div>{error}</div> : <div>Login success!</div>} */}
        {/* {loginSuccess && <p style={{color:"green"}}>Success!</p>} */}
        <h1>Please login</h1>
        {loginError && <p style={{color:"red"}}>Authentication failed!</p>}
        <div className="loginForm">
            <div>
                <label>Username</label>
                <input type="text" name="username" onChange={handleUsernameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    </div>
}