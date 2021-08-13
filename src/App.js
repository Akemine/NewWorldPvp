import './App.css';



import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './Components/Partials/Navbar';
import Footer from './Components/Partials/Footer';
import MainContent from './Components/MainContent/MainContent';
import Login from './Components/Login/Login';
import HowItWorks from './Components/HowItWorks/HowItWorks'
import Gvg from './Components/GvgContent/Gvg';
import CreateAccount from './Components/Login/CreateAccount';
import Overview from './Components/Admin/Overview';
import BannedPage from './Components/BannedPage/BannedPage';
import Stat from './Components/Statistic/Stat';
import Douane from './Components/Admin/Douane';


function App() {
  
  return (

    <Router>
      <div className="App">
        <div className="Header">
          <Navbar />
        </div>
        <div className="Content">
          <Switch>
            <Route path="/banned" >
              <BannedPage />
            </Route>
            <Route path="/leaderboard" >
              <MainContent />
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
            <Route path="/createaccount" >
              <CreateAccount />
            </Route>
            <Route path="/gvg" >
              <Gvg />
            </Route>
            <Route path="/howitworks" >
              <HowItWorks />
            </Route>
            <Route path="/stat" >
              <Stat />
            </Route>
            <Route path="/overview" >
              <Overview />
            </Route>
            <Route path="/douane">
              <Douane />
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
