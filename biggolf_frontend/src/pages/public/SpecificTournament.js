import React, {useState, useEffect} from "react";
import TournamentsDataService from "../../services/tournamentsService";
import CourseScorecard from "../../components/CourseScorecard";
import {Link} from "react-router-dom";

const SpecificTournament = props => {
    const initialTournamentState = {
        id: null,
        course: "",
        date: "",
    };

    const [tournament, setTournament] = useState(initialTournamentState);

    const getTournament = id => {
        TournamentsDataService.get(id)
            .then(response => {
                setTournament(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    useEffect(() => {
        getTournament(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div>
            
            {tournament ? (
                <div>
                    <h4>Tournament ID: {tournament._id}</h4>
                    <h4>Tournament Name: {tournament.course}</h4>
                    <h4>Tournament Date: {tournament.date}</h4>
                </div>
            ) : (
                <p>No Tournament Yet</p>
            )}
            <CourseScorecard />
        </div>
    )
}
export default SpecificTournament;