import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

class ChatListItem extends Component {

    constructor(props){
        super(props);   
    }

    render(){
        return (               
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={this.props.alt}  src={this.props.avatarImage} />
                </ListItemAvatar>
                <ListItemText
                primary={this.props.primaryText}
                secondary={
                    <React.Fragment>                
                    {this.props.secondaryText}
                    </React.Fragment>
                }
                />
            </ListItem>  
            )
        }
}

export default ChatListItem;