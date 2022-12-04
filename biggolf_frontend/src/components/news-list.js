import React, {useState, useEffect} from "react";
import NewsDataService from "../services/newsService";
import {Link} from "react-router-dom";

const NewsList = props => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        retrieveNews();
    }, []);

    const retrieveNews = () => {
        NewsDataService.getAll()
            .then(response => {
                console.log(response.data);
                setNews(response.data.news);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveNews();
    }

    return (
        <div>
            <h1>List of News from DB</h1>
            <div>
                {news.map((article) => {
                    return(
                        <>
                            <h2>{article.subject}</h2>
                            <h3>{article.month}/{article.day}/{article.year}</h3>
                            <h4>{article.description}</h4>
                            <Link to={"/news/"+article._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                View News Item
                            </Link>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsList;