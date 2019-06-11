import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatListItem from './ChatListItem';
import zIndex from '@material-ui/core/styles/zIndex';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    height: 300,
    overflowY: 'auto',
    scrollMarginTop:300
  },
  inline: {
    display: 'inline',
  },
}));

function ChatList (props){  
 
  let classes = useStyles();
    return (
        <div>
           <List id="chatList" className={classes.root}  >
          {props.chatMessages.map((message, index) => {

            return <ChatListItem 
                    primaryText = {message.source} 
                    secondaryText={message.message}
                    key = {index}
                    click={() => this.deleteMessageHandler(index)}                  
                    />
          })}
        </List>
        </div>        
      
    );
}


export default ChatList;