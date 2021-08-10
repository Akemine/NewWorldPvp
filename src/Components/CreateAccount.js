import '../Styles/Login.css'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react';
import MainContent from './MainContent/MainContent'



let guild_name = ""
let password = ""

const txt_title = "CREATE MY GUILD"
class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isConnected: false, guild_name: '', password: '', pseudo: '', badConnection: false, backgroundColor: 'white', backgroundColorForm: '', faction: '', colorFaction: '', backgroundColorSubmit: '', server: 'Kvenland' };

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
    }


    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleServer(event) {
        this.setState({ server: event.target.value });
    }

    handleFaction(event) {
        this.setState({ faction: event.target.value });
        if (event.target.value === "Marauders") {
            this.setState({ backgroundColorForm: '#1ce01c1c', backgroundColor: 'rgb(87, 222, 87)', colorFaction: 'white', backgroundColorSubmit: 'rgb(87, 222, 87)' });
        }
        if (event.target.value === "Syndicate") {
            this.setState({ backgroundColorForm: '#80008040', backgroundColor: 'rgb(72 5 72)', colorFaction: 'white', backgroundColorSubmit: 'rgb(72 5 72)' });
        }
        if (event.target.value === "Covenant") {
            this.setState({ backgroundColorForm: '#ca8c002e', backgroundColor: '#ca8c00', colorFaction: 'white', backgroundColorSubmit: '#ca8c00' });
        }
    }


    handleSubmit = (event) => {
        fetch('http://localhost:5000/api/v1/createNewAccount', {
            method: "POST",
            body: JSON.stringify({
                "pseudo": this.state.pseudo,
                "guild_name": this.state.guild_name,
                "password": this.state.password,
                "faction": this.state.faction,
                "server": this.state.server
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
                    this.props.Logged()
                }
                else {
                    this.setState({ badConnection: true, backgroundColor: 'crimson' })
                }
            })

        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Login !== this.props.Login) {
            this.props.history.push('/leaderboard');
        }
    }

    render() {
        if (this.props.ConnectState) {
            return <MainContent />
        }
        else if (this.state.badConnection) {
            return (
                <div>
                    <form className="form-display">
                        <h1 className="title-form">{txt_title}</h1><hr className="hr-form" />

                        <label className="label-name label">Guild name :</label>
                        <input style={{ backgroundColor: this.state.backgroundColor }} placeholder="Type your Guild Name" className="input-css-error" type="text" value={this.state.value} onChange={this.handlePseudo} onFocus={() => this.changeBgColor()} />
                        <label className="label label-password" >Password :</label>
                        <input style={{ backgroundColor: this.state.backgroundColor }} placeholder="Type your password" className="input-css-error" type="password" value={this.state.value} onChange={this.handlePassword} onFocus={() => this.changeBgColor()} />
                        <input className="btn-submit" type="submit" value="Connection to my guild" onClick={this.handleSubmit} />
                    </form>
                </div>
            )
        }
        else if (!this.props.ConnectState) {
            return (
                
                <div>
                    <form className="form-display" style={{ backgroundColor: this.state.backgroundColorForm, transition: '0.5s' }}>
                        <h1 className="title-form">{txt_title}</h1><hr className="hr-form" />
                        <div className="flexbox-display" style={{ width: '80%' }}>
                            <label className="label label-password label-form-bottom">Faction :</label>
                            <select style={{ backgroundColor: this.state.backgroundColor, color: this.state.colorFaction }} className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleFaction}>
                                <option selected disabled value="null">Choose your faction</option>
                                <option value="Marauders">Marauders</option>
                                <option value="Syndicate">Syndicate</option>
                                <option value="Covenant">Covenant</option>
                            </select>
                        </div>
                        <label className="label-name label">Guild name :</label>
                        <input placeholder="Type your Guild Name" className="input-css createaccount-css" type="text" value={this.state.value} onChange={this.handleGuildName} />
                        <label className="label label-password" >Password :</label>
                        <input placeholder="Type your password" className="input-css createaccount-css" type="password" value={this.state.value} onChange={this.handlePassword} />
                        <label className="label label-password" >Pseudo (Guild Master) :</label>
                        <input placeholder="Type your Pseudo" className="input-css createaccount-css" type="text" max="20" value={this.state.value} onChange={this.handlePseudo} />
                        <div className="flexbox-display " style={{ width: '80%', marginBottom: '2%' }}>
                            <label className="label label-password label-form-bottom">Server :</label>
                            <select className="input-css-gvg-lieu firefox-margin-bottom" value={this.state.value} onChange={this.handleServer}>
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

const mapStateToProps = state => {
    return {
        ConnectState: state.ConnectState,
        Login: state.Login,
        Password: state.password
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Logged: isConnected => {
            dispatch({ type: "USER_CONNECTED", ConnectState: true, Login: guild_name, Password: password })
        },

        Unlogged: isConnected => {
            dispatch({ type: "USER_DISCONNECTED", ConnectState: false })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccount));
