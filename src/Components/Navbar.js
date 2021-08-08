import '../Styles/Navbar.css'

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import logo from '../asset/newworldwhite.png'


import { Link } from "react-router-dom";

const leaderboard = "LEADERBOARD"
const gvg = "GUILD VS GUILD"
const hiw = "HOW IT WORKS ?"

class Navbar extends React.Component {


    DisconnectClick = () => {
        this.props.Unlogged()
        console.log(this.props.ConnectState)
      }

    render() {
        if(!this.props.ConnectState){
        return (
        <div className="header">
            <div className="logo"><img src={logo} alt="Logo"/></div>
            <div className="nav-menu">
                <div><Link to="/leaderboard" className="leaderboard btnNavbar">{leaderboard}</Link></div>
                <div><Link to="/howitworks" className="howitworks btnNavbar">{hiw}</Link></div>
            </div>
            <div className="nav-menu-connection">
                <Link to="/login" className="connection btnNavbar" onClick={this.DisconnectClick}>Log in as a guild</Link>
            </div>
        </div>
        )
      }  
      else{
        return (
            <div className="header">
                <div className="logo"><img src={logo} alt="Logo"/></div>
                <div className="nav-menu">
                    <div><Link to="/leaderboard" className="leaderboard btnNavbar">{leaderboard}</Link></div>
                    <div><Link to="/gvg" className="gvg btnNavbar">{gvg}</Link></div>
                    <div><Link to="/howitworks" className="howitworks btnNavbar">{hiw}</Link></div>
                </div>
                <div className="nav-menu-connection">
                    <span className="connection">You are connected as <br/><span className="color-guild-name">{this.props.Login}</span><br/><Link to="/login" onClick={this.DisconnectClick} className="btnNavbar disconnect-button">Disconnect</Link></span>
                </div>
            </div>
            )
      }
    }
}

const mapStateToProps = state => {
    return {
      ConnectState: state.ConnectState,
      Login: state.Login
    }
  }
  
   const mapDispatchToProps = dispatch => {
     return {
      Logged: isConnected => {
        dispatch({type: "USER_CONNECTED", ConnectState: true})
       },
  
      Unlogged: isConnected => {
        dispatch({type: "USER_DISCONNECTED", ConnectState: false})
      }
     }
   }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));