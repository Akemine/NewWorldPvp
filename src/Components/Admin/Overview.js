import '../../Styles/Admin/Overview.css'

import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Link, Redirect } from "react-router-dom";

class Overview extends Component {

    // MES TOAST DU COMPOSANTS ACCEPT OR DECLINE WAR
    notify_ban_guild = (guild_name) => toast.dark(guild_name + " Has been Banned")
    notify_warn_guild = (guild_name) => toast.success(guild_name + " Has been Warned")
    notify_unwarn_guild = (guild_name) => toast.info(guild_name + " Has been unWarned")
    notify_cant_unwarn = (guildName) => toast.error("You cant unwarn " + guildName + " because there is already 0 Warn")
    notify_unban_guild = (guildName) => toast.info(guildName + " Has been Unbanned")
    ///////////////////////////////////////////////////////////

    state = {
        guilds: [],
        banned_guilds: [{ guildname: 'THERE IS NO DATA' }],
        last_wars: []
    }

    async getAllGuild() {
        await axios.get(`http://localhost:5000/api/v1/getAllGuild`)
            .then(res => {
                const guilds = res.data;
                this.setState({ guilds });
            })
    }

    async getBannedGuild() {
        await axios.get(`http://localhost:5000/api/v1/getBannedGuild`)
            .then(res => {
                const banned_guilds = res.data;
                this.setState({ banned_guilds });
            })
    }

    async getAllLastWars() {
        await axios.get(`http://localhost:5000/api/v1/getAllLastWars`)
            .then(res => {
                const last_wars = res.data;
                this.setState({ last_wars });
            })
    }

    getGuilds() {
        this.getAllGuild()
        this.getBannedGuild()
    }

    componentDidMount() {
        this.getAllGuild()
        this.getBannedGuild()
        this.getAllLastWars()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.last_wars !== this.state.last_wars) {
            this.setState({ last_wars: this.state.last_wars });
        }
        if (prevState.guilds !== this.state.guilds) {
            this.setState({ guilds: this.state.guilds });
        }
        if (prevState.banned_guilds !== this.state.banned_guilds) {
            this.setState({ banned_guilds: this.state.banned_guilds });
        }
    }

    async banGuild(idGuild) {
        await fetch('http://localhost:5000/api/v1/banGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": idGuild,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                this.getGuilds()
            })
    }

    async unBanGuild(idGuild) {
        await fetch('http://localhost:5000/api/v1/unBanGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": idGuild,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                this.getGuilds()
            })
    }

    async warnGuild(idGuild, warnNumber) {
        await fetch('http://localhost:5000/api/v1/warnGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": idGuild,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (warnNumber + 1 >= 3) {
                    this.banGuild(idGuild)
                }
                this.getAllGuild()
            })
    }

    async unWarnGuild(idGuild, warnNumber) {
        if (warnNumber > 0) {
            await fetch('http://localhost:5000/api/v1/unWarnGuild', {
                method: "POST",
                body: JSON.stringify({
                    "idGuild": idGuild,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                this.getAllGuild()
            })
        }
    }

    async cancelMatch(idWar){
        await fetch('http://localhost:5000/api/v1/cancelMatch', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idWar,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            this.getAllLastWars()
        })
    }

    async replayMatch(idWar){
        await fetch('http://localhost:5000/api/v1/replayMatch', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idWar,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            this.getAllLastWars()
        })
    }

    render() {
        if (this.props.Role === "admin") {
            return (
                <div className="overview-main" style={{ margin: '0 auto', width: '80%' }}>
                    <ToastContainer hideProgressBar={false} autoClose={6000} position="top-center" />
                    <div style={{ width: '100%' }}>
                        <p className="title">OVERVIEW ADMIN</p>
                        <div className="overview-main-content">
                            <div>
                                <p className="title">BAN GUILD</p>
                                <div style={{ textAlign: 'left', overflowY: 'auto', height: '450px' }}>
                                    <table style={{ width: '100%', borderSpacing: '1.8em 0.4em' }}>
                                        <thead>
                                            <tr>
                                                <th className="table-header" style={{ textAlign: 'center' }}>GUILD</th>
                                                <th className="table-header" style={{ textAlign: 'center' }}>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.guilds.map(guild =>
                                                <tr>
                                                    <td className="table-header">{guild.guild_name}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.banGuild(guild.id)}>
                                                            <span style={{ color: 'crimson', fontWeight: 'bold' }}>BAN</span>
                                                        </Link>
                                                        <span> - </span>
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.warnGuild(guild.id, guild.warn)}>
                                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>WARN </span></Link> ({guild.warn})
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.unWarnGuild(guild.id, guild.warn)}>
                                                            <span style={{ color: '#57de57', fontWeight: 'bold' }}> UNWARN</span></Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <p className="title">UNBAN GUILD</p>
                                <div style={{ textAlign: 'left', overflowY: 'auto', height: '450px' }}>
                                    <table style={{ width: '100%', borderSpacing: '1.8em 0.4em' }}>
                                        <thead>
                                            <tr>
                                                <th className="table-header" style={{ textAlign: 'center' }}>GUILD</th>
                                                <th className="table-header" style={{ textAlign: 'center' }}>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.banned_guilds.map(banned_guild =>
                                                <tr>
                                                    <td className="table-header">{banned_guild.guild_name}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.unBanGuild(banned_guild.id)}>
                                                            <span style={{ color: 'rgb(87, 222, 87)', fontWeight: 'bold' }}>UNBAN</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div>
                                <p className="title">ROLLBACK WAR</p>
                                <div style={{ textAlign: 'left', overflowY: 'auto', height: '450px' }}>
                                    <table style={{ width: '100%', borderSpacing: '1.8em 0.4em' }}>
                                        <thead>
                                            <tr>
                                                <th className="table-header">ID</th>
                                                <th className="table-header">WINNER</th>
                                                <th className="table-header">LOOSER</th>
                                                <th className="table-header">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.last_wars.map(war =>
                                                <tr>
                                                    <td className="table-header">{war.id}</td>
                                                    <td className="table-header">{war.win_guild}</td>
                                                    <td className="table-header">{war.loose_guild}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.cancelMatch(war.id)}>
                                                            <span style={{ color: 'crimson', fontWeight: 'bold' }}>CANCEL</span>
                                                        </Link>
                                                        <span> - </span>
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.replayMatch(war.id)}>
                                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>REPLAY</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <Redirect to="/leaderboard" />
        }

    }

}

const mapStateToProps = state => {
    return {
        ConnectState: state.ConnectState,
        Login: state.Login,
        Password: state.password,
        Faction: state.Faction,
        Role: state.Role,
        Banned: state.Banned
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Overview));