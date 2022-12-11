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

    return(
        <div>
            <div>
                {tournaments.map((tournament) => {
                    return(
                        <>
                            <h4>{tournament.course} - {tournament.date}</h4>
                            <Link to={"/tournaments/"+tournament._id} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
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