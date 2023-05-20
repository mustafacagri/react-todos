import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// DEV ONLY!!!
const pause = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const todosApi = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3015',
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(0)

      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      addTodo: builder.mutation({
        invalidatesTags: (result, error, todo) => {
          let tags = []

          if (todo.parent === 0) {
            console.warn('parennttttt!!!!!!')
            tags.push({ type: 'Todos' })
          } else {
            tags.push({ type: 'Todo', id: todo.parent })
          }

          console.warn(tags, 'tags')
          return tags
        },
        query: todo => {
          const { title, deadline, status, priority, description } = todo
          const now = new Date()
          const createdTime = now.getTime()
          let { parent = 0 } = todo

          return {
            url: '/todos',
            method: 'POST',
            body: { title, deadline, status, parent, createdTime, priority, description }
          }
        }
      }),
      updateTodo: builder.mutation({
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
          const { title, deadline, status, priority, description, id, parent } = todo

          console.warn({ id, title, deadline, status, priority, description, parent }, 'datalaaar')

          return {
            url: `/todos/${id}`,
            method: 'PUT',
            body: { id, title, deadline, status, priority, description, parent }
          }
        }
      }),
      removeTodo: builder.mutation({}),
      fetchTodos: builder.query({
        providesTags: (result, error, todo) => {
          return [{ type: 'Todos' }]
          // return [{ type: 'Todos' }, { type: 'Todo', id: todo.id }]
        },
        query: () => {
          return {
            url: '/todos',
            params: {},
            method: 'GET'
          }
        }
      })
    }
  }
})

export const { useFetchTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } = todosApi

export { todosApi }
