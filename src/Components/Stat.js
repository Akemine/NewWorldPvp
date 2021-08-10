import '../Styles/Stat.css'

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom';

let myGuild

class Stat extends Component {

    myGuild = this.props.Login
    state = {
        wars: [],
    }

    async getAllResultOfMyGuild() {
        await fetch('http://localhost:5000/api/v1/getAllResultOfMyGuild', {
            method: "POST",
            body: JSON.stringify({
                "guildName": this.props.Login,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ wars: response })
            })
    }

    componentDidMount() {
        this.getAllResultOfMyGuild()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.wars !== this.state.wars) {
            this.setState({ wars: this.state.wars });
        }
    }

    render() {
        if (this.props.ConnectState) {
            return (
                <div className="overview-main" style={{ margin: '0 auto', width: '50%' }}>
                    <div style={{ width: '100%' }}>
                        <p className="title">MY RESULTS</p>
                        <div className="last_wars_container">
                            {this.state.wars.map(function (last_war, i) {
                                if (last_war.win_guild === this.props.Login) {
                                    return <div className="last_wars_capsule card-last-results" style={{ backgroundColor: '#7aff0012' }} key={last_war.id}>
                                        <div className="container">
                                            <div className="display-column">
                                                <span style={{ color: 'white' }} className="bold-txt">WAR ID : {last_war.id} - {last_war.date}</span>
                                                <div className="display-row display-result">
                                                    <span className="guild_win display-fake-btn winner">{last_war.win_guild} Wins (+{last_war.win_cote})</span>
                                                    <span className="span-white display-fake-btn text" style={{ fontSize: '18px' }}> AGAINST </span>
                                                    <span className="guild_loose display-fake-btn looser">{last_war.loose_guild} ({last_war.loose_cote})</span>
                                                </div>
                                                <span className="bold-txt span-white">Team Size {last_war.nombrejoueurs}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="last_wars_capsule card-last-results" style={{ backgroundColor: '#dc143c14' }} key={last_war.id}>
                                        <div className="container">
                                            <div className="display-column">
                                                <span style={{ color: 'white' }} className="bold-txt">WAR ID : {last_war.id} - {last_war.date}</span>
                                                <div className="display-row display-result">
                                                    <span className="guild_win display-fake-btn looser">{last_war.win_guild} Wins (+{last_war.win_cote})</span>
                                                    <span className="span-white display-fake-btn text" style={{ fontSize: '18px' }}> AGAINST </span>
                                                    <span className="guild_loose display-fake-btn winner">{last_war.loose_guild} ({last_war.loose_cote})</span>
                                                </div>
                                                <span className="bold-txt span-white">Team Size {last_war.nombrejoueurs}</span>
                                            </div>
                                        </div>
                                    </div>

                                }
                            }, this

                            )}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/login"></Redirect>
        }

    }
}

const mapStateToProps = state => {
    return {
        ConnectState: state.ConnectState,
        Login: state.Login,
        Password: state.Password,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stat));
