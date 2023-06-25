import { useState } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Close, ControlPoint, Home, Info, Pending, Task, Topic } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { openTodoModal, setStatusFilter } from '../../store/slices/uiSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{ backgroundColor: '#E7EBF0' }}
      >
        <BottomNavigationAction label="All Todos" icon={<Home />} onClick={() => dispatch(setStatusFilter(null))} />
        <BottomNavigationAction
          label="Open To-Dos"
          icon={<Topic />}
          onClick={() => dispatch(setStatusFilter('Open'))}
        />
        <BottomNavigationAction
          label="In Progress To-Dos"
          icon={<Pending />}
          onClick={() => dispatch(setStatusFilter('In Progress'))}
        />
        <BottomNavigationAction
          label="Closed To-Dos"
          icon={<Close />}
          onClick={() => dispatch(setStatusFilter('Closed'))}
        />
        <BottomNavigationAction
          label="Completed"
          icon={<Task />}
          onClick={() => dispatch(setStatusFilter('Completed'))}
        />
        <BottomNavigationAction
          label="Create New Todo"
          icon={<ControlPoint />}
          onClick={() => dispatch(openTodoModal())}
        />
        <BottomNavigationAction onClick={() => navigate('/about')} label="About" icon={<Info />} />
      </BottomNavigation>
    </Box>
  )
}

export default Header
