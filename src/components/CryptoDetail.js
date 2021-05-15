import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
class CryptoDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          item: {}
        };
      }
    
      componentDidMount() {
        fetch(`https://api.coincap.io/v2/assets/${this.props.selectedCoin}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                item: result
              });
              console.log(this.state.item);
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

   onTrigger = (event) => {
        this.props.parentCallback(true);
        event.preventDefault();
    }

    render() {
        return <div><AppBar style={{position: 'relative'}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.onTrigger} aria-label="close">
            <CloseIcon />
            </IconButton>
            <Typography variant="h6" >
                {this.state?.item?.data?.name}
            </Typography>
        </Toolbar>
        </AppBar>
        <List>
        <ListItem>
            <ListItemText primary="Symbol" secondary={this.state?.item?.data?.symbol} />
        </ListItem>
        <Divider />
        <ListItem>
            <ListItemText primary="Usd Exchange Rate" secondary={this.state?.item?.data?.priceUsd}/>
        </ListItem>
        <Divider />
        <ListItem>
            <ListItemText primary="Change Percent at Last 24 Hours" secondary={this.state?.item?.data?.changePercent24Hr} />
        </ListItem>
        <Divider />
        <ListItem>
            <ListItemText primary="Supply" secondary={this.state?.item?.data?.supply}/>
        </ListItem>
        <Divider />
        <ListItem>
            <ListItemText primary="Max Supply" secondary={this.state?.item?.data?.maxSupply}/>
        </ListItem>
        <Divider />
        <ListItem >
            <ListItemText primary="Usd Market Cap" secondary={this.state?.item?.data?.marketCapUsd}/>
        </ListItem>
        <Divider />
        <ListItem button>
        <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
            <a href={this.state?.item?.data?.explorer}>
                <ListItemText primary="Explore More" secondary={this.state?.item?.data?.explorer}/>
            </a>
        </ListItem>
        </List></div>;
    }
}

export default CryptoDetail;
