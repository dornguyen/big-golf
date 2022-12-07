import React from 'react'
import Slideshow from '../../components/Slideshow'
const Photos = () => {
  const slides = [
    {
      url: "http://localhost:3000/pictures/brookside.jpg",
      titiel: "Photo 2"
    },
    {
      url: "http://localhost:3000/pictures/debell.jpg",
      titiel: "Photo 3"
    },
    {
      url: "http://localhost:3000/pictures/golf-pic-1.jpg",
      title: "Photo 4"
    },
    {
      url: "http://localhost:3000/pictures/golf-pic-2.jpg",
      title: "Photo 5"
    },
    {
      url: "http://localhost:3000/pictures/golf-pic-3.jpg",
      title: "Photo 6"
    },
    {
      url: "http://localhost:3000/pictures/golfcourseoverview.jpg",
      title: "Photo 7"
    },
    {
      url: "http://localhost:3000/pictures/golftournament.jpg",
      title: "Photo 8"
    },
    {
      url: "http://localhost:3000/pictures/rangebucket.jpg",
      title: "Photo 9"
    }
  ]

  const containerStyles = {
    width: '100%',
    height: '500px',
    margin: "0 auto",
  }
  return (
    <>
      <h1>Photos Page</h1>
      <div style={containerStyles}>
        <Slideshow slides={slides} />
      </div>
    </>
  )
}

export default Photos