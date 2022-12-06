import React, {useState, useEffect} from "react";
import PlayerDataService from "../../services/playersService";
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

    return(
        <div>
            <Link to={"/players"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                Back to Players List
            </Link>
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