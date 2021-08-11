import '../../Styles/BannedPage/BannedPage.css'

import React, { Component } from 'react';

export default class BannedPage extends Component {

    render() {
        return (
            <div className="BannedPage-container">
                <p className="BannedPage-title">Your guild has been banned</p>
                <div className="BannedPage-content">
                Contact us from Discord if you need any help. You already exist and your ranking has not been deleted for the moment.
                </div>
            </div>
        )
      }
}
