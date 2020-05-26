import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "./components/home/Home";
import { Doctor } from "./components/Doctor";
import { Patients } from "./components/Patients";
import { Awareness } from "./components/Awareness";
import { notfound } from "./components/notfound";
import { Layout } from "./components/Layout";
import NavigationBar from "./components/Navigationbar";
import CompleteProfile from "./components/user-logn-and-reg/complete-profile/complete-profile";
import UserDashboard from "./components/user-dashboard/user-dashboard";
import ApplicationForm from "./components/user-dashboard/application-form/application-form";
import Soundtest from "./components/user-dashboard/sountest";
import CovidChoice from "./components/user-dashboard/has-covid";
import AllHospitals from "./components/all-hospitals/all-hospitals";
import HospitalDetails from "./components/all-hospitals/hospital";
import HospitalDashboard from "./components/hospital-dashboard/hospital-dashobard";
import FreeTest from './components/free-test';
import "./chatbot";

class App extends React.Component {
  render() {
    return (
      <div>
        <div id="script"></div>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  this.props.auth &&
                  this.props.auth.email &&
                  this.props.auth.email.includes("hospital") ? (
                    <Redirect to="/hospital-dashboard" />
                  ) : this.props.auth.uid ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <HomePage />
                  )
                }
              />
              <Route path="/doctor" component={Doctor} />
              <Route path="/patients" component={Patients} />
              <Route path="/awareness" component={Awareness} />
              <Route path="/complete-profile" component={CompleteProfile} />
              <Route path="/dashboard" component={UserDashboard} />
              <Route path="/application-form" component={ApplicationForm} />
              <Route path="/sound-test" component={Soundtest} />
              <Route path="/ask-covid" component={CovidChoice} />
              <Route path="/hospital-dashboard" component={HospitalDashboard} />
              <Route path="/free-test" component={FreeTest} />
              <Route
                path="/hospitals/:hospital_slug"
                component={HospitalDetails}
              />
              <Route path="/hospitals" component={AllHospitals} />
              <Route component={notfound} />
            </Switch>
          </Router>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
