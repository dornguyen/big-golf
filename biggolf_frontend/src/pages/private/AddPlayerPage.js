import React, {useState} from 'react'
import PlayerDataService from "../../services/playersService";
import {Link} from "react-router-dom";

const AddPlayer = props => {
    let initialPlayerState = "";

    const [player, setPlayer] = useState(initialPlayerState);
    
    const handleInputChange = event => {
        setPlayer(event.target.value);
    }

    const savePlayer = () => {
        var data = {
            name: player
        }

        PlayerDataService.createPlayer(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        <div>
            <div className="input-group col-lg-4">
                <input
                    type="text"
                    id="text"
                    placeholder="Enter New Player Name..."
                    required
                    value={player}
                    onChange={handleInputChange}
                    name="text"
                />
                <button onClick={savePlayer} className="btn btn-success">
                    Create Player
                </button>
            </div>
        </div>
    )
}

export default AddPlayer;