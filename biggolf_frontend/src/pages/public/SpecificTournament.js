import React, {useState, useEffect} from "react";
import TournamentsDataService from "../../services/tournamentsService";
import CourseScorecardService from "../../services/courseScorecardsService";
import PlayerScorecardsService from "../../services/playerScorecardsService";
import CourseScorecard from "../../components/CourseScorecard";
import TournamentResults from "../../components/TournamentResults";
import {Link} from "react-router-dom";

const SpecificTournament = (props) => {

    const initialTournamentState = {
        id: null,
        course: "",
        date: "",
        course_scorecards: [],
        player_scorecards: []
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

    const deleteTournament = (id) => {
        CourseScorecardService.deleteCourseScorecard(tournament.course_scorecards[0]._id)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        let player_scorecards_length = tournament.player_scorecards.length;
        for(let i=0; i < player_scorecards_length; i++){
            PlayerScorecardsService.deletePlayerScorecard(tournament.player_scorecards[i]._id)
                .then(response =>{
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        TournamentsDataService.deleteTournament(props.match.params.id)
            .then(response => {
                setTournament(initialTournamentState)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        
        props.history.push('/tournaments')
    }

    return(
        <div>
            <Link to={"/tournaments"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                Back to Tournament List
            </Link>
            {props.user ? (
                <Link to={"/tournaments"} onClick={deleteTournament} className="btn btn-danger">
                    Delete Tournament
                </Link>
            ) : (
                <></>
            )}
            <h4>Tournament Name: {tournament.course}</h4>
            <h4>Tournament Date: {tournament.date}</h4>
            
            <div>
                {tournament.course_scorecards.length === 1 ? (
                    <div>
                        {props.user ? (
                            <Link to={"/add-player-scorecard-page/"+tournament._id} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                Add Player Scores
                            </Link>
                        ) : (<></>)}
                        <CourseScorecard par_holes={tournament.course_scorecards[0].par_holes}/>
                        <TournamentResults user={props.user} scorecards={tournament.player_scorecards}/>
                        <div>

                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>No Course Scorecard Yet...</h4>
                        {props.user ? (
                            <Link to={"/add-course-scorecard-page/"+tournament._id} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                Add Course Scorecard
                            </Link>
                        ) : (<></>)
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
export default SpecificTournament;