import '../../Styles/Gvg.css'
import '../../Styles/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Login from '../Login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format, formatDistanceToNow } from 'date-fns'

import { Link } from "react-router-dom";
import pending_icon from '../../asset/pending_icon.svg'

let info_date = ''
let date = format(new Date(), 'MM/dd/yyyy')


class warWaiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = { warWaiting: [] };
    }

    async findWarInWaiting() {
        await fetch('http://localhost:5000/api/v1/getMyWarProposed', {
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

    // FONCTION QUI COMPARE LA DATE DONNEE (BDD) A ACTUELLEMENT.
    // RETOURNE UNE PHRASE QUI DIT SI C'EST OLD OU NEW
    compareDate(dateDatabase){
        info_date = dateDatabase.split("/")
        //info_date[0] = day info_date[1] = month info_date[2] = years
        // console.log( formatDistanceToNow(new Date(info_date[2], info_date[1], 7), { addSuffix: true }))
        info_date = formatDistanceToNow(new Date(info_date[2], info_date[1], info_date[0]), { addSuffix: true }).split(" ")
    }

    render() {
        return (
            <div className="warWaiting-gvg">
                <h1 className="title">DECLARED WARS</h1>
                <div className="warWaiting-gvg-content">
                    {this.state.warWaiting.map((war) => {
                        this.compareDate(war.date_war)
                        // SI info date === in, cela veut dire que la date est DANS le futur et donc ok.
                        if (info_date[0] === 'in'){
                            if (war.accepted === null) {
                                return <>
                                    <div className="list-flexbox-leaderboard-gvg card">
                                        <div className="container" key={war.id}>
                                            <h3 style={{ color: 'white' }} className="bold-txt">{war.guild_attaquer}</h3>
                                            <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                                            <div className="bold-txt card_declared_war pending">Pending...</div>
                                        </div>
                                    </div>
                                </>
                            }
                            else if (war.accepted) {
                                return <>
                                    <div className="list-flexbox-leaderboard-gvg card">
                                        <div className="container" key={war.id}>
                                            <h3 style={{ color: 'white' }} className="bold-txt">{war.guild_attaquer}</h3>
                                            <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                                            <div className="bold-txt card_declared_war accepted">Accepted</div>
                                        </div>
                                    </div>
                                </>
                            }
                            else if (!war.accepted) {
                                return <>
                                    <div className="list-flexbox-leaderboard-gvg card">
                                        <div className="container" key={war.id}>
                                            <h3 style={{ color: 'white' }} className="bold-txt">{war.guild_attaquer}</h3>
                                            <div style={{ color: 'white' }} className="bold-txt">{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                                            <div className="bold-txt card_declared_war declined">Declined</div>
                                        </div>
                                    </div>
                                </>
                            }
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ConnectState: state.ConnectState,
        Login: state.Login,
        Password: state.password
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(warWaiting));