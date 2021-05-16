import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import Home from './components/Home';
import About from './components/About';
import CryptoList from './components/CryptoList';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {Switch as Toggle} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";

 


const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };


  return (
  <ThemeProvider theme={darkTheme}>
    <div>
    <CssBaseline />
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/list" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary={"List"} />
              </ListItem>
            </Link>
            <Link to="/about" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItem>
            </Link>
          </List>
          <br></br>
          <br></br>
          <div style={{'margin-left': '1rem'}}>
            Change Theme
          <Toggle checked={darkState} onChange={handleThemeChange} />
          </div>
        </Drawer>
        <Switch>
          <Route exact path="/">
            <Container>
              <Home></Home>
            </Container>
          </Route>
          <Route exact path="/list">
            <Container>
             <CryptoList name="List"></CryptoList>
            </Container>
          </Route>
          <Route exact path="/about">
            <Container>
             <About></About>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  </ThemeProvider> 
  );
}

export default App;