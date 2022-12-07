import {Link} from "react-router-dom"

const Navbar = (props) =>{
  return (
    <>
    <nav className="nav">
      <Link to="/" className="logo">
        <img className="logo-photo" src={"http://localhost:3000/pictures/big-golf-logo.jpg"} />
      </Link>
      <ul>
        <Link to="/news">News</Link>
        <Link to="/players">Players</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/season-ranking">Season Rankings</Link>
        <Link to="/about-us">About</Link>
        {props.user ? (
          <a onClick={props.logout} className="nav-link" style={{cursor:'pointer'}}>
            Logout  {props.user.username}
          </a>
        ) : (
          <Link to="/login-page">Login</Link>
        )}
        
      </ul>
    </nav>
    </>
  )
}
export default Navbar;