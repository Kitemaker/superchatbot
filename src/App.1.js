import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import SuperChatBot from './SuperChatBot';
import Dashboard from './Dashboard';

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
      this.accessKeyId = process.env.accessKeyId;
      this.secretAccessKey = process.env.accessKeyId;
     
     
    }

  render() {
    console.log('Creating Chat Bot');
    return (
      <div className="App">      
        <Dashboard/>      
      </div>  


    );
  }
}

export default App;