import '../../Styles/Gvg.css'
import '../../Styles/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Login from '../Login';
import WarAcceptOrRefuse from './WarAcceptOrDecline'
import WarWaiting from './WarWaiting'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns'

import { Link } from "react-router-dom";

let info_guild = ''
let date = format(new Date(), 'MM/dd/yyyy')


class Gvg extends React.Component {

    // TOAST DU COMPOSANT 
    notify_errorPlayer = () => toast.error("More players needed");
    notify_errorTeam = () => toast("Choose your Ennemy !");
    notify_errorHour = () => toast.error("Choose hour between 0 and 12");
    notify_errorMinutes = () => toast.error("Choose minutes between 0 and 59");
    notify_errorDate = () => toast.error("Choose the date of the war !");


    notify_errorDate_1 = () => toast.error("Month must be between 1 and 12")
    notify_errorDate_2 = () => toast.error("Special caractere must be /")
    notify_errorDate_3 = () => toast.error("Day must be between 1 and 31")
    notify_errorDate_4 = () => toast.error("Must be between 2021 and 2024")
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTEUR DU COMPOSANT
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor_hour: 'white',
            backgroundColor_minutes: 'white',
            backgroundColor_date: 'white',
            backgroundColor_players: 'white',
            isConnected: false, ennemy_team: '',
            hour: '10',
            minutes: '00',
            date: '',
            players: 0,
            ennemy_guilds: [],
            selectedValue: '',
            AMPM: 'PM',
            resetForm: false };

        this.handleEnnemyTeam = this.handleEnnemyTeam.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handlePlayers = this.handlePlayers.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleMinutes = this.handleMinutes.bind(this);
        this.handleAMPM = this.handleAMPM.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    // CALL API DU COMPOSANT
    // TROUVE LES GUILDES CONTRE QUI ON PEUT WAR
    async findEnnemyGuilds(){
        await fetch('http://localhost:5000/api/v1/findGuildWhoAreNotInMyFaction', {
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
                this.setState({ ennemy_guilds: response })
        })
    }

    // COMPOSANT AU BOOT DE LA PAGE
    componentDidMount = () => {
        this.findEnnemyGuilds() // FONCTION QUI RETOURNE LES GUILDES QU'ON PEUT DUEL
    }

    // COMPOSANT QUI UPDATE LE RENDER
    componentDidUpdate(prevProps, prevState){
        if (prevState.selectedValue !== this.state.selectedValue)
        {        
            this.changeBgColorFaction(this.state.selectedValue)
        }
        if (prevState.warAcceptOrRefuse !== this.state.warAcceptOrRefuse){
            return <WarAcceptOrRefuse />
        }
        if (prevState.resetForm !== this.state.resetForm){
            this.resetWarForm()
            this.setState({
                resetForm: false
            })
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////


    // FONCTION DU COMPOSANT

    // FONCTION QUI RESET LE FORMULAIRE
    resetWarForm(){
        this.changeBgColor()
        this.setState({
            ennemy_team: '', 
            hour: '10', 
            minutes: '00', 
            date: '', 
            players: 0,  
            selectedValue: '',
            AMPM: 'PM'
        })
    }

    // Fonction qui update le state de la couleur
    changeBgColorFaction(e) {
        if (e === "Covenant") {
            this.setState({
                backgroundColor_option: '#ca8c00',
                color_option: 'white'
            })
        }
        else if (e === "Syndicate") {
            this.setState({
                backgroundColor_option: '#580258',
                color_option: 'white'
            })
        }
        else if (e === "Marauders") {
            this.setState({
                backgroundColor_option: 'rgb(5, 143, 5)',
                color_option: 'white'
            })
        }
    }

    // Met le champ "players" en rouge
    changeBgColorPlayers(){
        this.setState({
            backgroundColor_players: 'crimson',
            color_hour: 'white'
        })
    }

    // Met le champ "Date" en rouge
    changeBgColorDate(){
        this.setState({
            backgroundColor_date: 'crimson',
            color_hour: 'white'
        })
    }
    
    // Met le champ "Hour" en rouge
    changeBgColorHour(){
        this.setState({
            backgroundColor_hour: 'crimson',
            color_hour: 'white'
        })
    }

    // Met le champ "Minutes" en rouge
    changeBgColorMinutes(){
        this.setState({
            backgroundColor_minutes: 'crimson',
            color_minutes: 'white'
        })
    }

    // MES HANDLES INPUT DU FORM
    handleEnnemyTeam(event) {
        this.setState({ ennemy_team: event.target.value });
        console.log(this.state.ennemy_team)
    }

    handleHour(event) {
        this.setState({ hour: event.target.value });
        console.log(this.state.hour)
    }

    handleAMPM(event) {
        this.setState({ AMPM: event.target.value });
        console.log(this.state.hour)
    }

    handleMinutes(event) {
        this.setState({ minutes: event.target.value });
        console.log(this.state.minutes)
    }

    handleDate(event) {
        this.setState({ date: event.target.value });
        console.log(this.state.date)
    }

    handlePlayers(event) {
        this.setState({ players: event.target.value });
        console.log(this.state.players)
    }

    handleSelectChange(event) {
        this.splitNameAndFaction(event.target.value)
        this.setState({ selectedValue: info_guild[0], ennemy_team: info_guild[1] });
    }

    handleSubmit = (event) => {
        // Check les erreurs sur le formulaire
        if (this.state.ennemy_team === ''){
            this.notify_errorTeam()
            console.log("Aucune équipe choisit")
        }
        else if (this.state.hour === '' || this.state.hour < 0 || this.state.hour > 12){
            this.notify_errorHour()
            console.log("Aucune heure choisit")
            this.changeBgColorHour()
            console.log(this.state.hour)
        }
        else if (this.state.minutes === '' || this.state.minutes < 0 || this.state.minutes > 59){
            this.notify_errorMinutes()
            console.log("Aucune minutes choisit")
            this.changeBgColorMinutes()
        }
        else if (this.state.date === ''){
            this.notify_errorDate()
            this.changeBgColorDate()
            console.log("Aucune date choisit")
        }        
        else if (this.state.date.substr(0, 2) < 1 || this.state.date.substr(0, 2) > 12){
            this.notify_errorDate_1()
            this.changeBgColorDate()
            console.log("Les 2 premiers chiffres sont mauvais")
        }
        else if (this.state.date.substr(2, 1) !== "/"){
            this.notify_errorDate_2()
            this.changeBgColorDate()
            console.log("la 3eme lettre n'est pas /")
        }
        else if (this.state.date.substr(3, 2) < 1 || this.state.date.substr(3, 2) > 31){
            this.notify_errorDate_3()
            this.changeBgColorDate()
            console.log("la lettre 4 & 5 (jours) n'est pas entre 1 et 31")
        }
        else if (this.state.date.substr(5, 1) !== "/"){
            this.notify_errorDate_2()
            this.changeBgColorDate()
            console.log("la 5eme lettre n'est pas /")
        }
        else if (this.state.date.substr(6, 4) < 2021 || this.state.date.substr(6, 4) > 2024){
            this.notify_errorDate_4()
            this.changeBgColorDate()
            console.log("l'année ne se situe pas entre 2021 & 2024 ")
        }
        else if (this.state.players <= 0){
            this.notify_errorPlayer()
            this.changeBgColorPlayers()
            console.log("Nécessite + de joueurs")
        }
        // SI tout est ok, appel API
        else{
            
            fetch('http://localhost:5000/api/v1/declareWarTo', {
                method: "POST",
                body: JSON.stringify({
                    "guild_proposeur" : this.props.Login,
                    "guild_attaquer": this.state.ennemy_team,
                    "lieu": "",
                    "heure": this.state.hour + ':' + this.state.minutes + ' ' + this.state.AMPM,
                    "date_war": this.state.date,
                    "nombreJoueurs": this.state.players
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(response => {
                // SI OK ...
            if(response){
                this.setState({ resetForm: true})
            }
            }) 
        }
        // event.preventDefault();
    }
    ///////////////////////////////////////////////////////////

    // Fonction qui split la value du select de la guild à war afin de pouvoir récupérer faction & nom de la guilde
    splitNameAndFaction(phrase){
        info_guild = phrase.split("-")
        console.log(info_guild[0]) // Faction
        console.log(info_guild[1]) // Guild Name
    }

    // Change l'input en bg white si crimson
    changeBgColor(){
        if (this.state.backgroundColor_date !== 'white'){
            this.setState({
                backgroundColor_date: 'white'
            })
        }
        else if (this.state.backgroundColor_hour !== 'white'){
            this.setState({
                backgroundColor_hour: 'white'
            })
        }
        else if (this.state.backgroundColor_minutes !== 'white'){
            this.setState({
                backgroundColor_minutes: 'white'
            })
        }
        else if (this.state.backgroundColor_players !== 'white'){
            
            this.setState({
                backgroundColor_players: 'white'
            })
        }
    }
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    render() {
        if (!this.props.ConnectState) {
            return <Login />
        }
        else {
            return (
                <div className="main">
                <div className="main-gvg">
                    <ToastContainer hideProgressBar={false} autoClose={3000} position="top-center" />
                    <form className="form-display-gvg">
                        <h1 className="title-form">Guild Vs Guild <br /><hr className="hr-form" />Propose War</h1>
                        <label className="label-name-gvg label">Declare war to :</label>
                        <select style={{ backgroundColor: this.state.backgroundColor_option, color: this.state.color_option }} className="gvg-select input-css first-gvg-option" onChange={this.handleSelectChange}>
                            <option selected disabled style={{backgroundColor: 'white'}}> Choose Guild</option>
                            {this.state.ennemy_guilds.map(function (ennemy_guild) {
                                if (ennemy_guild.faction === 'Syndicate') {
                                    return <option key={ennemy_guild.id} className="syndicate-option" value={ennemy_guild.faction + '-' + ennemy_guild.nom}>{ennemy_guild.nom}</option>
                                }
                                else if (ennemy_guild.faction === 'Marauders') {
                                    return <option key={ennemy_guild.id} className="marauder-option" value={ennemy_guild.faction + '-' + ennemy_guild.nom}>{ennemy_guild.nom}</option>
                                }
                                else if (ennemy_guild.faction === 'Covenant') {
                                    return <option key={ennemy_guild.id} className="covenant-option" value={ennemy_guild.faction + '-' + ennemy_guild.nom}>{ennemy_guild.nom}</option>
                                }
                            })
                            }
                        </select>
                        <br />
                        <label className="label label-password">AM/PM :</label>
                        <select style={{ backgroundColor: this.state.backgroundColor }} className="input-css-gvg-ampm firefox-margin-bottom" type="number" value={this.state.value} onChange={this.handleAMPM}>
                            <option value="AM">AM</option>
                            <option selected value="PM">PM</option> 
                        </select>
                        <br />
                        <div className="flexbox-hour">
                            <div className="flexbox-display"><label className="label">Hour :</label>
                                <input style={{ backgroundColor: this.state.backgroundColor_hour }} placeholder="Type Hour" className="input-css-gvg-hour firefox-margin-bottom" type="number" value={this.state.hour} onChange={this.handleHour} onFocus={ () => this.changeBgColor() }/>
                            </div>
                            <div className="flexbox-display"><label className="label">Minutes :</label>
                                <input style={{ backgroundColor: this.state.backgroundColor_minutes }} placeholder="Type Minutes" className="input-css-gvg-hour firefox-margin-bottom" type="number" value={this.state.minutes} onChange={this.handleMinutes} onFocus={ () => this.changeBgColor() }/>
                            </div>
                        </div>
                        <br />
                        <label className="label label-password firefox-margin-top">Date : MM/DD/YYYY ({date})</label>
                        <input style={{ backgroundColor: this.state.backgroundColor_date }} className="input-css-gvg firefox-margin-bottom" type="datetime" placeholder="MM/DD/YYYY" value={this.state.date} onChange={this.handleDate} onFocus={ () => this.changeBgColor() }/>
                        <br />
                        <label className="label label-password" >Players :</label>
                        <input style={{ backgroundColor: this.state.backgroundColor_players }} placeholder="(Example : 25 for 25vs25)" className="input-css-gvg firefox-margin-bottom" type="number" max="100" min="1" value={this.state.players} onChange={this.handlePlayers} onFocus={ () => this.changeBgColor() } />
                        <br />
                        <input className="btn-submit-gvg" type="submit" value="Declare War !" onClick={this.handleSubmit} />
                    </form>
                </div>
                    <WarWaiting />
                    <WarAcceptOrRefuse />
                </div>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gvg));