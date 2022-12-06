import React, {useState} from 'react'
import EmailsDataService from '../services/emailsService';
const EnterEmail = props => {
    let initialEmailState = "";
    const [email, setEmail] = useState(initialEmailState);

    const handleEmailInputChange = event => {
        setEmail(event.target.value);
    }

    const addEmail = (event) => {
        event.preventDefault();
        var data = {
            email: email
        }
        EmailsDataService.addEmail(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return(
        <>
            <form onSubmit={addEmail}>
                <label>Join our Mailing List! </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={handleEmailInputChange}
                    name="email"
                    required
                />
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </>
    )
}
export default EnterEmail;