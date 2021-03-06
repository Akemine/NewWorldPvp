import '../../Styles/GvgContent/Gvg.css'
import '../../Styles/Login/Login.css'

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
    async AcceptWar(id) {
        await this.acceptWar(id) // API qui va update la war 
        window.location.reload()
    }

    // FONCTION QUI EST APPELLE QUAND ON DECLINE UNE WAR
    async DeclineWar (id) {
        await this.declineWar(id) // API qui va update la war 
        window.location.reload()
    }
    /////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // LES CALLS D'API ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Cherche les wars qu'on peut accepter ou refuser
    async findWarIHaveToAcceptOrDecline() {
        await fetch('http://54.37.74.45:5000/api/v1/getMyWarIHaveToAccept', {
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
        await fetch('http://54.37.74.45:5000/api/v1/acceptWar', {
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
                    this.findWarIHaveToAcceptOrDecline()
                }
            })
    }

    async declineWar(id) {
        await fetch('http://54.37.74.45:5000/api/v1/declineWar', {
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
                    this.findWarIHaveToAcceptOrDecline()
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

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////


    render() {
        return (
            <div className="warAccept-gvg">
                <h1 className="title">PENDING WARS</h1>
                <div className="gvg-acceptwar-main">
                    {this.state.warAcceptOrRefuse.map((war) => {
                        console.log(war.id)
                        if (war.accepted === null) {
                            return <div className="gvg-acceptwar-capsule">
                                <div className="list-flexbox-leaderboard-gvg">
                                    <div key={war.id} className="bold-txt">
                                        <span style={{ color: '#ffb10f' }}>WAR ID : {war.id}  {war.guild_proposeur}</span>
                                        <div style={{ color: 'white' }}>{war.heure} | {war.date_war}<br /> {war.nombrejoueurs} Players </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn" onClick={() => this.AcceptWar(war.id)}>
                                        <span><Link to="/gvg" className="btn-no-deco">ACCEPT</Link></span>
                                    </button>
                                    <button className="btn decline" onClick={() => this.DeclineWar(war.id)}>
                                        <span><Link to="/gvg" className="btn-no-deco">DECLINE</Link></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(warAcceptOrRefuse));