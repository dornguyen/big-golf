import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import CourseAndPlayerScorecard from '../../components/CourseAndPlayerScorecard'
import courseScorecardsService from '../../services/courseScorecardsService'
import PlayerScorecardsService from '../../services/playerScorecardsService'

const DeletePlayerScorecard = (props) => {
    const [playerScorecard, setPlayerScorecard] = useState([])
    const [courseScorecard, setCourseScorecard] = useState([])
    const getPlayerScorecard = id => {
        PlayerScorecardsService.get(id)
            .then(response => {
                setPlayerScorecard(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    const getCourseScorecard = id => {
        courseScorecardsService.get(id)
            .then(response => {
                setCourseScorecard(response.data);
                console.log(response.data)
            })
    }

    useEffect(() => {
        getPlayerScorecard(props.match.params.playerScorecardId);
    }, [props.match.params.playerScorecardId]);

    const deleteScorecard = (id) => {
        PlayerScorecardsService.deletePlayerScorecard(props.match.params.playerScorecardId)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        props.history.push(`/tournaments/${playerScorecard.tournamentId}`)
    }

    return(
        <>
        {props.user ? (
            <>
                <Link to={`/tournaments/${playerScorecard.tournamentId}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Back to Tournament
                </Link>
                <Link to={`/tournaments/${playerScorecard.tournamentId}`} onClick={deleteScorecard} className="btn btn-danger">
                    Delete Scorecard
                </Link>
                <h4>Scorecard for: {playerScorecard.playerName}</h4>          
            </>
        ) : (<h4>Please login.</h4>)}
        </>
    )
}
export default DeletePlayerScorecard;