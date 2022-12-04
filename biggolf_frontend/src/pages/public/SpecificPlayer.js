import React, {useState, useEffect} from "react";
import PlayerDataService from "../../services/playersService";
import {Link} from "react-router-dom";

const SpecificPlayer = props => {
    const initialPlayerState = {
        id: null,
        name: "",
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
        <h1>
            THIS PLAYER
        </h1>
        // <div>
        //     {player ? (
        //         <div>
        //             <h5>Player Name: {player.name}</h5>
        //         </div>
        //     ) : (
        //         <p>No Player Yet</p>
        //     )}
        // </div>
    )
}
export default SpecificPlayer;