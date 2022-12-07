import React from 'react'
import NewsList from "../../components/news-list";
import {Link} from "react-router-dom";

const News = (props) => {
  return (
    <>
      <h1>News Page</h1>
      {props.user ? (
        <Link to={"/add-news-page"} user={props.user} className="btn btn-primary col-lg-5 mx-1 mb-1">
          Add News Item
        </Link>
      ) : (<></>)}
      <NewsList user={props.user}/>
    </>
  )
}

export default News