

import axios from 'axios';

import '../Styles/test.css'

import React, { Component } from 'react';


export default class Test extends Component {

    state = {
        guilds: []
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/api/v1/getGuild`)
          .then(res => {
            const guilds = res.data;
            this.setState({ guilds });
          })
      }
      
      render() {
        return (
            <ul>
                <p>Guilde test</p>
                 {this.state.guilds.map(guild => <li>{guild.nom} - {guild.server}</li>)} 
            </ul>
        )
      }

}

