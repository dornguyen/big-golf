import React, {useState} from 'react'
import PlayerDataService from "../../services/playersService";
import {Link} from "react-router-dom";

const AddPlayer = props => {
    let initialFirstNameState = ""
    let initialLastNameState = ""

    const [firstname, setFirstName] = useState(initialFirstNameState);
    const [lastname, setLastName] = useState(initialLastNameState);

    const handleFirstNameInputChange = event => {
        setFirstName(event.target.value);
    }

    const handleLastNameInputChange = event => {
        setLastName(event.target.value);
    }

    function saveName() {
        var data = {
            firstname: firstname,
            lastname: lastname,
        }

        PlayerDataService.createName(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };

    return(
        <div>
            <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Enter First Name..."
                required
                value={firstname}
                onChange={handleFirstNameInputChange}
                name="text"
            />
        </div>
    )

     
}