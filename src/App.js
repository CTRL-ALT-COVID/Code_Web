import React  from 'react';
import './chatbot'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/Home';
import {Doctor} from './pages/Doctor';
import {Patients} from './pages/Patients';
import {Awareness} from './pages/Awareness';
import {notfound} from './pages/notfound';
import {Layout} from './components/Layout';
import {NavigationBar} from './components/Navigationbar';
function App() {
  return (
    <div>
      <div id='chatbot'></div>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route path = "/doctor" component = {Doctor} />
          <Route path = "/patients" component = {Patients} />
          <Route path = "/awareness" component = {Awareness} />
          <Route component = {notfound} />
          </Switch>
        </Router>
      </Layout> 
    </div>
  );
}

export default App;
