import { TodoType } from '../ListTodos'
import { apiClient } from './ApiClient'


export const getUserTodos = (username:String) => {
    return apiClient.get(`/users/${username}/todos`)
}

export const deleteTodo = (username:string, id:number) => {
    return apiClient.delete(`/users/${username}/todos/${id}`)
}

export const getTodo = (username:string, id:number) => {
    return apiClient.get(`/users/${username}/todos/${id}`)
}

export const updateTodo = (username:string, id:number, todo:TodoType) => {
    return apiClient.put(`/users/${username}/todos/${id}`, todo)
}

export const createTodo = (username:string, todo:TodoType) => {
    return apiClient.post(`/users/${username}/todos`, todo)
}

