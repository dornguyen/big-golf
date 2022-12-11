 import React from 'react'
 import "bootstrap/dist/css/bootstrap.min.css";
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
import DeletePlayerScorecard from './pages/private/DeletePlayerScorecard';
import MailingList from './pages/private/MailingList';

function App() {

  const[user, setUser] = React.useState("");

  async function login(user = null){
    setUser(user);
  }

  async function logout(){
    setUser(null);
    window.location.reload();
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
                <SpecificNews {...props} user={user} />
              )}
            />
            <Route 
              path="/news" 
              render={(props) => (
                <News {...props} user={user} />
              )}
            />
            <Route 
              path="/add-news-page"
              render={(props) => (
                <AddNews {...props} user={user} />
              )}
            />
            <Route
              path="/players/:id"
              render={(props) => (
                <SpecificPlayer {...props} user={user} />
              )}
            />
            <Route 
              path="/players"
              render={(props) => (
                <Players {...props} user={user} />
              )}
            />
            <Route 
              path="/add-player-page"
              render={(props) => (
                <AddPlayer {...props} user={user} />
              )} 
            />
            <Route path="/photos" component={Photos} />
            <Route
              path="/add-course-scorecard-page/:tournamentId"
              render={(props) =>(
                <AddCourseScorecard {...props} user={user} />
              )}
            />
            <Route
              path="/add-player-scorecard-page/:tournamentId"
              render={(props) => (
                <AddPlayerScorecard {...props} user={user} />
              )}
            />
            <Route
              path="/delete-player-scorecard-page/:playerScorecardId"
              render={(props) => (
                <DeletePlayerScorecard {...props} user={user} />
              )}
            />
            <Route
              path="/tournaments/:id"
              render={(props) => (
                <SpecificTournament {...props} user={user} />
              )}
            />
            <Route 
              path="/tournaments"
              render={(props => (
                <Tournaments {...props} user={user} />
              ))} 
            />
            <Route 
              path="/add-tournament-page"
              render={(props => (
                <AddTournament {...props} user={user} />
              ))} />
            <Route path="/season-ranking" component={SeasonRanking} />
            <Route path="/about-us" component={AboutUs} />
            <Route 
              path="/login-page" 
              render={(props) => (
              <LoginPage {...props} user={user} login={login} />
            )}
            />
            <Route
                path="/mailing-list"
                render={(props) => (
                  <MailingList {...props} user={user} />
                )}
            />
          </Switch>
        </div>
        <div id="footer">
          <Footer user={user}/>
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
