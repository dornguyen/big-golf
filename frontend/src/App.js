// import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import News from "./pages/News"
import Players from "./pages/Players"
import Photos from "./pages/Photos"
import Tournaments from "./pages/Tournaments"
import SeasonRanking from "./pages/SeasonRanking"
import AboutUs from "./pages/AboutUs"
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/players" element={<Players />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/tournaments" element={<Tournaments />} />
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
