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
            <h1>List of Players from DB</h1>
            <div>
                {players.map((player) => {
                    return(
                        <h4>{player.name}</h4>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayersList;