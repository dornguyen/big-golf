import React, { useState, useEffect } from 'react'
import playersService from '../services/playersService';
import PlayerDataService from "../services/playersService";
const TournamentResults = (props) => {



    return(
        <div>
            <div>
                Yes
            </div>
            <div>
                {props.scorecards.map(player => {
                    return(
                        <div>{player.playerName} + {player.tournamentId}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default TournamentResults