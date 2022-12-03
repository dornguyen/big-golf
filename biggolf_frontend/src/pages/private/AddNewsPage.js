import React, {useState} from 'react';
import NewsDataService from "../../services/newsService";
import {Link} from "react-router-dom";

const AddNews = props => {
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

    const saveNewsItem = () => {
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
    };

    return(
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
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        id="text"
                        placeholder="Enter News Subject..."
                        required
                        value={newsSubject}
                        onChange={handleSubjectInputChange}
                        name="text"
                    />
                    <input
                        type="text"
                        id="text"
                        placeholder="Enter News Description..."
                        required
                        value={newsDescription}
                        onChange={handleDescriptionInputChange}
                        name="text"
                    />
                    <button onClick={saveNewsItem} className="btn btn-success">
                        Create News Item
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddNews;