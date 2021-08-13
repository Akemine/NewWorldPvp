import '../../Styles/Admin/Overview.css'

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


class Douane extends Component {

    state = {
        guilds: [],
    }

    async getAllGuild() {
        await axios.get('http://54.37.74.45:5000/api/v1/getAccount')
            .then(res => {
                const guilds = res.data;
                this.setState({ guilds });
            })
    }

    async setGuildActif(guildName, i) {
            this.state.guilds.splice(i, 1)
            this.setState({ guilds: this.state.guilds })
            await fetch('http://54.37.74.45:5000/api/v1/setGuildActif', {
                method: "POST",
                body: JSON.stringify({
                    "guildName": guildName,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
    }

    async refuseGuild(guildName, i) {
        this.state.guilds.splice(i, 1)
        this.setState({ guilds: this.state.guilds })
        await fetch('http://54.37.74.45:5000/api/v1/refuseGuild', {
            method: "POST",
            body: JSON.stringify({
                "guildName": guildName,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
}

    componentDidMount() {
        this.getAllGuild()
    }

    componentDidUpdate(prevState){
        if(prevState.guilds !== this.state.guilds){
            console.log(this.state.guilds)
        }
    }

    render() {
        if (this.props.Role === "admin") {
            return (
                <div className="overview-main" style={{ margin: '0 auto', width: '80%' }}>
                    <div style={{ width: '100%' }}>
                        <p className="title">DOUANE</p>
                        <div className="overview-main-content">
                            <div>
                                <div style={{ textAlign: 'left', overflowY: 'auto', height: '450px' }}>
                                    <table style={{ width: '100%', borderSpacing: '1.8em 0.4em' }}>
                                        <thead>
                                            <tr>
                                                <th className="table-header">GUILD</th>
                                                <th className="table-header">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.guilds.filter(guild => !guild.banned && !guild.actif).map(function (guildFiltered, i) {
                                                return <tr>
                                                    <td className="table-header">{guildFiltered.guild_name}</td>
                                                    <td className="table-header">
                                                        <span className="btnNavbar" style={{cursor: 'pointer'}} onClick={() => this.setGuildActif(guildFiltered.guild_name, i)}>
                                                            <span style={{ color: 'rgb(87, 222, 87)', fontWeight: 'bold' }}>Set Actif</span>
                                                        </span>
                                                        <span> - </span>
                                                        <span className="btnNavbar" style={{cursor: 'pointer'}} onClick={() => this.refuseGuild(guildFiltered.guild_name, i)}>
                                                            <span style={{ color: 'crimson', fontWeight: 'bold' }}>REFUSE </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            }, this)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Link to="/leaderboard" />
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Douane));