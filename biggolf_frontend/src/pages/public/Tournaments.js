import React from 'react'
import TournamentsList from "../../components/tournaments-list";
import {Link} from "react-router-dom"

const Tournaments = (props) => {
  return (
    <>
      <h1>Tournaments Page</h1>
      {props.user ? (
        <Link to={"/add-tournament-page"} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
          Add Tournament
        </Link>
      ) : (<></>)}
      <TournamentsList user={props.user}/>
    </>
  )
}

export default Tournaments