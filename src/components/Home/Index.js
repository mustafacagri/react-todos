import TodoForm from './TodoForm'
import { useFetchTodosQuery } from '../../store/apis/todosApi'
import { Box, Grid, Skeleton } from '@mui/material'
import Todo from '../Todo'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'

export default function Home() {
  let content
  const todoFilter = useSelector(state => state.ui.todoFilter)
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    }
  }))

  const sortedTodos = () => {
    let filteredTodos = [...data]

    if (todoFilter?.status) {
      filteredTodos = data.filter(item => item.status === todoFilter.status)
    }

    const newData = [...filteredTodos]

    return newData.sort((a, b) => b.id - a.id)
  }

  const classes = useStyles()
  const { data, error, isLoading } = useFetchTodosQuery()

	const noTodosFound = <Box sx={{mt: 3}}>There is no todo yet, do you want to create one?</Box>

  if (isLoading) {
    content = (
      <Box sx={{ width: 30 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    )
  } else if (error) {
    content = <div>Error loading todos.</div>
  } else {
    content = (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
					{sortedTodos().length === 0 && noTodosFound}
          {sortedTodos().map(todo => (
            <Grid item xs={12} sm={6} md={3} key={todo.id}>
              <Todo todo={todo} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  return (
    <Box align="center" sx={{ my: 2, width: '20' }}>
      {content}
      <TodoForm />
    </Box>
  )
}
