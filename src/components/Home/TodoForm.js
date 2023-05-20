import React, { useEffect } from 'react'
import Button from '../utils/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { MenuItem } from '@mui/material/'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { setTodo, closeTodoModal } from '../../store/slices/uiSlice'
import { useState } from 'react'
import { useAddTodoMutation, useUpdateTodoMutation } from '../../store/apis/todosApi'
import Alert from '@mui/material/Alert'

function TodoForm() {
  const initialTodoState = useSelector(state => state.ui.initialTodoState)
  const stateTodo = useSelector(state => state.ui.todo)
  const [addTodo, addResults] = useAddTodoMutation()
  const [updateTodo, updateResults] = useUpdateTodoMutation()
  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeTodoModal())

  const isTodoModal = useSelector(state => state.ui.isTodoModal)
  const statuses = useSelector(state => state.ui.statuses)
  const priorities = useSelector(state => state.ui.priorities)

  const [formResult, setFormResult] = useState({})

  const up = () => {
    return { ...stateTodo }
  }

  useEffect(() => {
    if (stateTodo) {
      const todo = { ...stateTodo }
      todo.deadline = dayjs(todo.deadline)
      setTodoData({ ...todo })
    }
  }, [stateTodo])

  const [todoData, setTodoData] = useState(stateTodo ? up() : { ...initialTodoState })

  const handleChange = event => {
    setTodoData({ ...todoData, [event.target.name]: event.target.value })
  }

  const handleChangeDatepicker = (date, name) => {
    setTodoData({ ...todoData, [name]: date })
  }

  const handleSave = () => {
    for (const [key, value] of Object.entries(todoData)) {
      if (value?.$d) {
        todoData[key] = value.$d.getTime()
      }

      console.warn(key, value, 48, !value)

      if (value === '') {
        console.info(value, key)
        setFormResult({ message: `${key} can not be empty`, isSuccess: false, notValidatedKey: key })
        break
      }

      setFormResult({ message: null, isSuccess: true, notValidatedKey: null })
      dispatch(setTodo(null))
    }

    if (todoData.title && todoData.deadline && todoData.status && todoData.priority && todoData.description) {
      if (todoData.id) {
        updateTodo(todoData).then(res => {
          if (res?.data) {
            setTodoData(initialTodoState) // clear the form
            dispatch(setTodo(null))
            handleClose()
          } else {
            console.info(res, 'res')
          }
        })
      } else {
        addTodo(todoData).then(res => {
          if (res?.data) {
            setTodoData(initialTodoState) // clear the form
            dispatch(setTodo(null))
            handleClose()
          } else {
            console.info(res, 'res')
          }
        })
      }
    }
  }

  return (
    <Dialog open={isTodoModal} onClose={handleClose}>
      <DialogTitle>Create / Update Todo</DialogTitle>
      <DialogContent>
        {formResult.isSuccess === false && (
          <Alert severity="error" sx={{ my: 2 }}>
            {formResult.message}
          </Alert>
        )}
        <DialogContentText>
          "To create a new todo, simply fill out the form below with the details of your task. We've included fields for
          the task title, due date, priority level, and any additional notes you may want to add. Once you've entered
          all the necessary information, click the submit button to add your new todo to your list. It's that easy!"
          ChatGPT
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          name="title"
          label="Title"
          type="text"
          value={todoData.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          fullWidth
          margin="normal"
          select
          label="Priorities"
          defaultValue=""
          name="priority"
          value={todoData.priority}
          onChange={handleChange}
        >
          {Object.keys(priorities)
            .reverse()
            .map(item => (
              <MenuItem key={item} value={item}>
                {priorities[item]}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          select
          label="Status"
          defaultValue=""
          name="status"
          value={todoData.status}
          onChange={handleChange}
        >
          {statuses.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="normal"
          label="Description"
          type="description"
          fullWidth
          multiline
          maxRows={4}
          name="description"
          value={todoData.description}
          onChange={handleChange}
        />

        <DatePicker
          sx={{ mt: 2 }}
          fullWidth
          label="Deadline"
          name="deadline"
          value={todoData.deadline}
          onChange={val => handleChangeDatepicker(val, 'deadline')}
          defaultValue={dayjs('')}
          renderInput={params => <TextField {...params} />}
          slotProps={{ textField: { fullWidth: true, name: 'deadline' } }}
        />

        {/* slotProps={{ textField: { fullWidth: true, name: 'deadline', helperText: null } }} */}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>

        <Button color="success" loading={addResults.isLoading || updateResults.isLoading} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TodoForm
