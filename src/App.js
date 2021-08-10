
import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainContent from './Components/MainContent/MainContent';
import Login from './Components/Login';
import HowItWorks from './Components/HowItWorks'
import Gvg from './Components/GvgContent/Gvg';
import CreateAccount from './Components/CreateAccount';
import Overview from './Components/Admin/Overview';
import BannedPage from './Components/BannedPage';
import Stat from './Components/Stat';


function App() {

  return (

    <Router>
      <div className="App">
        <div className="Header">
          <Navbar />
        </div>
        <div>
          <Switch>
            <Route path="/banned">
              <BannedPage />
            </Route>
            <Route path="/leaderboard">
              <MainContent />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/createaccount">
              <CreateAccount />
            </Route>
            <Route path="/gvg">
              <Gvg />
            </Route>
            <Route path="/howitworks">
              <HowItWorks />
            </Route>
            <Route path="/stat">
              <Stat />
            </Route>
            <Route path="/overview">
              <Overview />
            </Route>
            <Route path='*' exact={true} component={MainContent} />
          </Switch>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
