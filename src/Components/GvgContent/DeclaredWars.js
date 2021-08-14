import '../../Styles/GvgContent/Gvg.css'
import '../../Styles/Login/Login.css'

import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";

import DateFunction from '../DateFunction'

let date = new Date()

class warWaiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = { warWaiting: [], guild_winner: '', idDeLaWar: '' };
    }

    async findWarInWaiting() {
        await fetch('http://54.37.74.45:5000/api/v1/getMyWarProposed', {
            method: "POST",
            body: JSON.stringify({
                "myGuild": this.props.Login,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ warWaiting: response })
            })
    }

    componentDidMount = () => {
        this.findWarInWaiting() // FONCTION QUI RETOURNE LES GUILDES QU'ON PEUT DUEL
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.warWaiting !== this.state.warWaiting){
            this.setState({ warWaiting: this.state.warWaiting });
        }
    }

    // FONCTION QUI COMPARE LA DATE DONNEE (BDD) A ACTUELLEMENT.
    // RETOURNE UNE PHRASE QUI DIT SI C'EST OLD OU NEW
    getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24)
      }


    async synchroniseWinElo(idDeLaWar, guildNameWinner){
        await fetch('http://54.37.74.45:5000/api/v1/synchroniseElo', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idDeLaWar,
                "guildNameWinner": guildNameWinner,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

        this.findWarInWaiting()
    }

    async synchroniseLooseElo(idDeLaWar){
        await fetch('http://54.37.74.45:5000/api/v1/getLooser', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idDeLaWar,
                "guildNameLooser": this.props.Login,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                this.synchroniseWinElo(idDeLaWar, response)
            })
    }

        // CANCEL
    // BDD : 
    // delete de last wars
    // update les cotes pour rollback
    // FILTER : 
    // delete de last wars
    // mets à jour last wars
    async cancelProposedWar(idWar, i) {
        await fetch('http://54.37.74.45:5000/api/v1/cancelProposedWar', {
            method: "POST",
            body: JSON.stringify({
                "idWar": idWar,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        this.state.warWaiting.splice(i, 1)
        this.setState({warWaiting: this.state.warWaiting})
    }


    render() {
        return (
            <div className="warWaiting-gvg">
                <h1 className="title">DECLARED WARS</h1>
                <div className="warWaiting-gvg-content">
                    {this.state.warWaiting.map(function(war, i) {
                        let diffDate = DateFunction.getDifferenceInDays(date, new Date(war.date_war))
                        // SI info date === in, cela veut dire que la date est DANS le futur et donc ok.
                        if (diffDate < 1.20){
                            if(!war.archive){
                                if (war.accepted === null) {
                                    return <>
                                        <div className="list-flexbox-leaderboard-gvg card" style={{ backgroundColor: '#ff8405'}}>
                                            <div className="container" key={war.id}>
                                                <h3 style={{ color: 'white' }} className="bold-txt">WAR ID : {war.id} - {war.guild_attaquer}</h3>
                                                <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players - {war.lieu}</div>
                                                <div className="bold-txt card_declared_war pending">Pending...</div>
                                                <div className="bold-txt card_declared_war declined cancel-btn-hover" onClick={() => this.cancelProposedWar(war.id, i)}>Cancel</div>
                                            </div>
                                        </div>
                                    </>
                                }
                                else if (war.accepted) {
                                    return <>
                                        <div className="list-flexbox-leaderboard-gvg card" style={{ backgroundColor: '#32f9004f'}}>
                                            <div className="container" key={war.id} style={{width: '100%'}} >
                                                <h3 style={{ color: 'white' }} className="bold-txt">WAR ID : {war.id} - {war.guild_attaquer}</h3>
                                                <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players - {war.lieu}</div>
                                                <div className="display-flex-row-declared-wars">
                                                    <button className="btn btn-declared-wars"><span className="bold-txt" ><Link key={war.id} to="/gvg" className="btn-no-deco" onClick={() => this.synchroniseWinElo(war.id, this.props.Login)}>I WON</Link></span></button>
                                                    <button className="btn btn-declared-wars decline"><span className="bold-txt"><Link key={war.id} to="/gvg" className="btn-no-deco" onClick={() => this.synchroniseLooseElo(war.id)}>I LOST</Link></span></button>
                                                </div>
                                                <div className="bold-txt card_declared_war accepted" style={{ width: '79%'}}>Accepted</div>
                                            </div>
                                        </div>
                                    </>
                                }
                                else if (!war.accepted) {
                                    return <>
                                        <div className="list-flexbox-leaderboard-gvg card" style={{ backgroundColor: '#ffffff63'}}>
                                            <div className="container" key={war.id} >
                                                <h3 style={{ color: 'white' }} className="bold-txt">WAR ID : {war.id} - {war.guild_attaquer}</h3>
                                                <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players - {war.lieu}</div>
                                                <div className="bold-txt card_declared_war declined">Declined</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            } 
                        }
                    }, this)}
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(warWaiting));