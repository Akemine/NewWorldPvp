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
    async findWarIHaveToAcceptOrDecline(){
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
    async acceptWar(id){
        
        await fetch('http://localhost:5000/api/v1/acceptWar', {
            method: "POST",
            body: JSON.stringify({
                "id" : id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
        if(response){
           console.log("War accepté")
        }
        }) 
    }

    async declineWar(id){
        
        await fetch('http://localhost:5000/api/v1/declineWar', {
            method: "POST",
            body: JSON.stringify({
                "id" : id,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
        if(response){
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
    componentDidUpdate(prevProps, prevState){
        if (prevState.warAcceptOrRefuse !== this.state.warAcceptOrRefuse){
            this.setState({warAcceptOrRefuse: this.state.warAcceptOrRefuse})
            this.findWarIHaveToAcceptOrDecline() // API qui recharge les news data
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    
    render(){
        return(
            <div className="warAccept-gvg">
            <h1 className="title"><span style={{color: '#04AA6D'}}>Accept</span><span style={{color: 'white'}}> or</span> <span style={{color: 'crimson'}}>Refuse</span></h1>
            <div className="gvg-acceptwar-main">
            {this.state.warAcceptOrRefuse.map((war) => { 
                if(war.accepted === null){
                    return <div className="gvg-acceptwar-capsule">
                        <div>
                            <span>
                                <Link to="/gvg" className="btn-accept" onClick={() => this.AcceptWar(war.id)}>ACCEPT</Link>
                            </span>
                            
                            <span style={{color: 'white'}}> OR </span>
                            <span>
                                <Link to="/gvg" className="btn-Decline" onClick={() => this.DeclineWar(war.id)}>DECLINE</Link>
                            </span>
                        </div>
                        <div className="list-flexbox-leaderboard-gvg">
                            <div key={war.id}>
                                <span style={{color: '#ffb10f'}}>{war.guild_proposeur}</span>
                                <span style={{color: 'white'}}> VS </span>
                                <span style={{color: '#ffb10f'}}>{war.guild_attaquer}</span>
                                <div style={{color: 'wheat'}}><span style={{color: 'wheat'}}>{war.heure}</span> | {war.date_war}<br/> {war.nombrejoueurs} Players </div>
                            </div>
                        </div>
                    </div>
                }})}
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