import { useEffect, useState } from "react";
import { getUserTodos, deleteTodo } from "./api/TodoService";
import { useAuth } from "./security/AuthContext";
import Todo from "./Todo"
import { ContextType } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export type TodoType = {
    id: number,
    description: string,
    targetDate: string,
    done: boolean,
    username?: string
}

export type TodoProps =  {
    todo: TodoType,
    onDelete: (id:number) => void,
    onUpdate: (id:number) => void
}




export default function ListTodos() {
    const today = new Date();
    const targetDate=new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const authContext:ContextType | any = useAuth()
    const username = authContext.username

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState<String | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getTodos = async () => {
            try {
                // const todosFromServer = await fetchTodos()
                getUserTodos(username)
                    .then((res) => dataSuccess(res))
                    .catch((err) => dataError(err)) 
            } catch (err) {
                console.log(err)
            }
        }
        getTodos()
    },[])

    const dataSuccess = (res:any) => {
        // console.log(res.data)
        setTodos(res.data)
    }

    const dataError = (err:any) => {
        console.log(err)
    }

    function onDelete(id:number) {
        deleteTodo(username, id)
            .then(() => {
                setMessage(`todo ${id} deleted`)
                setTodos(todos.filter((todo:TodoType) => todo.id !== id ))
            })
            .catch(err => console.log(err))
    }

    function onUpdate(id:number) {
        navigate(`/todo/${id}`)
    }

    function addTodo() {
        navigate(`/todo/-1`)
    }

    console.log(todos)
    return (
        <div className='container'>
            <h1>Todos:</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <ul className="list-group">
                {todos.map((todo:TodoType) => (
                    <Todo key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate}/>
                ))}
            </ul>
            <div className="m-5"><Button onClick={addTodo}>Add todo</Button></div>
        </div>
    )
}