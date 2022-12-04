import React, {useState, useEffect} from "react";
import TournamentDataService from "../services/tournamentsService";
import {Link} from "react-router-dom";

const TournamentsList = props => {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        retrieveTournaments();
    }, []);

    const retrieveTournaments = () => {
        TournamentDataService.getAll()
            .then(response => {
                console.log(response.data);
                setTournaments(response.data.tournaments);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTournaments();
    }

    return(
        <div>
            <h1>List of Tournamnets from DB</h1>
            <div>
                {tournaments.map((tournament) => {
                    return(
                        <>
                            <h4>Course: {tournament.course} Date: {tournament.date}</h4>
                            <Link to={"/tournaments/"+tournament._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                View Tournament Results
                            </Link>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default TournamentsList;