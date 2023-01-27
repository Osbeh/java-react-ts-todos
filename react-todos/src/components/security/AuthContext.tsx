import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthentication } from "../api/AuthenticationApiService";
import { MainProps } from "../TodoApp";


export type ContextType = {
    authenticated: boolean
    login: (username:string, password:string) => Promise<boolean>
    logout: () => void
    username: string | null,
    token: string | null
}

export const AuthContext = createContext<ContextType>({} as ContextType)

export const useAuth = () => useContext(AuthContext)



export default function AuthProvider({ children }:MainProps) {

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [username, setUsername] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)


    const login = async (username:string, password:string) => {


        try {

            const res = await executeJwtAuthentication(username, password)

            if (res.status===200) {
                const jwtToken = 'Bearer ' + res.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )
                return true
            } else {
                logout()
                return false
            }
        } catch(e) {
            console.error(e)
            logout()
            return false
        }
    }

    const logout = () => {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (

        <AuthContext.Provider value={{ authenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>

    )
}