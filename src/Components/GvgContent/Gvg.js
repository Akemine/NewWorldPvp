import '../../Styles/Gvg.css'
import '../../Styles/Login.css'

import React from 'react';


import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Login from '../Login';
import PendingWars from './PendingWars'
import DeclaredWars from './DeclaredWars'
import FormGvg from './FormGvg';
import NotFound from '../NotFound'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from "react-router-dom";


class Gvg extends React.Component {
    
    render() {
        if (!this.props.ConnectState) {
            return <Login />
        }
        else if (this.props.Login === "Admin"){
            return <NotFound />
        }
        else {
            if (this.props.Banned){
                return <Redirect to="/banned" />
            }
            else {
                return (
                    <div className="main">
                    <div className="main-gvg">
                        <ToastContainer hideProgressBar={false} autoClose={3000} position="top-center" />
                        <FormGvg />
                    </div>
                        <DeclaredWars />
                        <PendingWars />
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        ConnectState: state.ConnectState,
        Login: state.Login,
        Banned: state.Banned
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gvg));