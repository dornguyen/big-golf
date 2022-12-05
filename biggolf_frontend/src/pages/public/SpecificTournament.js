import React, {useState, useEffect} from "react";
import TournamentsDataService from "../../services/tournamentsService";
import AddCourseScorecard from "../private/AddCourseScorecard";
import CourseScorecard from "../../components/CourseScorecard";
import {Link} from "react-router-dom";

const SpecificTournament = (props) => {
    const initialTournamentState = {
        id: null,
        course: "",
        date: "",
        course_scorecards: [],
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
            <h4>Tournament ID: {tournament._id}</h4>
            <h4>Tournament Name: {tournament.course}</h4>
            <h4>Tournament Date: {tournament.date}</h4>
            <div>
                {tournament.course_scorecards.length === 1 ? (
                    <div>
                        <h4>Test</h4>
                        <CourseScorecard par_holes={tournament.course_scorecards[0].par_holes}/>
                    </div>
                ) : (
                    <div>
                        <Link to={"/add-course-scorecard-page/"+tournament._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                            Add Course Scorecard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SpecificTournament;