import React, {useState, useEffect} from "react";
import PlayerDataService from "../../services/playersService";
import PlayerScorecardsService from "../../services/playerScorecardsService";
import {Link} from "react-router-dom";
import PlayerStatistics from "../../components/playerStatistics";

const SpecificPlayer = props => {
    const initialPlayerState = {
        id: null,
        name: "",
        player_scorecards: [],
    };

    const [player, setPlayer] = useState(initialPlayerState);
    const getPlayer = id => {
        PlayerDataService.get(id)
            .then(response => {
                setPlayer(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
        
    };

    useEffect(() => {
        getPlayer(props.match.params.id);
    }, [props.match.params.id]);

    const deletePlayer = (id) => {
        let scorecardsLength = player.player_scorecards;
        for(let i = 0; i < scorecardsLength; i++){
            PlayerScorecardsService.deletePlayerScorecard(player.player_scorecards[i]._id)
                .then(response => {
                    console.log("Deleting Scorecard: " + response.data);
                })
                .catch(e => {
                    console.log(e)
                });
        }
        PlayerDataService.deletePlayer(props.match.params.id)
            .then(response => {
                setPlayer(initialPlayerState)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return(
        <div>
            <Link to={"/players"} className="btn btn-primary">
                Back to Players List
            </Link>
            {props.user ? (
                <Link to={"/players"} onClick={deletePlayer} className="btn btn-danger">
                    Delete Player
                </Link>
            ) : (
                <></>
            )}
            {player ? (
                <div>
                    <h3>Player Name: {player.name}</h3>
                    {player.player_scorecards.length > 0 ? (
                        <>
                            <div>Scores!</div>
                            <PlayerStatistics scorecards={player.player_scorecards} />
                        </>
                    ) : (
                        <div>
                            <h2>No Scores Yet...</h2>
                        </div>
                    )}
                </div>
            ) : (
                <p>No Player Yet</p>
            )}
        </div>
    )
}
export default SpecificPlayer;