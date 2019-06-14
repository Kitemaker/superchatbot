import React, {Component} from 'react';
import './SuperChatBot.css';
import ChatList from './ChatList';

import Amplify, { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
let AWS = require('aws-sdk');


class SuperChatBot extends Component{
constructor(props){
    super(props);   
   
    // Initialize the Amazon Cognito credentials provider
    //LexSuperChatBot
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:f0b611e0-5097-406d-8d29-e69ee7716db4',
    });
    this.lexruntime = new AWS.LexRuntime();

   
     
}
sessionAttributes = {};
textToPush = null;
state={
    chatMessages:[{source:this.props.title ,message:this.props.welcomeMessage}]
}


handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }


  updateChatList =(msg) =>{
    const messageList = [...this.state.chatMessages];
    messageList.push(msg);
    this.setState({
        chatMessages: messageList
    }
    );
    let list = document.getElementById('chatList');
    list.scrollTop =list.scrollHeight;
  }

  responseCallback=(err,data) =>{
    if (err) {
      console.log(err, err.stack); // an error occurred
      this.updateChatList({source:'bot',message: 'Sorry! There is some error in getting the request. Please try again.'});
    }
    if(data)
    {
      console.log(this.state.chatMessages);           // successful response
      this.sessionAttributes = data.sessionAttributes;
      this.updateChatList({source:'bot',message: data.message}); 
        
    }
    this.textToPush.value = '';
    this.textToPush.locked = false;   
    this.textToPush.focus();
  }

  pushChat =()=>{
    // if there is text to be sent...
			this.textToPush = document.getElementById('userInputBox');
			if (this.textToPush && this.textToPush.value && this.textToPush.value.trim().length > 0) {

				// disable input to show we're sending it
				let pushText = this.textToPush.value.trim();
				this.textToPush.value = '...';
        this.textToPush.locked = true;
        let lexUserId = 'SuperChatBot';
        var params = {
          botAlias: this.props.botAlias, /* required */
          botName: this.props.botName, /* required */
          inputText: pushText, /* required */
          userId: lexUserId, /* required */
          sessionAttributes: this.sessionAttributes

        };
        this.updateChatList({source:this.props.userName,message: params.inputText});
        this.lexruntime.postText(params, (err,data)=>this.responseCallback(err,data));
  
    }
        
} 


textUpdated=(event)=>{ 
 // this.textToPush.value = event.target.value;
console.log(event.target.value);
}
  

render() {
    const { title, theme, botName, welcomeMessage} = this.props;
    return (
       <div>
          <Container  style={{width: "50%",  padding:"10px", background:"lightBlue"}}>  
          <div class="w3-cell-row">         
             <ChatList  botTitle={this.props.title} userName={this.props.userName} style={{ marginTop:"10px"}} chatMessages={this.state.chatMessages}/>
          </div>
          <div class="w3-cell-row"> 

            <div className="w3-container  w3-cell"  style={{width: "100%"}}>        
                <input type="text" id="userInputBox"  style={{width: "100%", height:"100%",  marginTop:"20px",  marginBottom:"10px"}}
                                                              onChange={(event)=>this.textUpdated(event)}
                                                              placeholder={this.props.placeholder}/>
            </div>
            
            <div className="w3-container  w3-cell" >  
              <button class="w3-btn  w3-large" onClick={this.pushChat} style={{ background:"lightGreen", marginTop:"10px"}}>Send
                <i class="w3-margin-left material-icons">send</i>
              </button>
            </div>
          
          </div>
          </Container> 
       </div>

    );
 
}
}

SuperChatBot.defaultProps = {
    title: '',
    botName: '',
    onComplete: undefined,
    clearOnComplete: false,
    accessKeyId:"",
    secretAccessKey :"",
    region:""
};



export default SuperChatBot;
