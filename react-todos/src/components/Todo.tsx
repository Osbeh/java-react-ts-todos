import { TodoProps } from "./ListTodos"


export default function Todo({todo, onDelete, onUpdate}:TodoProps){

    return (
        <li className="list-group-item bg-secondary text-light">
                {/* <div style={{display:"flex", gap:"2rem", width:"100%", justifyContent:"space-between"}}> */}
                <div style={{display:"flex", gap:"1rem"}}>
                <div style={{width:"50%", textAlign:"left"}}>{todo.description}</div>
                <div style={{width:"15%"}}>{todo.targetDate}</div>
                <div style={{width:"15%"}}>{todo.done.toString()}</div>
                <button className="btn btn-warning" onClick={() => onDelete(todo.id)}>Delete</button>
                <button className="btn btn-info" onClick={() => onUpdate(todo.id)}>Update</button>
            </div>
        </li>
    )
}