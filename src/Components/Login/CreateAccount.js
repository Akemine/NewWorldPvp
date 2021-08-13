import '../../Styles/Login/Login.css'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react';
import MainContent from '../MainContent/MainContent';

import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns'

import DateFunction from '../DateFunction'

let guild_name = ""
let password = ""
let faction = ""

const txt_title = "CREATE MY GUILD"
class CreateAccount extends React.Component {

    // TOAST DU COMPOSANT 
    notify_error_guildName_maximum = () => toast.error("Guild name must be 15 caractere maximum");
    notify_error_guildName_minimum = () => toast.error("Guild name must be 3 caractere minimum");
    notify_error_guildName_alreadyExist = (guildName) => toast.error("Guild Name : "+ guildName + " already exist");
    notify_error_password_maximum = () => toast.error("Password must be 15 caractere maximum");
    notify_error_password_minimum = () => toast.error("Password must be 8 caractere minimum");
    notify_error_pseudo_maximum = () => toast.error("Pseudo must be 15 caractere maximum");
    notify_error_pseudo_minimum = () => toast.error("Pseudo must be 3 caractere minimum");
    notify_error_pseudo_alreadyExist = (pseudo) => toast.error("Pseudo : "+ pseudo + " already exist");
    notify_error_faction = () => toast.error("You have to choose your faction");
    testNotif = () => toast("Test Notif");

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            guild_name: '',
            faction: '',
            password: '',
            pseudo: '',
            badConnection: false,
            backgroundColor: 'white',
            backgroundColorForm: '',
            colorFaction: '',
            backgroundColorSubmit: '',
            server: 'Kvenland',
            backgroundColorGuildName: '',
            colorGuildName: '',
            backgroundColorPassword: '',
            colorPassword: '',
            backgroundColorPseudo: '',
            colorPseudo: '',
            accountData: [],
            addressData: [],
            ipAlreadyUsed: true
        };

        this.handleGuildName = this.handleGuildName.bind(this)
        this.handlePseudo = this.handlePseudo.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFaction = this.handleFaction.bind(this);
        this.handleServer = this.handleServer.bind(this);
    }

    changeBgColor() {
        this.setState({
            backgroundColor: 'white'
        })
    }

    handlePseudo(event) {
        this.setState({ pseudo: event.target.value });
    }

    handleGuildName(event) {
        this.setState({ guild_name: event.target.value });
        console.log(this.state.guild_name.length)
    }


    handlePassword(event) {
        this.setState({ password: event.target.value });
        console.log(this.state.password.length)
    }

    handleServer(event) {
        this.setState({ server: event.target.value });
    }

    handleFaction(event) {
        this.setState({ faction: event.target.value });
        if (event.target.value === "Marauders") {
            this.setState({ backgroundColorForm: '#1ce01c1c', backgroundColorFaction: 'rgb(87, 222, 87)', colorFaction: 'white', backgroundColorSubmit: 'rgb(87, 222, 87)' });
        }
        if (event.target.value === "Syndicate") {
            this.setState({ backgroundColorForm: '#80008040', backgroundColorFaction: 'rgb(72 5 72)', colorFaction: 'white', backgroundColorSubmit: 'rgb(72 5 72)' });
        }
        if (event.target.value === "Covenant") {
            this.setState({ backgroundColorForm: '#ca8c002e', backgroundColorFaction: '#ca8c00', colorFaction: 'white', backgroundColorSubmit: '#ca8c00' });
        }
    }

    changeColor = () => {
        if(this.state.faction === ''){
            this.setState({
                backgroundColorFaction: 'white',
                colorFaction: 'black',
                backgroundColorGuildName: 'white',
                colorGuildName: 'black',
                backgroundColorPassword: 'white',
                colorPassword: 'black',
                backgroundColorPseudo: 'white',
                colorPseudo: 'black'
            })
        }
        else {
            this.setState({
                backgroundColorGuildName: 'white',
                colorGuildName: 'black',
                backgroundColorPassword: 'white',
                colorPassword: 'black',
                backgroundColorPseudo: 'white',
                colorPseudo: 'black'
            })
        }

    }

    async getAccount() {
        await axios.get('http://54.37.74.45:5000/api/v1/getAccount')
            .then(res => {
                const accountData = res.data;
                this.setState({ accountData });
            })
    }
    async getAddress() {
        await axios.get('http://54.37.74.45:5000/api/v1/getAddress')
            .then(res => {
                const addressData = res.data;
                this.setState({ addressData });
            })
    }


    handleSubmit = (event) => {
        console.log(this.state.ip)
        console.log(this.state.addressData)
        if (this.state.faction === '') {
            this.notify_error_faction()
            this.setState({ backgroundColorFaction: 'crimson'})
            event.preventDefault();
        }
        else if (this.state.guild_name === '' || this.state.guild_name.length >= 16) {
            this.notify_error_guildName_maximum()
            this.setState({ backgroundColorGuildName: 'crimson', colorGuildName: 'white' })
            event.preventDefault();
        }
        else if (this.state.guild_name.length <= 2) {
            this.notify_error_guildName_minimum()
            this.setState({ backgroundColorGuildName: 'crimson', colorGuildName: 'white' })
            event.preventDefault();
        }
        else if (this.state.password === '' || this.state.password.length >= 16) {
            this.notify_error_password_maximum()
            this.setState({ backgroundColorPassword: 'crimson', colorPassword: 'white' })
            event.preventDefault();
        }
        else if (this.state.password.length <= 7) {
            this.notify_error_password_minimum()
            this.setState({ backgroundColorPassword: 'crimson', colorPassword: 'white' })
            event.preventDefault();
        }
        else if (this.state.pseudo === '' || this.state.pseudo.length >= 16) {
            this.notify_error_pseudo_maximum()
            this.setState({ backgroundColorPseudo: 'crimson', colorPseudo: 'white' })
            event.preventDefault();
        }
        else if (this.state.pseudo.length <= 2) {
            this.notify_error_pseudo_minimum()
            this.setState({ backgroundColorPseudo: 'crimson', colorPseudo: 'white' })
            event.preventDefault();
        }
        else if (this.state.pseudo.length <= 16 && this.state.pseudo.length >= 2) {
            let flag_pseudo = false
            let flag_guild_name = false
            this.state.accountData.forEach(el => {
                if(this.state.pseudo === el.pseudo){
                    flag_pseudo = true
                    event.preventDefault();
                }
                if(this.state.guild_name === el.guild_name){
                    flag_guild_name = true
                    event.preventDefault();
                }
                
            })
            if (flag_pseudo){
                this.setState({ backgroundColorPseudo: 'crimson', colorPseudo: 'white' })
                this.notify_error_pseudo_alreadyExist(this.state.pseudo)
            }
            if (flag_guild_name){
                this.setState({ backgroundColorGuildName: 'crimson', colorGuildName: 'white' })
                this.notify_error_guildName_alreadyExist(this.state.guild_name)
            }
            if (!flag_guild_name && !flag_pseudo){
                fetch('http://54.37.74.45:5000/api/v1/createNewAccount', {
                    method: "POST",
                    body: JSON.stringify({
                        "pseudo": this.state.pseudo,
                        "guild_name": this.state.guild_name,
                        "password": this.state.password,
                        "faction": this.state.faction,
                        "server": this.state.server,
                        "ip" : this.state.ip.ip, 
                        "country_code" : this.state.ip.country_code,
                        "country_name" : this.state.ip.country_name,
                        "latitude" : this.state.ip.latitude,
                        "longitude" : this.state.ip.longitude,
                        "timestamp" : format(new Date(), 'MM/dd/yyyy')
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response) {
                            guild_name = this.state.guild_name
                            password = this.state.password
                            faction = this.state.faction
                            this.props.Logged()
                        }
                    })
            }
            
        }
        event.preventDefault();
    }

    componentDidMount() {
        this.getAccount()
        this.getDataFromIP()
        this.getAddress()
        this.checkIP()
    }

    componentDidUpdate(prevProps, prevState){
    }

    async getDataFromIP() {
        await axios.get('https://geolocation-db.com/json/')
        .then(res => {
            const ip = res.data;
            this.setState({ ip });
        })
      }

      checkIP(){
        let date = new Date()
        this.state.addressData.forEach(el => {
            if (el.ip === this.state.ip.IPv4){
                let diffDate = DateFunction.getDifferenceInDays(date, date)
                if(diffDate > 3.0){
                    this.setState({ipAlreadyUsed: true})
                }
            }
        })
            return this.displayFormDisabled()
      }

      displayFormDisabled(){
          return( <div>
            <ToastContainer hideProgressBar={false} autoClose={5000} position="top-center" />
            <form className="form-display" style={{ backgroundColor: this.state.backgroundColorForm, transition: '0.5s' }}>
                <h1 className="title-form">{txt_title}</h1><hr className="hr-form" />
                <h3 className="title-form" style={{backgroundColor: 'crimson', padding: '4px', borderRadius: '4px'}}>You have to wait to create new guild.</h3><hr className="hr-form" />
                <div className="flexbox-display" style={{ width: '80%' }}>
                    <label className="label label-password label-form-bottom">Faction :</label>
                    <select disabled style={{ backgroundColor: this.state.backgroundColorFaction, color: this.state.colorFaction }} className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleFaction} onClick={this.changeColor}>
                        <option selected disabled value="null">Choose your faction</option>
                    </select>
                </div>
                <label className="label-name label">Guild name :</label>
                <input disabled style={{ backgroundColor: this.state.backgroundColorGuildName, color: this.state.colorGuildName }} placeholder="Type your Guild Name" className="input-css createaccount-css" type="text" value={this.state.guild_name} onChange={this.handleGuildName} onClick={this.changeColor} />
                <label className="label label-password" >Password :</label>
                <input disabled style={{ backgroundColor: this.state.backgroundColorPassword, color: this.state.colorPassword }} placeholder="Type your password" className="input-css createaccount-css" type="password" value={this.state.password} onChange={this.handlePassword} onClick={this.changeColor}/>
                <label className="label label-password" >Pseudo (Guild Master) :</label>
                <input disabled style={{ backgroundColor: this.state.backgroundColorPseudo, color: this.state.colorPseudo }} placeholder="Type your Pseudo" className="input-css createaccount-css" type="text" max="20" value={this.state.value} onChange={this.handlePseudo} onClick={this.changeColor}/>
                <div className="flexbox-display " style={{ width: '80%', marginBottom: '2%' }}>
                    <label className="label label-password label-form-bottom">Server :</label>
                    <select disabled style={{ backgroundColor: this.state.backgroundColor, color: this.state.color }} className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleServer}>
                        <option disabled selected value="Kvenland">Kvenland</option>
                    </select>
                </div>
                <input disabled style={{ backgroundColor: this.state.backgroundColorSubmit, transition: '0.5s', color: this.state.colorFaction }} className="btn-submit" type="submit" value="Create my guild !" onClick={this.handleSubmit} />
            </form>
        </div>)
      }
    render() {
        if (this.props.ConnectState) {
            return <MainContent />
        }
        else {
            if(this.state.ipAlreadyUsed){
                return this.displayFormDisabled()
            }
            else{
                return (
                    <div>
                        <ToastContainer hideProgressBar={false} autoClose={5000} position="top-center" />
                        <form className="form-display" style={{ backgroundColor: this.state.backgroundColorForm, transition: '0.5s' }}>
                            <h1 className="title-form">{txt_title}</h1><hr className="hr-form" />
                            <div className="flexbox-display" style={{ width: '80%' }}>
                                <label className="label label-password label-form-bottom">Faction :</label>
                                <select style={{ backgroundColor: this.state.backgroundColorFaction, color: this.state.colorFaction }} className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleFaction} onClick={this.changeColor}>
                                    <option selected disabled value="null">Choose your faction</option>
                                    <option value="Marauders">Marauders</option>
                                    <option value="Syndicate">Syndicate</option>
                                    <option value="Covenant">Covenant</option>
                                </select>
                            </div>
                            <label className="label-name label">Guild name :</label>
                            <input style={{ backgroundColor: this.state.backgroundColorGuildName, color: this.state.colorGuildName }} placeholder="Type your Guild Name" className="input-css createaccount-css" type="text" value={this.state.guild_name} onChange={this.handleGuildName} onClick={this.changeColor} />
                            <label className="label label-password" >Password :</label>
                            <input style={{ backgroundColor: this.state.backgroundColorPassword, color: this.state.colorPassword }} placeholder="Type your password" className="input-css createaccount-css" type="password" value={this.state.password} onChange={this.handlePassword} onClick={this.changeColor}/>
                            <label className="label label-password" >Pseudo (Guild Master) :</label>
                            <input style={{ backgroundColor: this.state.backgroundColorPseudo, color: this.state.colorPseudo }} placeholder="Type your Pseudo" className="input-css createaccount-css" type="text" max="20" value={this.state.value} onChange={this.handlePseudo} onClick={this.changeColor}/>
                            <div className="flexbox-display " style={{ width: '80%', marginBottom: '2%' }}>
                                <label className="label label-password label-form-bottom">Server :</label>
                                <select style={{ backgroundColor: this.state.backgroundColor, color: this.state.color }} className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleServer}>
                                    <option selected value="Kvenland">Kvenland</option>
                                    <option value="Yoris">Yoris</option>
                                </select>
                            </div>
                            <input style={{ backgroundColor: this.state.backgroundColorSubmit, transition: '0.5s', color: this.state.colorFaction }} className="btn-submit" type="submit" value="Create my guild !" onClick={this.handleSubmit} />
                        </form>
                    </div>
                )
            }
            
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
        Logged: isConnected => {
            dispatch({ type: "USER_CONNECTED", ConnectState: true, Login: guild_name, Faction: faction, Password: password, Role: 'guild', Banned: false })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccount));
