import React from 'react'
import PlayersList from "../../components/players-list";
import {Link} from "react-router-dom";

const Players = () => {
  return (
    <>
      <h1>Players Page</h1>
      <Link to={"/add-player-page"} className="btn btn-primary col-lg-5 mx-1 mb-1">
          Add/Update Player
      </Link>
      <PlayersList />
    </>
  )
}

export default Players;