import '../../Styles/UpcomingWars.css'

import React, { Component } from 'react';

import axios from 'axios';

export default class UpcomingWars extends Component {

    state = {
        guilds: []
    }

    async getUpcomingWars(){
      await axios.get(`http://localhost:5000/api/v1/getUpcomingWars`)
          .then(res => {
            const guilds = res.data;
            this.setState({ guilds });
          })
    }

    componentDidMount() {
      this.getUpcomingWars()
    }

    componentDidUpdate(prevProps, prevState){
      if (prevState.guilds !== this.state.guilds)
      {        
        // this.getUpcomingWars() // SE SPAM A FOND, VOIR POURQUOI
      }
    }

    render() {
        return (
            <div className="rightMenu-main">
                <p className="title">Upcoming Wars</p>
                {this.state.guilds.map(function(guild) {
                  if (guild.accepted) {
                    return <div key={guild.id}>
                    <span className="win_guild">{guild.guild_proposeur}</span>
                    <span className="span-white"> Vs </span>
                    <span className="loose_guild">{guild.guild_attaquer}</span>
                    <br/>
                    <span className="span-white">{guild.heure} | {guild.date_war} 
                    <br/> {guild.nombrejoueurs} Players </span>
                    <hr/>
                  </div>
                  }                
                  })
                }
            </div>
    )}
}
        