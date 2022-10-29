import React from 'react'
import Slideshow from "../components/Slideshow";

const Home = () => {
  const slides = [
    {
      url: "http://localhost:3000/pictures/golf-pic-1.jpg",
      title: "Photo 1"
    },
    {
      url: "http://localhost:3000/pictures/golf-pic-2.jpg",
      title: "Photo 2"
    },
    {
      url: "http://localhost:3000/pictures/golf-pic-3.jpg",
      title: "Photo 3"
    }
  ]

  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: "0 auto",
  }

  return (
    <>
      <h1>Home</h1>
      <div style={containerStyles}>
        <Slideshow slides={slides} />
      </div>
      
    </>
  )
}

export default Home