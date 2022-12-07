import React, { useState, useEffect } from 'react'
import playersService from '../services/playersService';
import PlayerDataService from "../services/playersService";
import {Link} from "react-router-dom";
const TournamentResults = (props) => {
    return(
        <div>
            <div>
                <table class="table table-bordered table-striped">
                    <tr>
                        <th scope="col">Class</th>
                        <th scope="col">Player</th>
                        <th scope="col">Front Nine</th>
                        <th scope="col">Back Nine</th>
                        <th scope="col">Gross Score</th>
                        <th scope="col">Handicap</th>
                        <th scope="col">Net Score</th>
                        {props.user ? (
                            <th scope="col">
                                DeleteScorecard
                            </th>) : (<></>)}
                    </tr>
                    {props.scorecards.map(scorecard => {
                        let flight = scorecard.classFlight
                        let playerName = scorecard.playerName
                        let frontNineScore = 0;
                        let backNineScore = 0;
                        for(let i = 0; i < scorecard.hole_scores.length; i++){
                            if(i < 9){
                                frontNineScore += scorecard.hole_scores[i]
                            }
                            else{
                                backNineScore += scorecard.hole_scores[i]
                            }
                        }
                        let grossScore = frontNineScore+backNineScore
                        let handicap = scorecard.handicap
                        let netScore = grossScore - handicap
                        return(
                            <tr scope="row">
                                <td>{flight}</td>
                                <td>{playerName}</td>
                                <td>{frontNineScore}</td>
                                <td>{backNineScore}</td>
                                <td>{grossScore}</td>
                                <td>{handicap}</td>
                                <td>{netScore}</td>
                                {props.user ? (
                                    <td>
                                        <Link to={"/delete-player-scorecard-page/" + scorecard._id} user={props.user}>
                                            Delete
                                        </Link>
                                    </td>
                                ) : (<></>)}
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
export default TournamentResults