 import React from 'react'
 import "bootstrap/dist/css/bootstrap.min.css";
//import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import Home from "./pages/public/Home"
import SpecificNews from "./pages/public/SpecificNews";
import News from "./pages/public/News"
import AddNews from "./pages/private/AddNewsPage"
import SpecificPlayer from "./pages/public/SpecificPlayer"
import Players from "./pages/public/Players"
import AddPlayer from "./pages/private/AddPlayerPage"
import Photos from "./pages/public/Photos"
import SpecificTournament from "./pages/public/SpecificTournament";
import Tournaments from "./pages/public/Tournaments"
import AddTournament from "./pages/private/AddTournamentPage"
import SeasonRanking from "./pages/public/SeasonRanking"
import AboutUs from "./pages/public/AboutUs"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AddCourseScorecard from './pages/private/AddCourseScorecard';
import AddPlayerScorecard from './pages/private/AddPlayerScorecard';
import LoginPage from "./pages/public/LoginPage";

function App() {

  const[user, setUser] = React.useState("");

  async function login(user = null){
    console.log("App.js, username: " + user.username)
    setUser(user);
  }

  async function logout(){
    setUser(null);
    console.log("App.js, username: " + user.username)
  }
  return (
    <>
    <Router>
        <Navbar user={user} logout={logout}/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route 
              path="/news/:id"
              render={(props) => (
                <SpecificNews {...props} />
              )}
            />
            <Route path="/news" component={News} />
            <Route path="/add-news-page" component={AddNews} />
            <Route
              path="/players/:id"
              render={(props) => (
                <SpecificPlayer {...props} />
              )}
            />
            <Route path="/players" component={Players} />
            <Route path="/add-player-page" component={AddPlayer} />
            <Route path="/photos" component={Photos} />
            <Route
              path="/add-course-scorecard-page/:tournamentId"
              render={(props) =>(
                <AddCourseScorecard {...props} />
              )}
            />
            <Route
              path="/add-player-scorecard-page/:tournamentId"
              render={(props) => (
                <AddPlayerScorecard {...props} />
              )}
            />
            <Route
              path="/tournaments/:id"
              render={(props) => (
                <SpecificTournament {...props} user={user} />
              )}
            />
            
            <Route path="/tournaments" component={Tournaments} />
            <Route path="/add-tournament-page" component={AddTournament} />
            <Route path="/season-ranking" component={SeasonRanking} />
            <Route path="/about-us" component={AboutUs} />
            <Route 
              path="/login-page" 
              render={(props) => (
              <LoginPage {...props} user={user} login={login} />
            )}
            />
          </Switch>
        </div>
        <div id="footer">
          <Footer />
        </div>
      </Router>
    </>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class!</h1>
//   }
// }

export default App
