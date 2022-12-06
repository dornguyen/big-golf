import EnterEmail from "./EnterEmail"
import {Link} from "react-router-dom"
export default function Footer(){
    return(
        <div className="nav">
            <div>
                <EnterEmail />
                <Link to={"/login-page"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Login
                </Link>
            </div>
        </div>
    )
}
