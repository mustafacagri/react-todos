import TodoForm from './TodoForm'
import { useFetchTodosQuery } from '../../store/apis/todosApi'
import { Box, Grid, Skeleton } from '@mui/material'
import Todo from '../Todo'
import { makeStyles } from  '@mui/styles'
import { useEffect, useState } from 'react'

export default function Home() {
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

const sortedTodos = () => {
	const newData =  [...data]
	
	return newData.sort((a,b) => b.id - a.id)
}

	const classes = useStyles()
  const { data, error, isLoading } = useFetchTodosQuery()

  let content
  if (isLoading) {
    content = 
    <Box sx={{ width: 30 }}>
       	<Skeleton animation="wave" />
			<Skeleton animation="wave" />
			<Skeleton animation="wave" />
			</Box>
    
  } else if (error) {
    content = <div>Error loading todos.</div>
  } else {
    content = (
				<div className={classes.root}>
					<Grid container spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
						{sortedTodos().map(todo => 
						<Grid item xs={12} sm={6} md={3} key={todo.id}>
						 <Todo todo={todo}/>
						</Grid>
)}

					</Grid>
				</div>
    )
  }

  return (
    <Box align='center' sx={{ my: 2, width: '20' }} >
      {content}
      <TodoForm />
    </Box>
  )
}
