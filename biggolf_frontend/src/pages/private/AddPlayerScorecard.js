import React, {useState, useEffect} from "react";
import PlayerScorecardDataService from "../../services/playerScorecardsService";
import PlayerDataService from "../../services/playersService";
import TournamentsDataService from "../../services/tournamentsService";
import CourseScorecardDataService from "../../services/courseScorecardsService";
import {Link} from "react-router-dom"

// Linked to Both a Tournament and a Course Scorecard...
// Link to tournament because easy to display results.

// just link to tournament? because tournament will have course scorecard...
const AddPlayerScorecard = props =>{
    let initialTournamentState = {
        id: null,
        course: "",
        date: "",
        course_scorecards: [],
    };

    let initialPlayerState = {
        id: null,
        name: "",
    }

    const [tournament, setTournament] = useState(initialTournamentState);
    const [playersList, setPlayersList] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(initialPlayerState);

    useEffect(() => {
        retrievePlayers();
        getTournament(props.match.params.tournamentId);
    }, [props.match.params.tournamentId]);

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

    const retrievePlayers = () => {
        PlayerDataService.getAll()
            .then(response => {
                console.log(response.data)
                setPlayersList(response.data.players)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeCurrentPlayer = e => {
        const currentPlayer = e.target.value;
        setCurrentPlayer(currentPlayer);
    }

    let initialParState = "";
    const [hole_1, setHole1] = useState(initialParState);
    const [hole_2, setHole2] = useState(initialParState);
    const [hole_3, setHole3] = useState(initialParState);
    const [hole_4, setHole4] = useState(initialParState);
    const [hole_5, setHole5] = useState(initialParState);
    const [hole_6, setHole6] = useState(initialParState);
    const [hole_7, setHole7] = useState(initialParState);
    const [hole_8, setHole8] = useState(initialParState);
    const [hole_9, setHole9] = useState(initialParState);
    const [hole_10, setHole10] = useState(initialParState);
    const [hole_11, setHole11] = useState(initialParState);
    const [hole_12, setHole12] = useState(initialParState);
    const [hole_13, setHole13] = useState(initialParState);
    const [hole_14, setHole14] = useState(initialParState);
    const [hole_15, setHole15] = useState(initialParState);
    const [hole_16, setHole16] = useState(initialParState);
    const [hole_17, setHole17] = useState(initialParState);
    const [hole_18, setHole18] = useState(initialParState);

    const handleNewHole1InputChange = event => {
        setHole1(event.target.valueAsNumber);
    }
    const handleNewHole2InputChange = event => {
        setHole2(event.target.valueAsNumber);
    }
    const handleNewHole3InputChange = event => {
        setHole3(event.target.valueAsNumber);
    }
    const handleNewHole4InputChange = event => {
        setHole4(event.target.valueAsNumber);
    }
    const handleNewHole5InputChange = event => {
        setHole5(event.target.valueAsNumber);
    }
    const handleNewHole6InputChange = event => {
        setHole6(event.target.valueAsNumber);
    }
    const handleNewHole7InputChange = event => {
        setHole7(event.target.valueAsNumber);
    }
    const handleNewHole8InputChange = event => {
        setHole8(event.target.valueAsNumber);
    }
    const handleNewHole9InputChange = event => {
        setHole9(event.target.valueAsNumber);
    }
    const handleNewHole10InputChange = event => {
        setHole10(event.target.valueAsNumber);
    }
    const handleNewHole11InputChange = event => {
        setHole11(event.target.valueAsNumber);
    }
    const handleNewHole12InputChange = event => {
        setHole12(event.target.valueAsNumber);
    }
    const handleNewHole13InputChange = event => {
        setHole13(event.target.valueAsNumber);
    }
    const handleNewHole14InputChange = event => {
        setHole14(event.target.valueAsNumber);
    }
    const handleNewHole15InputChange = event => {
        setHole15(event.target.valueAsNumber);
    }
    const handleNewHole16InputChange = event => {
        setHole16(event.target.valueAsNumber);
    }
    const handleNewHole17InputChange = event => {
        setHole17(event.target.valueAsNumber);
    }
    const handleNewHole18InputChange = event => {
        setHole18(event.target.valueAsNumber);
    }

    let initialHandicapState = ""
    const [handicap, setHandicap] = useState(initialHandicapState);
    const handleHandicapInputChange = event => {
        setHandicap(event.target.valueAsNumber);
    }

    let initialClassFlightState = ""
    const [classFlight, setClassFlight] = useState(initialClassFlightState);
    const handleClassFlightInputChange = event => {
        setClassFlight(event.target.value)
    }

    const savePlayerScorecard = (event) => {
        event.preventDefault();
        var data = {
            courseScorecardId: tournament.course_scorecards[0]._id,
            playerId: currentPlayer,
            tournamentId: props.match.params.tournamentId,
            hole_scores: [hole_1, hole_2, hole_3, hole_4, hole_5, hole_6,
                hole_7, hole_8, hole_9, hole_10, hole_11, hole_12,
                hole_13, hole_14, hole_15, hole_16, hole_17, hole_18],
            handicap: handicap,
            classFlight: classFlight,
        }
        PlayerScorecardDataService.createPlayerScorecard(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        props.history.push(`/tournaments/${props.match.params.tournamentId}`)
    };

    return(
        <>
        {props.user ? (
            <>
            <Link to={"/tournaments/"+tournament._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                Back to Tournament View
            </Link>
            <div>Adding a player score for the {tournament.course}</div>
            <div>
                <select onChange={onChangeCurrentPlayer}>
                    <option value="" disabled selected>Select Player...</option>
                    {playersList.map(player => {
                        return(
                            <option value={player._id}>{player.name.substr(0,20)}</option>
                        )
                    })}
                </select>
            <form onSubmit={savePlayerScorecard}>
            <table>
                <tr>
                    <th>Hole</th>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                </tr>
                <tr>
                    <th>Score</th>
                    <td><input type="number"  id="hole_2" value={hole_2} onChange={handleNewHole2InputChange} name="hole_2" required /></td>
                    <td><input type="number"  id="hole_1" value={hole_1} onChange={handleNewHole1InputChange} name="hole_1" required /></td>
                    <td><input type="number"  id="hole_3" value={hole_3} onChange={handleNewHole3InputChange} name="hole_3" required /></td>
                    <td><input type="number"  id="hole_4" value={hole_4} onChange={handleNewHole4InputChange} name="hole_4" required /></td>
                    <td><input type="number"  id="hole_5" value={hole_5} onChange={handleNewHole5InputChange} name="hole_5" required /></td>
                    <td><input type="number"  id="hole_6" value={hole_6} onChange={handleNewHole6InputChange} name="hole_6" required /></td>
                    <td><input type="number"  id="hole_7" value={hole_7} onChange={handleNewHole7InputChange} name="hole_7" required /></td>
                    <td><input type="number"  id="hole_8" value={hole_8} onChange={handleNewHole8InputChange} name="hole_8" required /></td>
                    <td><input type="number"  id="hole_9" value={hole_9} onChange={handleNewHole9InputChange} name="hole_9" required /></td>
                    <td><input type="number"  id="hole_10" value={hole_10} onChange={handleNewHole10InputChange} name="hole_10" required /></td>
                    <td><input type="number"  id="hole_11" value={hole_11} onChange={handleNewHole11InputChange} name="hole_11" required /></td>
                    <td><input type="number"  id="hole_12" value={hole_12} onChange={handleNewHole12InputChange} name="hole_12" required /></td>
                    <td><input type="number"  id="hole_13" value={hole_13} onChange={handleNewHole13InputChange} name="hole_13" required /></td>
                    <td><input type="number"  id="hole_14" value={hole_14} onChange={handleNewHole14InputChange} name="hole_14" required /></td>
                    <td><input type="number"  id="hole_15" value={hole_15} onChange={handleNewHole15InputChange} name="hole_15" required /></td>
                    <td><input type="number"  id="hole_16" value={hole_16} onChange={handleNewHole16InputChange} name="hole_16" required /></td>
                    <td><input type="number"  id="hole_17" value={hole_17} onChange={handleNewHole17InputChange} name="hole_17" required /></td>
                    <td><input type="number"  id="hole_18" value={hole_18} onChange={handleNewHole18InputChange} name="hole_18" required /></td>
                </tr>
            </table>
            <div>
                <label>
                    Handicap: 
                    <input type="number" id="handicap" value={handicap} onChange={handleHandicapInputChange} name="handicap" required />
                </label>
            </div>
            <div>
                <label>
                    Class/Flight A/B/C: 
                    <input type="text" id="classFlight" value={classFlight} onChange={handleClassFlightInputChange} name="classFlight" required />
                </label>
            </div>
            <div>
                <button type="submit" className="btn btn-success">
                    Create Player Scorecard
                </button>
            </div>
           </form>
            </div>
            </>
        ) : (<h4>Please login.</h4>)}
        </>
    )
}

export default AddPlayerScorecard