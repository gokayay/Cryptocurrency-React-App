import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

export default function CryptoDetail (props) {

    const onTrigger = (event) => {
        console.log(props);
        props.parentCallback(true);
        event.preventDefault();
    }

    const classes = useStyles();
      return <div><AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onTrigger} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            {props.selectedCoin}
        </Typography>
      </Toolbar>
    </AppBar>
    <List>
      <ListItem button>
        <ListItemText primary="Phone ringtone" secondary="Titania" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
      </ListItem>
    </List></div>;
    }
  