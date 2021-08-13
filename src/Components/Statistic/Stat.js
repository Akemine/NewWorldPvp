import '../../Styles/Statistic/Stat.css'

import React  from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Login from '../Login/Login';
import { Redirect } from 'react-router-dom';


class Stat extends React.Component {

    myGuild = this.props.Login
    state = {
        wars: [],
    }

    async getAllResultOfMyGuild() {
        console.log(this.props.Login)
        await fetch('http://54.37.74.45:5000/api/v1/getAllResultOfMyGuild', {
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
        if(prevProps.Login !== this.props.Login){
            this.getAllResultOfMyGuild()
        }
    }


    displayMatch(idWar, dateWar, winner, looser, winner_cote, loose_cote, nombreJoueurs){
        return <div className="container">
            <div className="display-column">
                <span style={{ color: 'white' }} className="bold-txt">WAR ID : {idWar} - {dateWar}</span>
                <div className="display-row display-result">
                    <span className="guild_win display-fake-btn looser">{winner} Wins (+{winner_cote})</span>
                    <span className="guild_loose display-fake-btn winner">{looser} ({loose_cote})</span>
                </div>
                <span className="bold-txt span-white">Team Size {nombreJoueurs}</span>
            </div>
        </div>
    }

    render() {
        if (!this.props.ConnectState) {
            return <Login /> 
        } 
        else {
            return (
                <div className="overview-main" style={{ margin: '0 auto', width: '50%' }}>
                    <div style={{ width: '100%' }}>
                        <p className="title">MY RESULTS</p>
                        <div className="last_wars_container">
                            {this.state.wars.reverse().map(function (last_war, i) {
                                if (last_war.win_guild === this.props.Login) {
                                    return <div className="last_wars_capsule card-last-results" style={{ backgroundColor: '#7aff0012' }} key={last_war.id}>
                                        {this.displayMatch(last_war.id, last_war.date, last_war.win_guild, last_war.loose_guild, last_war.win_cote, last_war.loose_cote, last_war.nombrejoueurs)}
                                    </div>
                                }
                                else {
                                    return <div className="last_wars_capsule card-last-results" style={{ backgroundColor: '#dc143c14' }} key={last_war.id}>
                                        {this.displayMatch(last_war.id, last_war.date, last_war.win_guild, last_war.loose_guild, last_war.win_cote, last_war.loose_cote, last_war.nombrejoueurs)}
                                    </div>
                                }
                            }, this)}
                        </div>
                    </div>
                </div>
            ) 
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stat));
