import React, { useState, useEffect } from 'react'
import playersService from '../services/playersService';
import PlayerDataService from "../services/playersService";
const TournamentResults = (props) => {

    // const copyOfArray = props.scorecards;
    // console.log("Before Sorting: ")
    // for(let i = 0; i < copyOfArray.length; i++){
    //     console.log(copyOfArray[i].classFlight)
    // }
    // //copyOfArray.sort((a,b) => (a.classFlight > b.classFlight) ? 1 : ((b.classFlight > a.classFlight) ? -1 : 0))
    // console.log("After Sorting")
    // for(let i = 0; i < copyOfArray.length; i++)
    // {
    //     console.log(copyOfArray[i].classFlight)
    // }
    //sort later.. just get the results up at the moment.

    // const classFlights = props.scorecards.map(scorecard => {
    //     return scorecard.classFlight
    // })
    // console.log(classFlights)

    // const playerNames = props.scorecards.map(scorecard => {
    //     return scorecard.playerName
    // })
    // console.log(playerNames)

    // const frontNineScore = props.scorecards.map(scorecard => {
    //     let out = 0;
    //     for(let i=0; i < 9; i++){
    //         out += scorecard.hole_scores[i];
    //     }
    //     return out
    // })
    // console.log(frontNineScore)

    // const backNineScore = props.scorecards.map(scorecard => {
    //     let inScore = 0;
    //     for(let i=9; i < scorecard.hole_scores.length; i++){
    //         inScore += scorecard.hole_scores[i];
    //     }
    //     return inScore
    // })
    // console.log(backNineScore)

    // const handicaps = props.scorecards.map(scorecard => {
    //     return scorecard.handicap
    // })

    return(
        <div>
            <div>
                Yes
            </div>
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
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
export default TournamentResults