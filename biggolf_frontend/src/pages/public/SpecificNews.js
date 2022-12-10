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

    const deleteNewsItem = (id) => {
        NewsDataService.deleteNews(id, props.match.params.id)
            .then(response => {
                setNews(initialNewsState)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return(
        <div>
            <Link to={"/news"} className="btn btn-primary">
                Back to News List
            </Link>
            {props.user ? (
                <Link to={"/news"} onClick={deleteNewsItem} className="btn btn-danger col-lg-5 mx-1 mb-1">
                    Delete News
                </Link>
            ) : (
                <></>
            )}
            {news ? (
                <div>
                    <h4>News Subject: {news.subject}</h4>
                    <h5>News Description</h5>
                    <p>{news.description}</p>
                </div>
            ) : (
                <p>No News Yet</p>
            )}
        </div>
    )
}
export default SpecificNews;