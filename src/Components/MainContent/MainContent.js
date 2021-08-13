import React, { Component } from 'react';

import Leaderboard from './Leaderboard';
import LastWars from './LastResults';

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Redirect } from "react-router-dom";
import ServerChoice from './ServerChoice';

class MainContent extends Component {
    render() {
        if (this.props.ConnectState) {
            if (this.props.Banned) {
                return (
                    <Redirect to="/banned" />
                )
            }
            else {
                return (
                    <div>
                        <div className="main-search">
                                <ServerChoice /> 
                        </div>
                        <div className="main-content">
                            <Leaderboard />
                            <LastWars />
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <div className="main-search">
                        <ServerChoice /> 
                    </div>
                    <div className="main-content">
                        <Leaderboard />
                        <LastWars />
                    </div>
                </div>
            )
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContent));