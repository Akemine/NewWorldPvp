import '../../Styles/MainContent/Leaderboard.css'

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import axios from 'axios';

const leaderboard = 'LEADERBOARD'


class Leaderboard extends Component {


    state = {
        guilds: [],
        firstColor: 'white',
        secondColor: 'white',
        thirdColor: 'white',
        ownColor: 'white',
        serverchoosed_default: 'all'
    }

    async getLeaderboard() {
        await axios.get('http://54.37.74.45:5000/api/v1/getLeaderboard')
            .then(res => {
                const guilds = res.data;
                this.setState({ guilds });
            })
    }

    componentDidMount() {
        this.getLeaderboard()
        this.ownColor()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Faction !== this.props.Faction)
        {
            this.ownColor()
        }
    }

    // Change l'input en bg white si crimson
    changeBgColor(guildFaction) {
        if (guildFaction === "Marauders" && this.state.firstColor !== 'rgb(87, 222, 87)') {
            this.setState({ firstColor: 'rgb(87, 222, 87)' })
        }
        else if (guildFaction === "Syndicate" && this.state.secondColor !== '#bf0abf') {
            this.setState({ secondColor: '#bf0abf' })
        }
        else if (guildFaction === "Covenant" && this.state.thirdColor !== '#ca8c00') {
            this.setState({ thirdColor: '#ca8c00' })
        }
    }

    displayFirstSecondAndThirdOfLadder(guildRank, guildName, guildGM, guildCote, guildFaction, guildServer, win, loose) {
        // this.changeBgColor(guildFaction)
        if(this.props.Login === guildName){
            if (guildRank === 1) {
                return <tr style={{ color: this.state.ownColor }}>
                    <td style={{ color: this.state.ownColor }} className="table-header first first-ladder">{guildRank} </td>
                    <td style={{ color: this.state.ownColor }} className="first-ladder">{guildName} ({win - loose})</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildCote}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildGM}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildFaction}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildServer}</td>
                </tr>
            }
            else if (guildRank === 2) {
                return <tr style={{ color: this.state.ownColor }}>
                    <td style={{ color: this.state.ownColor }} className="table-header first first-ladder">{guildRank} </td>
                    <td style={{ color: this.state.ownColor }} className="second-ladder">{guildName} ({win - loose})</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildCote}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildGM}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildFaction}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildServer}</td>
                </tr>
            }
            else if (guildRank === 3) {
                return <tr style={{ color: this.state.ownColor }}>
                    <td style={{ color: this.state.ownColor }} className="table-header first first-ladder">{guildRank} </td>
                    <td style={{ color: this.state.ownColor }} className="third-ladder">{guildName} ({win - loose})</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildCote}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildGM}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildFaction}</td>
                    <td style={{ color: this.state.ownColor }} className="table-header first-ladder">{guildServer}</td>
                </tr>
            }
        }
        if (guildRank === 1) {
            return <tr style={{ color: 'white' }}>
                <td className="table-header first first-ladder">{guildRank} </td>
                <td className="first-ladder">{guildName} ({win - loose})</td>
                <td className="table-header first-ladder">{guildCote}</td>
                <td className="table-header first-ladder">{guildGM}</td>
                <td className="table-header first-ladder">{guildFaction}</td>
                <td className="table-header first-ladder">{guildServer}</td>
            </tr>
        }
        else if (guildRank === 2) {
            return <tr style={{ color: 'white' }}>
                <td className="table-header first first-ladder">{guildRank} </td>
                <td className="second-ladder">{guildName} ({win - loose})</td>
                <td className="table-header first-ladder">{guildCote}</td>
                <td className="table-header first-ladder">{guildGM}</td>
                <td className="table-header first-ladder">{guildFaction}</td>
                <td className="table-header first-ladder">{guildServer}</td>
            </tr>
        }
        else if (guildRank === 3) {
            return <tr style={{ color: 'white' }}>
                <td className="table-header first first-ladder">{guildRank} </td>
                <td className="third-ladder">{guildName} ({win - loose})</td>
                <td className="table-header first-ladder">{guildCote}</td>
                <td className="table-header first-ladder">{guildGM}</td>
                <td className="table-header first-ladder">{guildFaction}</td>
                <td className="table-header first-ladder">{guildServer}</td>
            </tr>
        }
    }

    ownColor(){
        if(this.props.Faction === "Marauders"){
            this.setState({ownColor: 'rgb(87, 222, 87)'})
        } else if(this.props.Faction === "Syndicate"){
           this.setState({ownColor: '#ff29ff'})
        }
        else {
            this.setState({ownColor: '#fba200'})
        }
    }
    displayLadder(guildRank, guildName, guildGM, guildCote, guildFaction, guildServer, win, loose) {
        if(this.props.Login === guildName){
        return <tr>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildRank}</td>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildName} ({win - loose})</td>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildCote}</td>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildGM}</td>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildFaction}</td>
            <td className="table-header" style={{color: this.state.ownColor, fontWeight: 'bold'}}>{guildServer}</td>
        </tr> 

        } else {
            return <tr>
            <td className="table-header">{guildRank}</td>
            <td className="table-header">{guildName} ({win - loose})</td>
            <td className="table-header">{guildCote}</td>
            <td className="table-header">{guildGM}</td>
            <td className="table-header">{guildFaction}</td>
            <td className="table-header">{guildServer}</td>
        </tr>
        }

    }

    render() {
        console.log(this.state.guilds)
        if(this.props.ServerChoosed === "all"){
            return (
                <div className="middleMenu-main scroller">
                    <div className="middleMenu-leaderboard">
                        <p className="title" fixed>{leaderboard} </p>
                        <div className="list-leaderboard">
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="table-header">RANK</th>
                                        <th className="table-header">GUILD</th>
                                        <th className="table-header">COTE</th>
                                        <th className="table-header">GM</th>
                                        <th className="table-header">FACTION</th>
                                        <th className="table-header">SERVER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.guilds.map(function(guild, i) {
                                        if (i + 1 === 1 || i + 1 === 2 || i + 1 === 3) {
                                            return this.displayFirstSecondAndThirdOfLadder(i + 1, guild.guild_name, guild.pseudo, guild.cote, guild.faction, guild.server, guild.win, guild.loose)
                                        }
                                        else {
                                            return this.displayLadder(i + 1, guild.guild_name, guild.pseudo, guild.cote, guild.faction, guild.server, guild.win, guild.loose)
                                        }
                                    }, this)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else{
            return (
                <div className="middleMenu-main scroller">
                    <div className="middleMenu-leaderboard">
                        <p className="title" fixed>{leaderboard} </p>
                        <div className="list-leaderboard">
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="table-header">RANK</th>
                                        <th className="table-header">GUILD</th>
                                        <th className="table-header">COTE</th>
                                        <th className="table-header">GM</th>
                                        <th className="table-header">FACTION</th>
                                        <th className="table-header">SERVER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.guilds.filter(guild => guild.server === this.props.ServerChoosed).map(function(guildFiltered, i) {
                                        console.log(guildFiltered.guild_name)
                                        if (i + 1 === 1 || i + 1 === 2 || i + 1 === 3) {
                                            return this.displayFirstSecondAndThirdOfLadder(i + 1, guildFiltered.guild_name, guildFiltered.pseudo, guildFiltered.cote, guildFiltered.faction, guildFiltered.server, guildFiltered.win, guildFiltered.loose)
                                        }
                                        else {
                                            return this.displayLadder(i + 1, guildFiltered.guild_name, guildFiltered.pseudo, guildFiltered.cote, guildFiltered.faction, guildFiltered.server, guildFiltered.win, guildFiltered.loose)
                                        }
                                    }, this)
                                }
                                </tbody>
                            </table>
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
      Banned: state.loginReducer.Banned,
      ServerChoosed: state.serverChoiceReducer.ServerChoosed
    }
  }

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Leaderboard));