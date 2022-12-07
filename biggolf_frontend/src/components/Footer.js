import EnterEmail from "./EnterEmail"
import {Link} from "react-router-dom"
const Footer = (props) =>{
    return(
        <div className="nav">
            <div>
                <EnterEmail />
                {props.user ? (
                <Link to={"/mailing-list"} className="btn btn-primary">
                    Mailing List
                </Link>
                ) : (<></>)}
                
            </div>
        </div>
    )
}
export default Footer;
