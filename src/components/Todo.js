import React from 'react'
import { Card, CardContent } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTodo, openTodoModal } from '../store/slices/uiSlice'

function Todo({ todo }) {
  const dispatch = useDispatch()
  const priorities = useSelector(state => state.ui.priorities)
  const priority = priorities[todo?.priority]

  const editTodo = () => {
    dispatch(setTodo(todo))
    dispatch(openTodoModal())
  }

  let deadline = ''
  if (todo?.deadline) {
    const d = new Date(todo.deadline)
    deadline = d.toLocaleDateString()
  }
  const subheader = `${priority} / ${todo?.status}`
  return (
    <>
      <Card>
        <CardContent>
          <h3 onClick={() => editTodo()} >{todo?.title}</h3>
          <p>{subheader}</p>
          <p>{todo?.description}</p>
          <span>{deadline}</span>
        </CardContent>
      </Card>
    </>
  )
}

export default Todo
