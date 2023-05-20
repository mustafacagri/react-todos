import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  initialTodoState: { parent: 0, title: '', priority: '', status: '', description: '', deadline: '' },
  todo: null,
  todoFilter: { status: null },
  isTodoModal: false,
  statuses: ['Open', 'In Progress', 'Completed', 'Closed'],
  priorities: { 5: 'Highest', 4: 'Higher', 3: 'Normal', 2: 'Lower', 1: 'Lowest' }
}
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openTodoModal: state => {
      state.isTodoModal = true
    },
    closeTodoModal: state => {
      state.isTodoModal = false
    },
    setTodo: (state, action) => {
      // console.log(action.payload, 'action')
      state.todo = { ...action.payload }

      console.info(state.todo, 'state.todo')
    },
    setStatusFilter: (state, action) => {
      state.todoFilter.status = action.payload
    }
  }
})

export const { getPrioritiesById, openTodoModal, closeTodoModal, setStatusFilter, setTodo } = uiSlice.actions

export default uiSlice.reducer
