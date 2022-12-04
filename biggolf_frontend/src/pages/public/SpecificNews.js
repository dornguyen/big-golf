import React, {useState, useEffect} from "react";
import NewsDataService from "../../services/newsService";
import {Link} from "react-router-dom";

const SpecificNews = props =>{
    const initialNewsState = {
        id: null,
        subject: "",
    }

    const[news, setNews] = useState(initialNewsState);

    const getNews = id => {
        NewsDataService.get(id)
            .then(response => {
                setNews(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    useEffect(() => {
        getNews(props.match.params.id);
    }, [props.match.params.id]);

    return(
        <div>
            {news ? (
                <div>
                    <h4>News ID: {news._id}</h4>
                    <h4>News Subject: {news.subject}</h4>
                    <h4>News Description: {news.description}</h4>
                </div>
            ) : (
                <p>No News Yet</p>
            )}
        </div>
    )
}
export default SpecificNews;