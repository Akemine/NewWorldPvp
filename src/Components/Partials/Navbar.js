import '../../Styles/Partials/Navbar.css'

import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import logo from '../../asset/WIP.png'

import { Link } from "react-router-dom";

const leaderboard = "LEADERBOARD"
const gvg = "GUILD VS GUILD"
const hiw = "HOW IT WORKS ?"
const adminway = "ADMIN OVERVIEW"
const historiquegvg = "MY GUILD"


const width_logo = '110px'
const marginLeft_logo = '30%'
const marginTop_logo = '20%'
class Navbar extends React.Component {

  DisconnectClick = () => {
    this.props.Unlogged()
  }

  displayAdminNavbar() {
    return <div className="header">
      <div className="logo"><img src={logo} alt="Logo" style={{ width: width_logo, marginLeft: marginLeft_logo, marginTop: marginTop_logo }} /></div>
      <div className="nav-menu">
        <div><Link to="/leaderboard" className="leaderboard btnNavbar">{leaderboard}</Link></div>
        <div><Link to="/overview" className="howitworks btnNavbar">{adminway}</Link></div>
      </div>
      <div className="nav-menu-connection">
        <span className="connection">You are connected as
          <br />
          <span className="color-guild-name"> {this.props.Login}</span>
          <br />
          You are :
          <span className="color-guild-name"> {this.props.Role}</span>
          <br />
          <Link to="/login" onClick={this.DisconnectClick} className="btnNavbar disconnect-button">Disconnect</Link>
        </span>
      </div>
    </div>
  }

  displayGuildNavbar() {
    return <div className="header">
      <div className="logo"><img src={logo} alt="Logo" style={{ width: width_logo, marginLeft: marginLeft_logo, marginTop: marginTop_logo }} /></div>
      <div className="nav-menu">
        <div><Link to="/leaderboard" className="leaderboard btnNavbar">{leaderboard}</Link></div>
        <div><Link to="/gvg" className="gvg btnNavbar">{gvg}</Link></div>
        <div><Link to="/stat" className="howitworks btnNavbar">{historiquegvg}</Link></div>
      </div>
      <div className="nav-menu-connection">
        <span className="connection">You are connected as
          <br />
          <span className="color-guild-name"> {this.props.Login}</span>
          <br />
          <Link to="/login" onClick={this.DisconnectClick} className="btnNavbar disconnect-button">Disconnect</Link>
        </span>
      </div>
    </div>
  }

  displayDisconnectedNavbar() {
    return <div className="header">
      <div className="logo"><img src={logo} alt="Logo" style={{ width: width_logo, marginLeft: marginLeft_logo, marginTop: marginTop_logo }} /></div>
      <div className="nav-menu">
        <div><Link to="/leaderboard" className="leaderboard btnNavbar">{leaderboard}</Link></div>
        <div><Link to="/howitworks" className="howitworks btnNavbar">{hiw}</Link></div>
      </div>
      <div className="nav-menu-connection">
        <Link to="/login" className="connection btnNavbar" onClick={this.DisconnectClick}>Log in as a guild</Link>
      </div>
    </div>
  }

  render() {
    if (!this.props.ConnectState) {
      return (this.displayDisconnectedNavbar()) // Si je ne suis pas connecté
    }
    else {
      if (this.props.Role === "admin") {
        return (this.displayAdminNavbar()) // Si je suis un ADMIN
      }
      else if (this.props.Role === "guild") {
        return (this.displayGuildNavbar()) // Si je suis une guilde connecté
      }

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
    Unlogged: isConnected => {
      dispatch({ type: "USER_DISCONNECTED", ConnectState: false })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));