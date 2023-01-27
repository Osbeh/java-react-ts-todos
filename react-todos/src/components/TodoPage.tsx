import { Formik, Form, Field, ErrorMessage } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTodo, getTodo, updateTodo } from "./api/TodoService"
import { TodoType } from "./ListTodos"
import { ContextType, useAuth } from "./security/AuthContext"

type formValues = {
    description: string,
    targetDate: string
}

export default function TodoPage() {

    const [description, setDescription] = useState<string>('')
    const [targetDate, setTargetDate] = useState<string>('')

    const { id } = useParams()
    const authContext:ContextType = useAuth()
    const username = authContext.username
    // let numeralId:number
    // if (id)  numeralId = parseInt(id)

    const numeralId = id ? parseInt(id) : -1

    const navigate = useNavigate()
    

    function retrieveTodos() {
        if (numeralId !== -1 && username) {
        getTodo(username, numeralId)
            .then(res =>  {
                console.log(res)
                setDescription(res.data.description)
                setTargetDate(res.data.targetDate)
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        retrieveTodos()
    },[id])



    function onSubmit(values:formValues) {
        if (!username) {
            return
        }
        console.log('click')
        const todo:TodoType = {
            id: numeralId,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if (numeralId === -1) {
            createTodo(username, todo)
                .then(res => navigate('/todos'))
                .catch(err => console.log(err))
        } else {
            updateTodo(username, numeralId, todo)
                .then(res=> navigate('/todos'))
                .catch(err => console.log(err))
        }
        //console.log(todo)
    }

    function validateValues(values:formValues) {
        let errors = {
            description: '',
            targetDate: ''
        }

        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters'
        }

        if (values.targetDate === null || values.targetDate === "") {
            errors.targetDate = "Enter a valid date"
        }

        if (errors.description.length > 1 || errors.targetDate.length > 1 )  return errors

        return;
    }

    return (
        <div className="container">
            <h1>Todo details</h1>
            <div>
                <Formik initialValues={{ description, targetDate}} enableReinitialize={true} onSubmit={onSubmit} validate={validateValues} validateOnChange={false} validateOnBlur={false}> 
                {
                    (props) => (
                        <Form>
                           <ErrorMessage name={"description"} component="div" className="alert alert-warning m-2"></ErrorMessage> 
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <ErrorMessage name={"targetDate"} component="div" className="alert alert-warning m-2"></ErrorMessage> 
                            <fieldset className="form-group">
                                <label>Target date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-3" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }

                </Formik>
            </div>
        </div>
    )
}