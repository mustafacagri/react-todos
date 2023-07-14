import React from 'react'
import { Card, CardContent } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTodo, openTodoModal } from '../store/slices/uiSlice'
import { Close, Edit } from '@mui/icons-material'
import IconButton from '@material-ui/core/IconButton'

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

  const styles = {
    smallIcon: {
      fontSize: 16,
      marginLeft: 5,
      cursor: 'pointer'
    },
    h3: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
  }
  return (
    <>
      <Card>
        <CardContent>
          <span onClick={() => editTodo()}>
            <Edit style={styles.smallIcon} />
          </span>
          <span>
            <Close style={styles.smallIcon} />
          </span>
          <h3 style={styles.h3}>{todo?.title}</h3>
          <p>{subheader}</p>
          <p>{todo?.description}</p>
          <span>{deadline}</span>
        </CardContent>
      </Card>
    </>
  )
}

export default Todo
