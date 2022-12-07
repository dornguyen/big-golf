import React, {useState, useEffect} from "react";
import PlayerDataService from "../services/playersService";
import {Link} from "react-router-dom";

const PlayersList = props => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        retrievePlayers();
    }, []);

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

    const refreshList = () => {
        retrievePlayers();
    }

    return(
        <div>
            <div>
                {players.map((player) => {
                    return(
                        <div>
                            <h4>{player.name}</h4>
                            <Link to={"/players/"+player._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                View Player Profile
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayersList;