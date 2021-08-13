import '../../Styles/Admin/Overview.css'

import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Link } from "react-router-dom";

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
        last_wars: [],
        guilds_no_filtered: []
    }

    async getAllGuild() {
        await axios.get('http://54.37.74.45:5000/api/v1/getAllGuild')
            .then(res => {
                const guilds = res.data;
                this.setState({ guilds });
            })
    }

    async getBannedGuild() {
        await axios.get('http://54.37.74.45:5000/api/v1/getBannedGuild')
            .then(res => {
                const banned_guilds = res.data;
                this.setState({ banned_guilds });
            })
    }

    async getAllLastWars() {
        await axios.get('http://54.37.74.45:5000/api/v1/getAllLastWars')
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

    // BAN
    // BDD : 
    // passe banned à true
    // FILTER : 
    // crée un objet json qui contient banned à true ainsi que d'autres données
    // delete la ligne de guilds
    // ajoute la ligne à banned_guilds
    // mets à jour l'état banned_guilds
    async banGuild(id, i, guild_name, warn) {
        await fetch('http://54.37.74.45:5000/api/v1/banGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const myObj = { id, guild_name, banned: true, warn }
        this.state.guilds.splice(i, 1)
        this.state.banned_guilds.push(myObj)
        this.setState({ banned_guilds: this.state.banned_guilds })
    }


    // UNBAN
    // BDD : 
    // passe banned à false
    // passe warn à 0
    // FILTER : 
    // crée un objet json qui contient banned à false & warn à 0
    // delete la ligne de banned_guilds
    // ajoute la ligne à guilds
    // mets à jour l'état guilds
    async unBanGuild(id, i, guild_name, warn) {
        await fetch('http://54.37.74.45:5000/api/v1/unBanGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const myObj = { id, guild_name, banned: false, warn: 0 }
        this.state.banned_guilds.splice(i, 1)
        this.state.guilds.push(myObj)
        this.setState({ guilds: this.state.guilds })
    }

    // WARN
    // BDD : 
    // incrémente warn
    // FILTER : 
    // incrémente warn
    // mets à jour l'état guilds
    async warnGuild(id, i, guildname, warnNumber) {
        await fetch('http://54.37.74.45:5000/api/v1/warnGuild', {
            method: "POST",
            body: JSON.stringify({
                "idGuild": id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (warnNumber + 1 >= 3) {
                    this.banGuild(id, i, guildname, warnNumber)
                }
            })
        this.state.guilds[i].warn = this.state.guilds[i].warn + 1
        this.setState({ guilds: this.state.guilds })
    }

    // WARN
    // BDD : 
    // décrémente warn
    // FILTER : 
    // décrémente warn
    // mets à jour l'état guilds
    async unWarnGuild(id, i, warnNumber) {
        if (warnNumber > 0) {
            this.state.guilds[i].warn = this.state.guilds[i].warn - 1
            this.setState({ guilds: this.state.guilds })
            await fetch('http://54.37.74.45:5000/api/v1/unWarnGuild', {
                method: "POST",
                body: JSON.stringify({
                    "idGuild": id,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }

    // CANCEL
    // BDD : 
    // delete de last wars
    // update les cotes pour rollback
    // FILTER : 
    // delete de last wars
    // mets à jour last wars
    async cancelMatch(idWar, i) {
        await fetch('http://54.37.74.45:5000/api/v1/cancelMatch', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idWar,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        this.state.last_wars.splice(i, 1)
        this.setState({last_wars: this.state.last_wars})
    }

    // REPLAY
    // BDD : 
    // update war_proposed en archive false pour le réafficher dans le panneau de gvg des guildes en question
    // delete de last wars
    // update les cotes pour rollback
    // FILTER : 
    // delete de last wars
    // mets à jour last wars
    async replayMatch(idWar, i) {
        await fetch('http://54.37.74.45:5000/api/v1/replayMatch', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idWar,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.state.last_wars.splice(i, 1)
        this.setState({last_wars: this.state.last_wars})
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

                                            {this.state.guilds.filter(guild => !guild.banned).map(function (guildFiltered, i) {
                                                return <tr>
                                                    <td className="table-header">{guildFiltered.guild_name}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.banGuild(guildFiltered.id, i, guildFiltered.guild_name, guildFiltered.warn)}>
                                                            <span style={{ color: 'crimson', fontWeight: 'bold' }}>BAN</span>
                                                        </Link>
                                                        <span> - </span>
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.warnGuild(guildFiltered.id, i, guildFiltered.guild_name, guildFiltered.warn)}>
                                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>WARN </span></Link> ({guildFiltered.warn})
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.unWarnGuild(guildFiltered.id, i, guildFiltered.warn)}>
                                                            <span style={{ color: '#57de57', fontWeight: 'bold' }}> UNWARN</span></Link>
                                                    </td>
                                                </tr>
                                            }, this)}
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
                                            {this.state.banned_guilds.filter(guild => guild.banned).map(function (guildFiltered, i) {
                                                return <tr>
                                                    <td className="table-header">{guildFiltered.guild_name}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.unBanGuild(guildFiltered.id, i, guildFiltered.guild_name, guildFiltered.warn)}>
                                                            <span style={{ color: 'rgb(87, 222, 87)', fontWeight: 'bold' }}>UNBAN</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            }, this)}
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
                                            {this.state.last_wars.filter(war => war).map(function (warFiltered, i) {
                                                return <tr>
                                                    <td className="table-header">{warFiltered.id}</td>
                                                    <td className="table-header">{warFiltered.win_guild}</td>
                                                    <td className="table-header">{warFiltered.loose_guild}</td>
                                                    <td className="table-header">
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.cancelMatch(warFiltered.id, i)}>
                                                            <span style={{ color: 'crimson', fontWeight: 'bold' }}>CANCEL</span>
                                                        </Link>
                                                        <span> - </span>
                                                        <Link to="/overview" className="connection btnNavbar" onClick={() => this.replayMatch(warFiltered.id, i)}>
                                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>REPLAY</span>
                                                        </Link>
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
        }
        else {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Overview));