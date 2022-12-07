import React from 'react'
import CourseAndPlayerScorecard from "./CourseAndPlayerScorecard";

const PlayerStatistics = (props) => {

    console.log("number of scorecards: " + props.scorecards.length)
    let numOfPar3s=0;
    let numOfPar4s=0;
    let numOfPar5s=0;
    let scoreOnPar3s=0;
    let scoreOnPar4s=0;
    let scoreOnPar5s=0;

    //Calculate numOfPar3s and score on Par3s
    for(let i=0; i < props.scorecards.length; i++){
        for(let j=0; j < props.scorecards[i].par_holes.length; j++){
            if(props.scorecards[i].par_holes[j] === 3){
                numOfPar3s++;
                scoreOnPar3s += props.scorecards[i].hole_scores[j]
            }
            else if(props.scorecards[i].par_holes[j] === 4){
                numOfPar4s++;
                scoreOnPar4s += props.scorecards[i].hole_scores[j]
            }
            else if(props.scorecards[i].par_holes[j] === 5){
                numOfPar5s++;
                scoreOnPar5s += props.scorecards[i].hole_scores[j]
            }
        }
    }
    console.log("numPar3s: " + numOfPar3s)
    console.log("scorePar3s: " + scoreOnPar3s)
    console.log("numPar4s: " + numOfPar4s)
    console.log("scorePar4s: " + scoreOnPar4s)
    console.log("numPar5s: " + numOfPar5s)
    console.log("scorePar5s: " + scoreOnPar5s)
    return(
        <>
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Average Score on Par 3s</th>
                    <th>Average Score on Par 4</th>
                    <th>Average Score on Par 5</th>
                </tr>
                <tr>
                    <td>{(scoreOnPar3s/numOfPar3s).toFixed(2)}</td>
                    <td>{(scoreOnPar4s/numOfPar4s).toFixed(2)}</td>
                    <td>{(scoreOnPar5s/numOfPar5s).toFixed(2)}</td>
                </tr>
            </table>
            {props.scorecards.map(scorecard => {
                return(
                    <>
                        <div><strong>{scorecard.course}, {scorecard.date} CLASS: {scorecard.classFlight}</strong></div>
                        <CourseAndPlayerScorecard card={scorecard} par_holes={scorecard.par_holes} hole_scores={scorecard.hole_scores} />
                    </>
                )
            })}
        </>
    )
}

export default PlayerStatistics;