import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import SuperChatBot from './SuperChatBot';

let AWS = require('aws-sdk');

Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

class App extends Component {

  constructor(){  
      super() 
     
    }

  render() {
    console.log('Creating Chat Bot');
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ChatBot Demo</h1>
        
          <SuperChatBot
            title="My Bot"
            theme={myTheme}            
            botName="TableTrick"
            welcomeMessage="Welcome, how can I help you today?"
            accessKeyId = {process.env.accessKeyId}
            secretAccessKey ={process.env.secretAccessKey}
            region ="us-east-1"    
          />        

        </header>  
      
      </div>
    );
  }
}

export default App;