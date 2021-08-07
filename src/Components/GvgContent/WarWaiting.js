import '../../Styles/Gvg.css'
import '../../Styles/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Login from '../Login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns'

import { Link } from "react-router-dom";

let info_guild = ''
let date = format(new Date(), 'MM/dd/yyyy')


class warWaiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {warWaiting: []};
    }

    async findWarInWaiting(){
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

    render(){
        return(
            <div className="warWaiting-gvg">
            <h1 className="title">War in waiting ...</h1>
            <div className="warWaiting-gvg-content">
            {this.state.warWaiting.map(function(war, i) { 
                if(war.accepted === null){
                    return <>
                    <div className="list-flexbox-leaderboard-gvg">
                        <div key={war.id}><span style={{color: '#04AA6D'}}>{war.guild_proposeur}</span>
                            <span style={{color: 'white'}}> VS </span>
                            <span style={{color: 'crimson'}}>{war.guild_attaquer}</span>
                            <div style={{color: 'wheat'}}><span style={{color: 'wheat'}}>{war.heure}</span> | {war.date_war}<br/> {war.nombrejoueurs} Players </div>
                        </div> 
                    </div>
                    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(warWaiting));