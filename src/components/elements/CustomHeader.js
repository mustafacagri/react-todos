import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Link, useNavigate } from 'react-router-dom'

function CustomHeader() {
  const navigate = useNavigate()
  const menuItems = [
    { icon: 'Topic', to: '/', label: 'All Todos' },
    { icon: 'Info', to: '/about', label: 'About' }
  ]

  return (
    <Box>
      <BottomNavigation showLabels sx={{ backgroundColor: '#E7EBF0' }}>
        {menuItems.map(item => (
          <BottomNavigationAction key={item.to} onClick={() => navigate(item.to)} label={item.label} />
        ))}
      </BottomNavigation>
    </Box>
  )
}

export default CustomHeader
