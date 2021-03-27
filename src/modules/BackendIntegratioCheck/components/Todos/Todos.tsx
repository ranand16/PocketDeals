import React from "react"

interface Props{
    list: any
    listLoading: string
}

const Todos: React.FC<Props> = ({
    list,
    listLoading
}: Props) => {
    // const [newTodo, setNewTodo] = useState("")

    // const handleTodoOnChange = useCallback((e) => {
    //     console.log(e)
    // }, [newTodo])

    return (
        <>
            <div>{listLoading}</div>
            <>
                {
                    list.map((todo)=>
                        <div>
                            {todo.label} {todo.done? "DONE": "NOT DONE"}
                        </div>
                    )
                }
            </>

        </>
    )
}

export default Todos