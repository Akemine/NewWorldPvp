import '../../Styles/Partials/Footer.css'

import React, { Component } from 'react';
import { Link } from "react-router-dom";

const hiw = "HOW IT WORKS ?"

export default class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <div className="copyright">Copyright 2021 - Powered by Akemine</div>
                <div><Link to="/howitworks" className="btnNavbar">{hiw}</Link></div>
            </div>
        )
      }
}
