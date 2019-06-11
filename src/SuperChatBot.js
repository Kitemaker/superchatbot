import React, {Component} from 'react';
import './SuperChatBot.css';
import ChatList from './ChatList';

import Amplify, { Auth } from 'aws-amplify';
let AWS = require('aws-sdk');


class SuperChatBot extends Component{
constructor(props){
    super(props);   
    console.log('process.env.accessKeyId', process.props.accessKeyId);
    console.log('process.env.secretAccessKey', process.props.secretAccessKey);
    // this.lexruntime = new AWS.LexRuntime({accessKeyId:process.env.accessKeyId,
    //                                         secretAccessKey :process.env.secretAccessKey,
    //                                         region:this.props.region});
    this.lexruntime = new AWS.LexRuntime({accessKeyId:this.props.accessKeyId ,
                                                secretAccessKey :this.props.secretAccessKey,
                                                region:this.props.region});
    const currentConfig = Auth.configure();
    //this.lexruntime = new AWS.LexRuntime();
     console.log('region = ', this.lexruntime.credentials); 
     
}

state={
    chatMessages:[{source:"bot",message:"Hello"}, {source:"user",message:"Good Morning"}]
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
    if (err) console.log(err, err.stack); // an error occurred
    else
    {
      console.log(this.state.chatMessages);           // successful response
      this.updateChatList({source:"bot",message: data.message});
     
    } 
  }

buttonClickHandler =()=>{
    const currentConfig = Auth.configure();
    console.log(this.lexruntime.config.credentials);
    console.log(this.state.chatMessages);
    var params = {
      botAlias: 'prod', /* required */
      botName: 'TableTrick', /* required */
      inputText: 'start', /* required */
      userId: 'sj112233', /* required */
      requestAttributes: {},     sessionAttributes: {   }
    };
    this.updateChatList({source:"user",message: params.inputText});
    this.lexruntime.postText(params, (err,data)=>this.responseCallback(err,data));
    //let list = document.getElementById('chatList');
  
        
        
      } 
   
  
  

render() {
    const { title, theme, onComplete } = this.props;
    return (
       <div>           
             <ChatList  botName="TableTrick" userName="SJ112233" chatMessages={this.state.chatMessages}/>
             <button onClick={this.buttonClickHandler}>Click Me</button>
           
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
