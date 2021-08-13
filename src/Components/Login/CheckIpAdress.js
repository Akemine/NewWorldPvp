import '../../Styles/BannedPage/BannedPage.css'

import React, { Component } from 'react';
import axios from 'axios';

export default class BannedPage extends Component {

    state = {
        ip: []
    }



      componentDidMount(){
          this.getDataFromIP()
      }

      componentDidUpdate(prevState){
          if(prevState.ip !== this.state.ip){
              console.log(this.state.ip)
          }
      }

    render() {
        return (
            <div className="BannedPage-container">
                <p className="BannedPage-title">You can't make a new guild now.</p>
                <div className="BannedPage-content">
                Contact us from Discord if you need any help.
                </div>
            </div>
        )
      }
}
