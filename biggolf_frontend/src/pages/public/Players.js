import React from 'react'
import PlayersList from "../../components/players-list";
import {Link} from "react-router-dom";

const Players = (props) => {
  return (
    <>
      <h1>Players Page</h1>
      {props.user ? (
        <Link to={"/add-player-page"} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
            Add Player
        </Link>
      ) : (<></>)}
      <PlayersList />
    </>
  )
}

export default Players;