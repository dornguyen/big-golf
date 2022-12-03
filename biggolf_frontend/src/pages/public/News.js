import React from 'react'
import NewsList from "../../components/news-list";
import {Link} from "react-router-dom";

const News = () => {
  return (
    <>
      <h1>News Page</h1>
      <Link to={"/add-news-page"} className="btn btn-primary col-lg-5 mx-1 mb-1">
        Add News Item
      </Link>
      <NewsList />
    </>
  )
}

export default News