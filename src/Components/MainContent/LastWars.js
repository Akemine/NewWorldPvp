import '../../Styles/LastWars.css'

import React, { Component } from 'react';

import axios from 'axios';

export default class LastWars extends Component {

  state = {
    guilds: []
  }

  async getLastWars() {
    await axios.get(`http://localhost:5000/api/v1/getlastwars`)
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
    }
  }

  render() {
    return (
      <div className="leftMenu-main">
        <p className="title">Last Wars</p>
        <div className="last_wars_container">
          {this.state.guilds.map(guild => <div className="last_wars_capsule" key={guild.id}><span className="win_guild">{guild.win_guild} | Wins </span> <span className="span-white">Vs</span> <span className="loose_guild">{guild.loose_guild}<hr className="hr-lastWars" /></span></div>)}

        </div>

      </div>
    )
  }

}