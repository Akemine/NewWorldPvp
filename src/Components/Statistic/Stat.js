import '../../Styles/Statistic/Stat.css'
import '../../Styles/MainContent/LastResults.css'

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


    displayMatch(idWar, dateWar, winner, looser, winner_cote, loose_cote, nombreJoueurs, color){
    return <div className="last_wars_capsule card-last-results" key={idWar}>
              <div className="container" style={{backgroundColor: color, borderRadius: '4px'}}>
                <div className="display-column">
                  <span style={{color: 'white'}} className="bold-txt">WAR ID : {idWar} - {dateWar}</span>
                  <div className="display-row display-result">
                    <span className="guild_win display-fake-btn winner" style={{width: '40%'}}>{winner} <br/>(+{winner_cote})</span>

                    <span className="guild_loose display-fake-btn looser" style={{width: '40%'}}>{looser } <br/>({loose_cote})</span>
                  </div>
                  <span className="bold-txt span-white">Team Size {nombreJoueurs}</span>
                </div>
              </div>
            </div>

    }

    render() {
        if (!this.props.ConnectState) {
            return <Login /> 
        } 
        else {
            return (
                <div className="overview-main" style={{ margin: '0 auto', width: '60%' }}>
                    <div style={{ width: '100%' }}>
                        <p className="title">MY RESULTS</p>
                        <div className="last_wars_container">
                            {this.state.wars.reverse().map(function (last_war, i) {
                                if (last_war.win_guild === this.props.Login) {
                                    return this.displayMatch(last_war.id, last_war.date, last_war.win_guild, last_war.loose_guild, last_war.win_cote, last_war.loose_cote, last_war.nombrejoueurs, '#00800054')
                                }
                                else {
                                    return this.displayMatch(last_war.id, last_war.date, last_war.win_guild, last_war.loose_guild, last_war.win_cote, last_war.loose_cote, last_war.nombrejoueurs, '#ed143d4d')
                                  
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
