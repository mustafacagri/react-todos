import React from 'react'
import {
    Card,
    CardContent,
    CardHeader
} from  '@mui/material'
import { useSelector } from 'react-redux'


 function Todo({ todo }) {
	  const priorities = useSelector(state => state.ui.priorities)
	const priority = priorities[todo?.priority]

	let deadline = ''
	if (todo?.deadline) {
		const d = new Date(todo.deadline)
		deadline = d.toLocaleDateString()
	}
	const subheader = `${priority} / ${todo?.status}`
    return (
        <>
                        <Card>
                            <CardHeader
                                title={todo?.title}
                                subheader={subheader}
                            />
                            <CardContent>
                                <label>
                                    {todo?.description}
                                </label>
																<span>{deadline}</span>
                            </CardContent>

                        </Card>
        </>
    )
}

export default Todo