import '../../Styles/MainContent/ServerChoice.css'

import React, { Component } from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import axios from 'axios';

let serverChoosed_props

class ServerChoice extends Component {
    
      // CONSTRUCTEUR DU COMPOSANT
      constructor(props) {
        super(props);

        this.state = {
          servers: []
      }

        this.handleSelectServer = this.handleSelectServer.bind(this);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    

    handleSelectServer(e){
      this.setState({ serverChoosed: e.target.value });
      
    }

    async getAllServer(){
      await axios.get(`http://localhost:5000/api/v1/getServerList`)
      .then(res => {
        const servers = res.data;
        this.setState({ servers });
      })
    }

    componentDidMount() {
      this.getAllServer()
    }

    componentDidUpdate(prevState) {
      if(prevState.serverChoosed !== this.state.serverChoosed)
      {
        serverChoosed_props = this.state.serverChoosed
        this.props.changeServerChoosed()
      }
    }

      render() {
        return (
            <div>
                <select className="server-select" onChange={this.handleSelectServer}>
                <option key="all" className="server-option" value="all">All (by default)</option>
                    {this.state.servers.map(server => <option key={server.id} className="server-option" value={server.server}>{server.server}</option>)} 
                </select>
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
    Banned: state.loginReducer.Banned,
    ServerChoosed: state.serverChoiceReducer.ServerChoosed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeServerChoosed: () => {
      dispatch({type: "CHANGE_SERVER_LEARDERBOARD", ServerChoosed: serverChoosed_props})
     },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServerChoice));