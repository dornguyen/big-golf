import React, {useState} from 'react'
import TournamentDataService from "../../services/tournamentsService";
import {Link} from "react-router-dom";

const AddTournament = props => {
    let initialCourseState = "";
    let initialDateState = "";

    const [course, setCourse] = useState(initialCourseState);
    const [date, setDate] = useState(initialDateState);

    const handleCourseInputChange = event => {
        setCourse(event.target.value);
    }

    const handleDateInputChange = event => {
        setDate(event.target.value);
    }

    const saveTournament = (event) => {
        event.preventDefault();
        var data = {
            course: course,
            date: date,
        }

        TournamentDataService.createTournament(data)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
        props.history.push('/tournaments')
    };

    return(
        <>
        {props.user ? (
            <>
                <div>
                    <Link to={"/tournaments"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        Back to Tournament List
                    </Link>
                </div>
                <div>
                    <h2>
                        Adding a Tournament
                    </h2>
                    <form onSubmit={saveTournament}>
                        <input
                            type="text"
                            id="tournamentCourse"
                            placeholder="Enter Tournament Course Name..."
                            value={course}
                            onChange={handleCourseInputChange}
                            name="tournamentCourse"
                            required
                        />
                        <input
                            type="date"
                            id="tournamentDate"
                            value={date}
                            onChange={handleDateInputChange}
                            name="tournamentDate"
                            required
                        />
                        <button type="submit" className="btn btn-success">
                            Create Tournament
                        </button>  
                    </form>
                </div>
            </>
        ) : (<h4>Please login</h4>)
        } 
        </>
    )
}

export default AddTournament