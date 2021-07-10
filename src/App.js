import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import State from './components/State'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import Layout from './components/Layout'
import Pincode from './components/Pincode'
import Home from './components/Home'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: red
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/state">
              <State />
            </Route>
            <Route path="/pincode">
              <Pincode />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
