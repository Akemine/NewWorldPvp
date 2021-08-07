import '../../Styles/ServerChoice.css'

import React, { Component } from 'react';

import axios from 'axios';


export default class ServerChoice extends Component {
    

    state = {
        servers: []
    }


    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/getServerList`)
          .then(res => {
            const servers = res.data;
            this.setState({ servers });
          })
      }

      render() {
        return (
            <div>
                <select className="server-select">
                    <option key="all" className="server-option" value="all"> All Servers (Default)</option>
                    {this.state.servers.map(server => <option key={server.id} className="server-option" value={server.server}>{server.server}</option>)} 
                </select>
            </div>
        )
      }
    }