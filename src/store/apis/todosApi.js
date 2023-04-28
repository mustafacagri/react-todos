import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const todosApi = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3015'
  }),
  endpoints(builder) {
    return {
      addTodo: builder.mutation({
        invalidatesTags: (result, error, todo) => {
          let tags = []

          if (todo.parent === 0) {
            tags.push({ type: 'Todos' })
          } else {
            tags.push({ type: 'Todo', id: todo.parent })
          }
          return tags
        },
        query: todo => {
          const { title, duedate, status, priority, description } = todo
          const now = new Date()
          const createdTime = now.getTime()
          let { parent = 0 } = todo

          return {
            url: '/todos',
            method: 'POST',
            body: { title, duedate, status, parent, createdTime, priority, description }
          }
        }
      }),
      removeTodo: builder.mutation({}),
      fetchTodos: builder.query({
        provideTags: (result, error, todo) => {
          return [{ type: 'Todos' }, { type: 'Todo', id: todo.id }]
        }
      })
    }
  }
})

export const { useFetchTodosQuery, useAddTodoMutation, useRemoveTodoMutation } = todosApi

export { todosApi }
