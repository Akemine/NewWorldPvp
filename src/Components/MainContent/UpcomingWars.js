import '../../Styles/UpcomingWars.css'

import React, { Component } from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import axios from 'axios';

import { Link } from "react-router-dom";

class UpcomingWars extends Component {

  state = {
    wars: []
  }


  // FUNCTION
  thisGuildWon = (id) => {
    this.guildWon(id)
  }
  //////////////////

  // API
  async guildWon(id){  
    await fetch('http://localhost:5000/api/v1/guildWon', {
        method: "POST",
        body: JSON.stringify({
            "id_winner" : id,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) 
}

  // return les wars upcomings
  async getUpcomingWars() {
    await axios.get(`http://localhost:5000/api/v1/getUpcomingWars`)
      .then(res => {
        const wars = res.data;
        this.setState({ wars });
      })
  }
  ////////////////////////////////////////////


  // COMPONENT MOUNT & UPDATE
  componentDidMount() {
    this.getUpcomingWars()
  }

  componentDidUpdate(prevProps, prevState) {
    // CODE
  }
  //////////////////////////////////////////////////

  render() {
    if (this.props.Login === "Admin") {
      return (
        <div className="rightMenu-main">
          <p className="title">UPCOMING WARS - Admin</p>
          <div className="admin-center-capsule">
            {this.state.wars.map(function (war) {
              if (war.accepted) {
                return <div className="gvg-admin-capsule">
                  <div className="list-flexbox-leaderboard-gvg">
                    <div key={war.id}>
                    <Link to="/gvg" className="btn-accept" onClick={() => this.thisGuildWon(war.id)}><span style={{ color: '#04AA6D' }}>{war.guild_proposeur} <span style={{color: '#ffb10f'}}>WINNERS</span></span></Link>
                      <br/>
                      <span style={{ color: 'white' }}> OR  </span>
                      <br/>
                      <Link to="/gvg" className="btn-accept" onClick={() => this.thisGuildWon(war.id)}><span style={{ color: 'crimson' }}>{war.guild_attaquer} <span style={{color: '#ffb10f'}}>WINNERS</span></span></Link>
                      <hr/>
                      <div style={{ color: 'wheat' }}><span style={{ color: 'wheat' }}>{war.heure}</span> | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                    </div>
                  </div>
                </div>
              }
            })
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="rightMenu-main">
          <p className="title">UPCOMING WARS</p>
          {this.state.wars.map(function (war) {
            if (war.accepted) {
              return <div key={war.id}>
                <span className="guild_win">{war.guild_proposeur}</span>
                <span className="span-white"> Vs </span>
                <span className="guild_loose">{war.guild_attaquer}</span>
                <br />
                <span className="span-white">{war.heure} | {war.date_war}
                  <br /> {war.nombrejoueurs} Players </span>
                <hr />
              </div>
            }
          })
          }
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
      dispatch({ type: "USER_CONNECTED", ConnectState: true })
    },

    Unlogged: isConnected => {
      dispatch({ type: "USER_DISCONNECTED", ConnectState: false })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpcomingWars));

