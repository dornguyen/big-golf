import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img className="logo-photo" src={"http://localhost:3000/pictures/big-golf-logo.jpg"} />
      </Link>
      <ul>
        <CustomLink to="/news">News</CustomLink>
        <CustomLink to="/players">Players</CustomLink>
        <CustomLink to="/photos">Photos</CustomLink>
        <CustomLink to="/tournaments">Tournaments</CustomLink>
        <CustomLink to="/season-ranking">Season Rankings</CustomLink>
        <CustomLink to="/about-us">About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}