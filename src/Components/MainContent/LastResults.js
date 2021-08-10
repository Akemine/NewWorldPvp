import '../../Styles/LastResults.css'

import React, { Component } from 'react';

import axios from 'axios';

export default class LastWars extends Component {

  state = {
    last_wars: []
  }

  async getLastWars() {
    await axios.get(`http://localhost:5000/api/v1/getLastWars`)
      .then(res => {
        const last_wars = res.data;
        this.setState({ last_wars });
      })
  }

  componentDidMount() {
    this.getLastWars()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.last_wars !== this.state.last_wars) {
      // this.getLastWars() // SE SPAM A FOND, VOIR POURQUOI
    }
  }

  render() {
    return (
      <div className="leftMenu-main">
        <p className="title">LAST 10 RESULTS</p>
        <div className="last_wars_container">
          {this.state.last_wars.map(last_war =>
            <div className="last_wars_capsule card-last-results" key={last_war.id}>
              <div className="container">
                <div className="display-column">
                  <span style={{color: 'white'}} className="bold-txt">WAR ID : {last_war.id} - {last_war.date}</span>
                  <div className="display-row display-result">
                    <span className="guild_win display-fake-btn winner">{last_war.win_guild} Wins (+{last_war.win_cote})</span>
                    <span className="span-white display-fake-btn text" style={{fontSize: '18px'}}> AGAINST </span>
                    <span className="guild_loose display-fake-btn looser">{last_war.loose_guild } ({last_war.loose_cote})</span>
                  </div>
                  <span className="bold-txt span-white">Team Size {last_war.nombrejoueurs}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }

}