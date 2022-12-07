import React, {useState} from 'react';
import NewsDataService from "../../services/newsService";
import {Link} from "react-router-dom";

const AddNews = (props) => {
    let initialNewsSubjectState = ""
    let initialNewsDescriptionState = ""

    const[newsSubject, setNewsSubject] = useState(initialNewsSubjectState);
    const[newsDescription, setNewsDescription] = useState(initialNewsDescriptionState);

    const handleSubjectInputChange = event => {
        setNewsSubject(event.target.value);
    }

    const handleDescriptionInputChange = event => {
        setNewsDescription(event.target.value);
    }

    const saveNewsItem = (event) => {
        event.preventDefault();
        var data = {
            subject: newsSubject,
            description: newsDescription
        }

        NewsDataService.createNews(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        props.history.push('/news')
    };

    return(
        <>
        {props.user ? (
            <>
                <div>
                    <Link to={"/news"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                        Back to News List
                    </Link>
                </div>
                <div>
                    <h2>
                        Adding a News Item
                    </h2>
                    <form onSubmit={saveNewsItem}>
                        <label>
                            Enter Subject:
                            <input
                                type="text"
                                id="newsSubject"
                                placeholder="Enter News Subject..."
                                value={newsSubject}
                                onChange={handleSubjectInputChange}
                                name="newsSubject"
                                required
                            />
                        </label>
                        <label>
                            Enter Description:
                            <input
                                type="text"
                                id="newsDescription"
                                placeholder="Enter News Description..."
                                value={newsDescription}
                                onChange={handleDescriptionInputChange}
                                name="newsDescription"
                                required
                            />
                        </label>
                        <button type="submit" className="btn btn-success">
                            Create News Item
                        </button>
                    </form>
                </div>
            </>
        ) : (<h4>Please Login</h4>)
        }
        </>
    )
}

export default AddNews;