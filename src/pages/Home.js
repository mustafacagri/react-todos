import Header from '../components/elements/Header'
import Footer from '../components/elements/Footer'
import Home from '../components/Home/Index'
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fafafa"
    }
  }
});


function home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#fafafa" }
        }}
      />
      <Header />
      <Home sx={{width: 300}} />
      <Footer />
    </ThemeProvider>
      
  )
}

export default home
