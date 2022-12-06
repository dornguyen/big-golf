import React from 'react'

const CalculateSeasonRankings = (props) => {
    // Construct Object Array of Name : Int
    // Declare all Names : 0
    // Calculate Scores, check the name to see which score to update.
    let players = props.playersList;
    var nameScorePairs = {};
    for(let i=0; i< players.length; i++){
        nameScorePairs[players[i].name] = 0;
    }

    let tournamentScore;
    let netScore;

    for(let i=0; i < props.scorecardsList.length; i++){
        tournamentScore = 0;
        for(let j=0; j < props.scorecardsList[i].hole_scores.length; j++){
            tournamentScore += props.scorecardsList[i].hole_scores[j];
        }
        netScore = tournamentScore-props.scorecardsList[i].handicap;
        if(netScore < 70){
            nameScorePairs[props.scorecardsList[i].playerName] += 25;
        }
        else if(netScore >= 70 && netScore < 80){
            nameScorePairs[props.scorecardsList[i].playerName] += 20;
        }
        else if(netScore >= 80 && netScore < 90){
            nameScorePairs[props.scorecardsList[i].playerName] += 15;
        }
        else if(netScore > 90){
            nameScorePairs[props.scorecardsList[i].playerName] += 10;
        }
    }
    
    
    return(
        <>
            <table class="table table-condensed table-bordered">
                <tr class="success text-left">
                    <th class="text-uppercase"><strong>Player Name</strong></th>
                    <th class="text-uppercase"><strong>Points</strong></th>
                </tr>
                {players.map(player => {
                    return(
                        <tr>
                            <td>{player.name}</td>
                            <td>{nameScorePairs[player.name]}</td>
                        </tr>
                    )
                })}
                
            </table>
        </>
    )
}
export default CalculateSeasonRankings;
