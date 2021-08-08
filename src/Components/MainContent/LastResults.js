import '../../Styles/LastResults.css'

import React, { Component } from 'react';

import axios from 'axios';

export default class LastWars extends Component {

  state = {
    guilds: []
  }

  async getLastWars() {
    await axios.get(`http://localhost:5000/api/v1/getLastWars`)
      .then(res => {
        const guilds = res.data;
        this.setState({ guilds });
      })
  }

  componentDidMount() {
    this.getLastWars()

    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.guilds !== this.state.guilds) {
      // this.getLastWars() // SE SPAM A FOND, VOIR POURQUOI
      console.log(this.state.guilds)
    }
  }

  render() {
    return (
      <div className="leftMenu-main">
        <p className="title">LAST RESULTS</p>
        <div className="last_wars_container">
          {this.state.guilds.map(guild =>
            <div className="last_wars_capsule card-last-results" key={guild.id}>
              <div className="container">
                <span className="guild_win">(1){guild.win_guild} Wins (+105) </span>
                <br/>
                <span className="span-white"> against </span>
                <br/>
                <span className="guild_loose">(2){guild.loose_guild } (-85)</span>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }

}