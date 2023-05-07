import { useState } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home'
import TopicIcon from '@mui/icons-material/Topic'
import TaskIcon from '@mui/icons-material/Task'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import { useDispatch } from 'react-redux'
import { openTodoModal } from '../../store/slices/uiSlice'

function Header() {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)

  return (
    <Box >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
				sx={{backgroundColor: "#E7EBF0"}}
      >
        <BottomNavigationAction label="All Todos" icon={<HomeIcon />} />
        <BottomNavigationAction label="Open To-Dos" icon={<TopicIcon />} />
        <BottomNavigationAction label="Completed" icon={<TaskIcon />} />
        <BottomNavigationAction
          label="Create New Todo"
          icon={<ControlPointIcon />}
          onClick={() => dispatch(openTodoModal())}
        />
      </BottomNavigation>
    </Box>
  )
}

export default Header
