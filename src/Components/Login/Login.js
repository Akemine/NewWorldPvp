import '../../Styles/Login/Login.css'

import React from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

let login = ""
let password = ""
let faction = ""
let role = ""
let banned = ""

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isConnected: false, login: '', password: '', badConnection: false, faction: '', role: ''};
    
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
          fetch('http://54.37.74.45:5000/api/v1/CheckLogin', {
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
            fetch('http://54.37.74.45:5000/api/v1/getAccountData', {
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
                faction = response[0].faction
                role = response[0].role
                banned = response[0].banned
                this.props.Logged()
              }
              else{
                this.setState({badConnection: true, backgroundColor: 'crimson'})
              }
            })
          }
          else{
            this.setState({badConnection: true, backgroundColor: 'crimson'})
          }
        })
        event.preventDefault();
      }

      componentDidMount(){
      }

    render() {
      if (this.props.ConnectState){
        if(this.props.Banned){
          return <Redirect to="/banned"/>
        } else {
          return <Redirect to="/leaderboard"/>
        }
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
                  <input className="btn-submit" type="submit" value="Connection to my guild" onClick={this.handleSubmit} style={{marginBottom: '0%'}}/>
                  <Link to="createaccount" className="btn-no-deco create-account-link">I want to create my guild !</Link>
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
                <input className="btn-submit" type="submit" value="Connect me to my guild !" onClick={this.handleSubmit} style={{marginBottom: '0%'}} />
                <Link to="createaccount" className="btn-no-deco create-account-link">I want to create my guild !</Link>
            </form>
            
      </div>
        )
      }
      }
}

const mapStateToProps = state => {
  return {
    ConnectState: state.loginReducer.ConnectState,
    Login: state.loginReducer.Login,   
    Password: state.loginReducer.Password,
    Faction: state.loginReducer.Faction,
    Role: state.loginReducer.Role,
    Banned: state.loginReducer.Banned
  }
}

const mapDispatchToProps = dispatch => {
return {
  Logged: isConnected => {
    dispatch({type: "USER_CONNECTED", ConnectState: true, Login: login, Faction: faction, Password: password, Role: role, Banned: banned})
   },

  Unlogged: isConnected => {
    dispatch({type: "USER_DISCONNECTED", ConnectState: false})
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
