import '../Styles/Login.css'

import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import React, { Component } from 'react';
import MainContent from './MainContent/MainContent'

let login = ""
let password = ""

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isConnected: false, login: '', password: '', badConnection: false};
    
        this.handlePseudo = this.handlePseudo.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      changeBgColor(){
        this.setState({
          backgroundColor: 'white'
        })
      }

      handlePseudo(event) {
        this.setState({login: event.target.value});
      }

      handlePassword(event) {
        this.setState({password: event.target.value});
      }

      
    
      handleSubmit = (event) => {
          fetch('http://localhost:5000/api/v1/CheckLogin', {
          method: "POST",
          body: JSON.stringify({
            "login" : this.state.login,
            "password": this.state.password
          }),
          headers: {
            "Content-Type": "application/json"
        }
        })
        .then(response => response.json())
        .then(response => {
          if(response){
            login = this.state.login
            password = this.state.password
            this.props.Logged()
          }
          else{
            this.setState({badConnection: true, backgroundColor: 'crimson'})
          }
        })
        event.preventDefault();
      }

      componentDidUpdate(prevProps, prevState){
        if (prevProps.Login !== this.props.Login)
        {        
          this.props.history.push('/leaderboard');
        }
      }

    render() {
      if (this.props.ConnectState){
        return <MainContent />
      }
      else if (this.state.badConnection){
        return (
          <div>
              <form className="form-display">
              <h1 className="title-form">Join the war</h1><hr className="hr-form"/>
              
              <label className="label-name label">Guild name :</label>
                  <input style={{backgroundColor: this.state.backgroundColor}} placeholder="Type your Guild Name" className="input-css-error" type="text" value={this.state.value} onChange={this.handlePseudo} onFocus={ () => this.changeBgColor() } />
                  <br/>
                  <label className="label label-password" >Password :</label>
                  <input style={{backgroundColor: this.state.backgroundColor}} placeholder="Type your password" className="input-css-error" type="password" value={this.state.value} onChange={this.handlePassword} onFocus={ () => this.changeBgColor() } />
                  <br/>
                  <input className="btn-submit" type="submit" value="Connection to my guild" onClick={this.handleSubmit}/>
              </form>
        </div>
          )
      }
      else if(!this.props.ConnectState){
        return (
        <div>
            <form className="form-display">
            <h1 className="title-form">Join the war</h1><hr className="hr-form"/>
            
            <label className="label-name label">Guild name :</label>
                <input placeholder="Type your Guild Name" className="input-css" type="text" value={this.state.value} onChange={this.handlePseudo} />
                <br/>
                <label className="label label-password" >Password :</label>
                <input placeholder="Type your password" className="input-css" type="password" value={this.state.value} onChange={this.handlePassword} />
                <br/>
                <input className="btn-submit" type="submit" value="Connection to my guild" onClick={this.handleSubmit}/>
            </form>
      </div>
        )
      }
      }
}

const mapStateToProps = state => {
  return {
    ConnectState: state.ConnectState,
    Login: state.Login,
    Password: state.password
  }
}

const mapDispatchToProps = dispatch => {
return {
  Logged: isConnected => {
    dispatch({type: "USER_CONNECTED", ConnectState: true, Login: login, Password: password})
   },

  Unlogged: isConnected => {
    dispatch({type: "USER_DISCONNECTED", ConnectState: false})
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
