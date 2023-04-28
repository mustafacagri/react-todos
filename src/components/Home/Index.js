import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { MenuItem } from '@mui/material/'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSelector, useDispatch } from 'react-redux'
import { closeTodoModal } from '../../store/slices/uiSlice'
import dayjs from 'dayjs'

import { useState } from 'react'

export default function BasicModal() {
  const dispatch = useDispatch()

  const handleClose = () => dispatch(closeTodoModal())

  const isTodoModal = useSelector(state => state.ui.isTodoModal)
  const statuses = useSelector(state => state.ui.statuses)
  const priorities = useSelector(state => state.ui.priorities)
  let formResult = {}

  const [todoData, setTodoData] = useState({
    title: '',
    priority: '',
    status: '',
    description: '',
    deadline: ''
  })

  const handleChange = event => {
    console.info(event.target.name, event.target.value, 'event')
    // console.warn(event.target)
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

      if (!value) {
        console.warn(value, key)
        formResult = { message: `${key} can not be empty`, isSuccess: false, notValidatedKey: key }
        break
      }
    }

    console.info(todoData)
  }

  return (
    <div>
      <Dialog open={isTodoModal} onClose={handleClose}>
        <DialogTitle>Create / Update Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "To create a new todo, simply fill out the form below with the details of your task. We've included fields
            for the task title, due date, priority level, and any additional notes you may want to add. Once you've
            entered all the necessary information, click the submit button to add your new todo to your list. It's that
            easy!" ChatGPT
            {!formResult.isSuccess && <span>formResult.message: {formResult.message}</span>}
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
          <Button color="success" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
