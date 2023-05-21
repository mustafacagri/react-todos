import './assets/styles/App.css'
import AllRoutes from './routes'
import CustomHeader from './components/elements/CustomHeader'
import Header from './components/elements/Header'
import Footer from './components/elements/Footer'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const { pathname } = location

  return (
    <>
      {pathname === '/' ? <Header /> : <CustomHeader />}
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
