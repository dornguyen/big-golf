import React from 'react'
import Slideshow from "../components/Slideshow";
import Card from "../components/Card";
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
    width: '100%',
    height: '500px',
    margin: "0 auto",
  }

  const bigTitleStyle = {
    margin: "auto",
    textAlign: "center"
  }

  const cardStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderSpacing: "50px 50px"
  }

  return (
    <>
      
      <div style={containerStyles}>
        <Slideshow slides={slides} />
      </div>
      <div style={bigTitleStyle}>
        <h1>Brothers in Golf</h1>
        <table style={cardStyle}>
          <tr>
            <td>
              <img src="http://localhost:3000/pictures/golftournament.jpg" alt="Golf Tournament" width="500" height="300" />
            </td>
            <td>
              <img src="http://localhost:3000/pictures/rangebucket.jpg" alt="Range Bucket" width="500" height="300" />
            </td>
          </tr>
          <tr>
            <td>
              <img src="http://localhost:3000/pictures/golfcarts.jpg" alt="Golf Carts" width="500" height="300" />
            </td>
            <td>
              <img src="http://localhost:3000/pictures/golfcourseoverview.jpg" alt="Golf Course Overview" width="500" height="300" />
            </td>
          </tr>
        </table>
        <h1>Tournaments</h1>
        <div>
          <Card img="http://localhost:3000/pictures/brookside.jpg"
            title="Previous Tournament"
            description="Brookside, October 2022"
            buttonDescription="View Results"/>
          <Card img="http://localhost:3000/pictures/debell.jpg"
            title="Upcoming Tournament"
            description="Debell, November 2022"
            buttonDescription="Register Now"/>
        </div>
      </div>
      
      
    </>
  )
}

export default Home