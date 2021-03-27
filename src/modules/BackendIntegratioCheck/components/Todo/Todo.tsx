import React, { useCallback, useEffect } from "react"
import { DispatchProps, StateProps } from "../../index"
import AddTodo from "../AddTodo/AddTodo"
import Todos from "../Todos/Todos"
interface Props extends DispatchProps, StateProps {}

const Todo: React.FC<Props> = ({
    list,
    listLoading,
    todoSaveRequestAction,
    todoSyncRequestAction
}: Props) => {
    useEffect(()=> {
        todoSyncRequestAction()
    }, [])

    const handleSaveNewTodo = useCallback((label, done)=> {
        todoSaveRequestAction({label: label, done: done})
    }, [])

    return (
        <div>
            <AddTodo 
                todoSaveRequest = {handleSaveNewTodo}
            />
            <br/>
            <Todos 
                list={list}
                listLoading={listLoading}
            />

        </div>
    )
}

export default Todo