import '../Styles/NotFound.css'

import React, { Component } from 'react';

import { Link } from "react-router-dom";

export default class NotFound extends Component {

    render() {
        return (
            <div className="">
                <p className="page-notfounded">Page introuvable</p>
                <Link to="/leaderboard" className="leaderboard btnNavbar">Redirection to leaderboard</Link>
            </div>
        )
      }
}
