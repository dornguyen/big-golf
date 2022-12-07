import React, {useState} from 'react'
import PlayerDataService from "../../services/playersService";
import {Link} from "react-router-dom";

const AddPlayer = props => {
    let initialNewPlayerState = "";

    const [newPlayer, setNewPlayer] = useState(initialNewPlayerState);

    const handleNewPlayerInputChange = event => {
        setNewPlayer(event.target.value);
    }

    const saveNewPlayer = (event) => {
        event.preventDefault();
        var data = {
            name: newPlayer
        }

        PlayerDataService.createPlayer(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        props.history.push('/players')
    };

    return(
        <>
        {props.user ? (
            <>
                <div>
                    <Link to={"/players"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        Back to Player List
                    </Link>
                </div>
                <div>
                    <h2>Adding a Player</h2>
                    <form onSubmit={saveNewPlayer}>
                        <input 
                            type="text" 
                            id="playerName" 
                            placeholder="Enter Player Name..." 
                            value={newPlayer} 
                            onChange={handleNewPlayerInputChange}
                            name="playerName"
                            required
                        />
                        <button type="submit" className="btn btn-success">
                            Create Player
                        </button>
                    </form>
                </div>
            </>
        ) : (<h4>Please Login</h4>)}
        </>
    )
}

export default AddPlayer;