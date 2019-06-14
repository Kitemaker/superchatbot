import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatListItem from './ChatListItem';
//import zIndex from '@material-ui/core/styles/zIndex';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,  
    overflowY: 'auto',   
    height:600,
    scrollMarginTop: 600
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
            let backg = message.source=== 'bot' ? 'lightGreen':'lightBlue';
            let primaryText = message.source ==='bot'? props.botTitle:props.userName
            return <ChatListItem 
                    source = {message.source}                 
                    primaryText = {primaryText} 
                    secondaryText={message.message}
                    key = {index}
                    background = {backg}
                   
                    click={() => this.deleteMessageHandler(index)}          
                    />
          })}
        </List>
        </div>        
      
    );
}


export default ChatList;