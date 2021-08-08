import '../../Styles/Gvg.css'
import '../../Styles/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";

class warAcceptOrRefuse extends React.Component {

    // MES TOAST DU COMPOSANTS ACCEPT OR DECLINE WAR
    notify_war_accepted = () => toast.success("War accepted !")
    notify_war_declined = () => toast.dark("War declined !")
    ///////////////////////////////////////////////////////////

    // MON CONSTRUCTEUR
    constructor(props) {
        super(props);
        this.state = { warAcceptOrRefuse: [] };
    }
    ////////////////////////////////////////////

    // FONCTIONS DU COMPOSANT 
    // FONCTION QUI EST APPELLE QUAND ON ACCEPTE UNE WAR
    AcceptWar = (id) => {
        this.notify_war_accepted() // Toast de war accepted
        this.acceptWar(id) // API qui va update la war 
    }

    // FONCTION QUI EST APPELLE QUAND ON DECLINE UNE WAR
    DeclineWar = (id) => {
        this.notify_war_declined() // Toast de war declined
        this.declineWar(id) // API qui va update la war 
    }
    /////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // LES CALLS D'API ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Cherche les wars qu'on peut accepter ou refuser
    async findWarIHaveToAcceptOrDecline() {
        await fetch('http://localhost:5000/api/v1/getMyWarIHaveToAccept', {
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
                this.setState({ warAcceptOrRefuse: response })
            })
    }

    // API CALL
    // PERMET DE PASSER A TRUE LA VALEUR DE LA WAR POUR DIRE QU'ELLE EST ACCEPTE
    async acceptWar(id) {

        await fetch('http://localhost:5000/api/v1/acceptWar', {
            method: "POST",
            body: JSON.stringify({
                "id": id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log("War accepté")
                }
            })
    }

    async declineWar(id) {

        await fetch('http://localhost:5000/api/v1/declineWar', {
            method: "POST",
            body: JSON.stringify({
                "id": id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log("War décliné")
                }
            })
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // CE QUE LE COMPOSANT APPEL AU DEMARRAGE
    componentDidMount = () => {
        this.findWarIHaveToAcceptOrDecline() // FONCTION QUI RETOURNE LES WAR A ACCEPTER 
    }

    // CE QUE LE COMPOSANT UPDATE
    componentDidUpdate(prevProps, prevState) {
        if (prevState.warAcceptOrRefuse !== this.state.warAcceptOrRefuse) {
            this.setState({ warAcceptOrRefuse: this.state.warAcceptOrRefuse })
            this.findWarIHaveToAcceptOrDecline() // API qui recharge les news data
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////


    render() {
        return (
            <div className="warAccept-gvg">
                <h1 className="title">PENDING WARS</h1>
                <div className="gvg-acceptwar-main">
                    {this.state.warAcceptOrRefuse.map((war) => {
                        if (war.accepted === null) {
                            return <div className="gvg-acceptwar-capsule">
                                <div className="list-flexbox-leaderboard-gvg">
                                    <div key={war.id} className="bold-txt">
                                        <span style={{ color: '#ffb10f' }}>{war.guild_proposeur}</span>
                                        <div style={{ color: 'white' }}>{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn">
                                        <span><Link to="/gvg" className="btn-no-deco" onClick={() => this.AcceptWar(war.id)}>ACCEPT</Link></span>
                                    </button>
                                    <button className="btn decline">
                                        <span><Link to="/gvg" className="btn-no-deco" onClick={() => this.DeclineWar(war.id)}>DECLINE</Link></span>
                                    </button>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(warAcceptOrRefuse));