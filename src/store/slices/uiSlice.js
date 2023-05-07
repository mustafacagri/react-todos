import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    }
  }
})

export const { getPrioritiesById, openTodoModal, closeTodoModal } = uiSlice.actions

export default uiSlice.reducer
