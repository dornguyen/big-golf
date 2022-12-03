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
                        <h4>{article.text} {article.date}</h4>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsList;