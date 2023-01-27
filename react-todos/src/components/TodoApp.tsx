import "../App.css"
import Login from "./Login";
import Welcome from "./Welcome";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import ListTodos from "./ListTodos";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "./Logout";
import AuthProvider, { ContextType, useAuth } from "./security/AuthContext";
import TodoPage from "./TodoPage";

export type MainProps = {
    children:JSX.Element
}

function AuthenticatedRoute({children}:MainProps){
    const authContext:ContextType = useAuth()
    if (authContext.authenticated) {
        return children
    }
    return <Navigate to="/"/>
    
}

function TodoApp()  {
    return (
    <div className="App">
        <AuthProvider>
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/welcome/:username" element={
                        <AuthenticatedRoute><Welcome/></AuthenticatedRoute>
                    }></Route>
                    <Route path="/todos" element={
                        <AuthenticatedRoute><ListTodos/></AuthenticatedRoute>
                    }/>
                    <Route path="/todo/:id" element={
                        <AuthenticatedRoute><TodoPage/></AuthenticatedRoute>
                    }/>
                    <Route path="/logout" element={<AuthenticatedRoute><Logout/></AuthenticatedRoute>}/>
                    <Route path="*" element={<ErrorComponent/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </AuthProvider>
    </div>
    )
}

export default TodoApp;