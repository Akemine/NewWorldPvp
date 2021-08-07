import React, { Component } from 'react';

import ServerChoice from './ServerChoice'

import UpcomingWars from './UpcomingWars';
import Leaderboard from './Leaderboard';
import LastWars from './LastWars';

export default class MainContent extends Component {
    render() {
        return (
            <div>
                <div className="main-search">
                    <ServerChoice userID="test"/> 
                </div>
                <div className="main-content">
                    <LastWars/>
                    <Leaderboard/>
                    <UpcomingWars/> 
                </div>
          </div>
        )
      }
}