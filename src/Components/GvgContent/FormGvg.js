import '../../Styles/GvgContent/Gvg.css'
import '../../Styles/Login/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns'


let info_guild = ''
let date = format(new Date(), 'MM/dd/yyyy')


class FormGvg extends React.Component {

    // TOAST DU COMPOSANT 
    notify_errorPlayer = () => toast.error("More players needed");
    notify_errorTeam = () => toast.error("Choose your Ennemy !");
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
            lieu: 'First Light',
            date: format(new Date(), 'MM/dd/yyyy'),
            players: 20,
            ennemy_guilds: [],
            selectedValue: '',
            AMPM: 'PM',
            resetForm: false
        };

        this.handleEnnemyTeam = this.handleEnnemyTeam.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handlePlayers = this.handlePlayers.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleMinutes = this.handleMinutes.bind(this);
        this.handleAMPM = this.handleAMPM.bind(this);
        this.handleLieu = this.handleLieu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    // CALL API DU COMPOSANT
    // TROUVE LES GUILDES CONTRE QUI ON PEUT WAR
    async findEnnemyGuilds() {
        await fetch('http://54.37.74.45:5000/api/v1/findGuildWhoAreNotInMyFaction', {
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
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedValue !== this.state.selectedValue) {
            this.changeBgColorFaction(this.state.selectedValue)
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////


    // FONCTION DU COMPOSANT

    // FONCTION QUI RESET LE FORMULAIRE
    resetWarForm() {
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
                backgroundColor_option: '#237723',
                color_option: 'white'
            })
        }
    }

    // Met le champ "players" en rouge
    changeBgColorPlayers() {
        this.setState({
            backgroundColor_players: 'crimson',
            color_hour: 'white'
        })
    }

    // Met le champ "Date" en rouge
    changeBgColorDate() {
        this.setState({
            backgroundColor_date: 'crimson',
            color_hour: 'white'
        })
    }

    // Met le champ "Hour" en rouge
    changeBgColorHour() {
        this.setState({
            backgroundColor_hour: 'crimson',
            color_hour: 'white'
        })
    }

    // Met le champ "Minutes" en rouge
    changeBgColorMinutes() {
        this.setState({
            backgroundColor_minutes: 'crimson',
            color_minutes: 'white'
        })
    }

    // MES HANDLES INPUT DU FORM
    handleEnnemyTeam(event) {
        this.setState({ ennemy_team: event.target.value });
    }

    handleHour(event) {
        this.setState({ hour: event.target.value });
    }

    handleAMPM(event) {
        this.setState({ AMPM: event.target.value });
    }

    handleMinutes(event) {
        this.setState({ minutes: event.target.value });
    }

    handleDate(event) {
        this.setState({ date: event.target.value });
    }

    handlePlayers(event) {
        this.setState({ players: event.target.value });
    }

    handleLieu(event) {
        this.setState({ lieu: event.target.value });
    }

    handleSelectChange(event) {
        this.splitNameAndFaction(event.target.value)
        this.setState({ selectedValue: info_guild[0], ennemy_team: info_guild[1] });
    }

    handleSubmit = (event) => {
        // Check les erreurs sur le formulaire
        if (this.state.ennemy_team === '') {
            this.notify_errorTeam()
            console.log("Aucune équipe choisit")
            event.preventDefault();
        }
        else if (this.state.hour === '' || this.state.hour < 0 || this.state.hour > 12) {
            this.notify_errorHour()
            console.log("Aucune heure choisit")
            event.preventDefault();
            this.changeBgColorHour()
        }
        else if (this.state.minutes === '' || this.state.minutes < 0 || this.state.minutes > 59) {
            this.notify_errorMinutes()
            console.log("Aucune minutes choisit")
            event.preventDefault();
            this.changeBgColorMinutes()
        }
        else if (this.state.date === '') {
            this.notify_errorDate()
            this.changeBgColorDate()
            console.log("Aucune date choisit")
            event.preventDefault();
        }
        else if (this.state.date.substr(0, 2) < 1 || this.state.date.substr(0, 2) > 12) {
            this.notify_errorDate_1()
            this.changeBgColorDate()
            console.log("Les 2 premiers chiffres sont mauvais")
            event.preventDefault();
        }
        else if (this.state.date.substr(2, 1) !== "/") {
            this.notify_errorDate_2()
            this.changeBgColorDate()
            console.log("la 3eme lettre n'est pas /")
            event.preventDefault();
        }
        else if (this.state.date.substr(3, 2) < 1 || this.state.date.substr(3, 2) > 31) {
            this.notify_errorDate_3()
            this.changeBgColorDate()
            console.log("la lettre 4 & 5 (jours) n'est pas entre 1 et 31")
            event.preventDefault();
        }
        else if (this.state.date.substr(5, 1) !== "/") {
            this.notify_errorDate_2()
            this.changeBgColorDate()
            console.log("la 5eme lettre n'est pas /")
            event.preventDefault();
        }
        else if (this.state.date.substr(6, 4) < 2021 || this.state.date.substr(6, 4) > 2022) {
            this.notify_errorDate_4()
            this.changeBgColorDate()
            console.log("l'année ne se situe pas entre 2021 & 2022 ")
            event.preventDefault();
        }
        else if (this.state.players <= 0) {
            this.notify_errorPlayer()
            this.changeBgColorPlayers()
            console.log("Nécessite + de joueurs")
            event.preventDefault();
        }
        // SI tout est ok, appel API
        else {
            // console.log(this.props.Login)
            // console.log(this.state.ennemy_team)
            // console.log(this.state.lieu)
            // console.log(this.state.hour + ':' + this.state.minutes + ' ' + this.state.AMPM)
            // console.log(this.state.date)
            // console.log(this.state.players)
            event.preventDefault();
            fetch('http://54.37.74.45:5000/api/v1/declareWarTo', {
                method: "POST",
                body: JSON.stringify({
                    "guild_proposeur": this.props.Login,
                    "guild_attaquer": this.state.ennemy_team,
                    "lieu": this.state.lieu,
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
                if (response) {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
                    window.location.reload()
                    this.setState({ resetForm: true })
                }
                else {
                    event.preventDefault();
                }
            })
        }
        // event.preventDefault();
    }
    ///////////////////////////////////////////////////////////

    // Fonction qui split la value du select de la guild à war afin de pouvoir récupérer faction & nom de la guilde
    splitNameAndFaction(phrase) {
        info_guild = phrase.split("-")
        console.log(info_guild[0]) // Faction
        console.log(info_guild[1]) // Guild Name
    }

    // Change l'input en bg white si crimson
    changeBgColor() {
        if (this.state.backgroundColor_date !== 'white') {
            this.setState({
                backgroundColor_date: 'white'
            })
        }
        else if (this.state.backgroundColor_hour !== 'white') {
            this.setState({
                backgroundColor_hour: 'white'
            })
        }
        else if (this.state.backgroundColor_minutes !== 'white') {
            this.setState({
                backgroundColor_minutes: 'white'
            })
        }
        else if (this.state.backgroundColor_players !== 'white') {

            this.setState({
                backgroundColor_players: 'white'
            })
        }
    }
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    render() {
        return (
            <form className="form-display-gvg">
                <h1 className="title">DECLARE WAR</h1>
                <label className="label-name-gvg label bold-txt">Declare war to :</label>
                    <div className="select " style={{width: "80%"}}>
                        <select style={{ backgroundColor: this.state.backgroundColor_option, color: this.state.color_option }} className="gvg-select input-css first-gvg-option select-text" onChange={this.handleSelectChange}>
                            <option selected disabled style={{ backgroundColor: 'white' }}> Choose Guild</option>
                            {this.state.ennemy_guilds.map(function (ennemy_guild) {
                                if (ennemy_guild.faction === 'Syndicate') {
                                    return <option key={ennemy_guild.id} className="syndicate-option" value={ennemy_guild.faction + '-' + ennemy_guild.guild_name}>{ennemy_guild.guild_name}</option>
                                }
                                else if (ennemy_guild.faction === 'Marauders') {
                                    return <option key={ennemy_guild.id} className="marauder-option" value={ennemy_guild.faction + '-' + ennemy_guild.guild_name}>{ennemy_guild.guild_name}</option>
                                }
                                else if (ennemy_guild.faction === 'Covenant') {
                                    return <option key={ennemy_guild.id} className="covenant-option" value={ennemy_guild.faction + '-' + ennemy_guild.guild_name}>{ennemy_guild.guild_name}</option>
                                }
                            })
                            }
                        </select>
                    </div>
                <label className="label-name-gvg label bold-txt firefox-margin-top label-form-bottom">Date : MM/DD/YYYY ({date})</label>
                <input style={{ backgroundColor: this.state.backgroundColor_date }} className="input-css-gvg firefox-margin-bottom form-m-b" type="datetime" placeholder="MM/DD/YYYY" value={this.state.date} onChange={this.handleDate} onFocus={() => this.changeBgColor()} />
                
                <label className="label label-password bold-txt label-form-bottom">Zone :</label>
                <select style={{ backgroundColor: this.state.backgroundColor }} className="input-css-gvg-ampm firefox-margin-bottom form-m-b" value={this.state.value} onChange={this.handleLieu}>
                            <option selected value="First Light">First Light</option>
                            <option value="Brightwood">Brightwood</option>
                </select>
                <div className="display-row form-m-b"> 
                    <div className="flexbox-hour">
                        <div className="flexbox-display"><label className="label bold-txt label-form-bottom">Hour :</label>
                            <input style={{ backgroundColor: this.state.backgroundColor_hour }} placeholder="Hour" className="input-css-gvg-hour firefox-margin-bottom form-m-b" type="number" value={this.state.hour} onChange={this.handleHour} onFocus={() => this.changeBgColor()} />
                        </div>
                        <div className="flexbox-display"><label className="label bold-txt label-form-bottom">Minutes :</label>
                            <input style={{ backgroundColor: this.state.backgroundColor_minutes }} placeholder="Minute" className="input-css-gvg-hour firefox-margin-bottom form-m-b" type="number" value={this.state.minutes} onChange={this.handleMinutes} onFocus={() => this.changeBgColor()} />
                        </div>
                    </div>
                    <div>
                        <div className="flexbox-display">
                            <label className="label label-password bold-txt label-form-bottom" >AM/PM :</label>
                            <select style={{ backgroundColor: this.state.backgroundColor, width: '100%' }} className="input-css-gvg-lieu firefox-margin-bottom form-m-b" value={this.state.value} onChange={this.handleAMPM}>
                                <option value="AM">AM</option>
                                <option selected value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <label className="label label-password bold-txt label-form-bottom" >Team size :</label>
                <input style={{ backgroundColor: this.state.backgroundColor_players }} placeholder="(Example : 25 for 25vs25)" className="input-css-gvg firefox-margin-bottom form-m-b" type="number" max="100" min="1" value={this.state.players} onChange={this.handlePlayers} onFocus={() => this.changeBgColor()} />
                <input className="btn-submit-gvg" type="submit" value="Declare War !" onClick={this.handleSubmit} />
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormGvg));