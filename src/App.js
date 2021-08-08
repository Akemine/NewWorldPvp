
import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainContent from './Components/MainContent/MainContent';
import Login from './Components/Login';
import HowItWorks from './Components/HowItWorks'
import NotFound from './Components/NotFound'
import Gvg from './Components/GvgContent/Gvg';


function App() {

  return (

    <Router>
      <div className="App">
        <div className="Header">
          <Navbar />
        </div>
        <div>
        <Switch>
            <Route path="/leaderboard">
                <MainContent />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/gvg">
                <Gvg />
            </Route>
            <Route path="/howitworks">
                <HowItWorks />
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
