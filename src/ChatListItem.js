import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

class ChatListItem extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);   
    }

    render(){
      const background = this.props.background;
      if (this.props.source === 'bot'){
        return (               
            <ListItem alignItems="flex-start" style={{width:"70%"}}> 
            <ListItemAvatar>
                    <Avatar alt="B"  src='/bot/res/mipmap-xxhdpi/ic_launcher.png' />
                </ListItemAvatar>          
                <ListItemText style={{background:background, paddingLeft:"10px", paddingRight:"20px", textAlign:'left' ,float:'left'}}
                primary={this.props.primaryText}
                secondary={
                    <React.Fragment>                
                    {this.props.secondaryText}
                    </React.Fragment>}
                />
                 
            </ListItem>  
            )
        }
      else{
        return (               
          <ListItem alignItems="flex-start"   style={{marginLeft:"30%", width:"70%"}} >             
              <ListItemText style={{background:background, paddingLeft:"20px", paddingRight:"10px", textAlign:'right', float:'right'}}
              primary={this.props.primaryText}
              secondary={
                  <React.Fragment>                
                  {this.props.secondaryText}
                  </React.Fragment>
              }/>
               <ListItemAvatar>
                  <Avatar alt="U"  src="/user/res/mipmap-xxhdpi/ic_launcher.png" />
              </ListItemAvatar>
          </ListItem>  
          )
      }
      }
}

export default ChatListItem;