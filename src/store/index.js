import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { todosApi } from './apis/todosApi'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [todosApi.reducerPath]: todosApi.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(todosApi.middleware)
  }
})

setupListeners(store.dispatch)

export { useFetchTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } from './apis/todosApi'
