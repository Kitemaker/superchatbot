import React, { Component } from 'react'
//import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from './constants'
import './SignedIn.css'
import Dashboard from './Dashboard'

class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      //me: {},
      savingMe: false,
      savingKingdown: false,
     // redirectToMe: false
    }

    // this.loadMe = this.loadMe.bind(this)
    // this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
  //  this.loadMe()
  }

  // loadMe() {
  //   const options = { decrypt: false }
  //   this.userSession.getFile(ME_FILENAME, options)
  //   .then((content) => {
  //     if(content) {
  //       const me = JSON.parse(content)
  //       this.setState({me, redirectToMe: false})
  //     } else {
  //       const me = null

  //       this.setState({me, redirectToMe: true})
  //     }
  //   })
  // }

  // saveMe(me) {
  //   this.setState({me, savingMe: true})
  //   const options = { encrypt: false }
  //   this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
  //   .finally(() => {
  //     this.setState({savingMe: false})
  //   })
  // }

  signOut(e) {
    console.log('message from signOut');
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username
    //const me = this.state.me
    //const redirectToMe = this.state.redirectToMe



    return (
      <div className="SignedIn">
       <Dashboard username={username} signOut={this.signOut}></Dashboard>    
     
      </div>
    );
  }
}

export default SignedIn
