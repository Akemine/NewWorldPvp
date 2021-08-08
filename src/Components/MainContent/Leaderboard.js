import '../../Styles/Leaderboard.css'

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

import axios from 'axios';

import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import icon_covenant from '../../asset/covenant-icon.png'

const leaderboard = 'LEADERBOARD'

class Leaderboard extends Component {

    notify_success_wardeclared = () => toast.success("War has been declared !")

    state = {
        guilds : [],
        WarDeclared: false
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/getGuild`)
          .then(res => {
            const guilds = res.data;
            this.setState({ guilds });
          })
      }

      componentDidUpdate(prevProps, prevState){
        console.log(this.state.WarDeclared)
        if (prevState.WarDeclared !== this.state.WarDeclared)
        {        
            this.notify_success_wardeclared()
        }
    }
      
    render() {
        if(!this.props.ConnectState){
            return (
                <div className="middleMenu-main scroller">
                    
                    <div className="middleMenu-leaderboard">
                        <p className="title" fixed>{leaderboard} </p>
                        <div className="list-leaderboard">
                        
                        {this.state.guilds.map(function(guild, i) { 
                            if(guild.faction === 'Syndicate'){
                                return <div class="list-flexbox-leaderboard"><div>{i+1} - </div><div key={guild.id} className="syndicate-color">{guild.guild_name} ({guild.pseudo})</div> </div>
                            }
                            else if(guild.faction === 'Marauders'){
                                return <div class="list-flexbox-leaderboard"><div>{i+1} - </div><div key={guild.id} className="marauders-color">{guild.guild_name} ({guild.pseudo})</div></div>
                            }
                            else{
                                return <div class="list-flexbox-leaderboard"><div>{i+1} - </div><div key={guild.id} className="covenant-color">{guild.guild_name} ({guild.pseudo})</div></div>
                            }
                        })
                        }
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="middleMenu-main scroller">
                    <ToastContainer hideProgressBar={false} autoClose={3000} position="top-center" />
                    <div className="middleMenu-leaderboard">
                        <p className="title" fixed>LEADERBOARD</p>
                        <div className="list-leaderboard">
                        {this.state.guilds.map(function(guild, i) { 
                            if(guild.faction === 'Syndicate'){
                                return <div className="list-flexbox-leaderboard-connected">
                                    <div>{i+1} - </div>
                                            <div key={guild.id} className="syndicate-color">{guild.guild_name} ({guild.pseudo})</div>
                                    </div>
                            }
                            else if(guild.faction === 'Marauders'){
                                return <div className="list-flexbox-leaderboard-connected">
                                    <div>{i+1} - </div>
                                        <div key={guild.id} className="marauders-color">{guild.guild_name} ({guild.pseudo})</div>
                                    </div>
                            }
                            else{
                                return <div className="list-flexbox-leaderboard-connected">
                                    <div>{i+1} - </div>
                                        <div key={guild.id} className="covenant-color">{guild.guild_name} ({guild.pseudo})</div>
                                </div>
                            }
                        })
                        }
                        </div>
                    </div>
                </div>
            )
        }

      }

}

const mapStateToProps = state => {
    return {
    ConnectState: state.ConnectState,
    Login: state.Login
    }
  }
  
  const mapDispatchToProps = dispatch => {
  return {

  }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Leaderboard));