import React, {useState, useEffect} from 'react'
import CalculateSeasonRankings from '../../components/calculateSeasonRankings';
import PlayerDataService from "../../services/playersService";
import PlayerScorecardsService from "../../services/playerScorecardsService";

const SeasonRanking = () => {

  const [players, setPlayers] = useState([]);

  const retrievePlayers = () => {
      PlayerDataService.getAll()
          .then(response => {
              console.log(response.data);
              setPlayers(response.data.players);
          })
          .catch(e => {
              console.log(e);
          });
  };

  const[playerScorecards, setPlayerScorecards] = useState([]);

  const retrieveScorecards = () =>{
    PlayerScorecardsService.getAll()
      .then(response =>{
        console.log(response.data);
        setPlayerScorecards(response.data.playerScorecards)
      })
  }
  useEffect(() => {
    retrievePlayers();
    retrieveScorecards();
}, []);


  return (
    <>
      <h1 class="text-center">Season Rankings</h1>
      <CalculateSeasonRankings playersList={players} scorecardsList={playerScorecards} />
    </>
  )
}

export default SeasonRanking