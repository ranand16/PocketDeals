import React, { useCallback, useState } from "react"

interface Props {
    todoSaveRequest: (label: string, done: boolean) => void
}
const AddTodo: React.FC<Props> = ({
    todoSaveRequest
}: Props) => {
    const [newTodo, setNewTodo] = useState("")

    const handleTodoOnChange = useCallback((e) => {
        setNewTodo(e.target.value)
    }, [newTodo])

    const handleSubmit = () => {
        todoSaveRequest(newTodo,false)
    }

    return (
        <div>
            <input 
                id={"addTodo"}
                type={"text"}
                onChange={handleTodoOnChange} 
                value={newTodo}
            />
            <input 
                type={"submit"}
                onClick={handleSubmit} 
            />
            
        </div>
    )
}

export default AddTodo