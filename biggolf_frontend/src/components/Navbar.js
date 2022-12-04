import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img className="logo-photo" src={"http://localhost:3001/pictures/big-golf-logo.jpg"} />
      </Link>
      <ul>
        <Link to="/news">News</Link>
        <Link to="/players">Players</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/season-ranking">Season Rankings</Link>
        <Link to="/about-us">About</Link>
      </ul>
    </nav>
  )
}