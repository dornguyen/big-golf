import React, {useState, useEffect} from "react";
import AccountDataService from "../../services/accountsService";
const LoginPage = props => {
    let initialUsernameState = ""
    let initialPasswordState = ""
    
    const [username, setUsername] = useState(initialUsernameState);
    const [password, setPassword] = useState(initialPasswordState);

    let user = {
        username: "",
        password: "",
    }
    const handleUsernameInputChange = event => {
        setUsername(event.target.value);
    }
    const handlePasswordInputChange = event => {
        setPassword(event.target.value);
    }

    const loginToAccount = (event) => {
        event.preventDefault()
        AccountDataService.getByCredentials(username, password)
            .then(response => {
                console.log(response.data)
                user.username = username
                user.password = password
                login()
            })
            .catch(e =>{
                console.log(e);
            });
    };

    const login = () => {
        props.login(user)
        props.history.push('/')
    }

    return(
    <div className="submit-form">
      <div>
        <form onSubmit={loginToAccount}>
            <div>
                <label htmlFor="user">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={username}
                    onChange={handleUsernameInputChange}
                    name="name"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordInputChange}
                    name="password"
                    required
                />
            </div>
            <button type="submit" className="btn btn-success">
            Login
            </button>
        </form>
      </div>
    </div>
    )
}
export default LoginPage;