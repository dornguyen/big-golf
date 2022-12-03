 import React from 'react'
 import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from "./pages/public/Home"
import News from "./pages/public/News"
import AddNews from "./pages/private/AddNewsPage"
import Players from "./pages/public/Players"
import AddPlayer from "./pages/private/AddPlayerPage"
import Photos from "./pages/public/Photos"
import Tournaments from "./pages/public/Tournaments"
import AddTournament from "./pages/private/AddTournamentPage"
import SeasonRanking from "./pages/public/SeasonRanking"
import AboutUs from "./pages/public/AboutUs"
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/add-news-page" element={<AddNews />} />
          <Route path="/players" element={<Players />} />
          <Route path="/add-player-page" element={<AddPlayer />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/add-tournament-page" element={<AddTournament />} />
          <Route path="/season-ranking" element={<SeasonRanking />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class!</h1>
//   }
// }

export default App
