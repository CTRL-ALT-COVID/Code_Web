import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user-actions';
import HomePage from './pages/home/Home';
import { Doctor } from './pages/Doctor';
import { Patients } from './pages/Patients';
import { Awareness } from './pages/Awareness';
import { notfound } from './pages/notfound';
import { Layout } from './components/Layout';
import NavigationBar from './components/Navigationbar';
import CompleteProfile from './components/complete-profile/complete-profile';
import UserDashboard from './pages/user-dashboard/user-dashboard';
import ApplicationForm from './components/application-form/application-form';
import Soundtest from './pages/sountest';
import CovidChoice from './components/has-covid';
import './chatbot';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <div id='script'></div>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/doctor" component={Doctor} />
              <Route path="/patients" component={Patients} />
              <Route path="/awareness" component={Awareness} />
              <Route path="/complete-profile" component={CompleteProfile} />
              <Route path="/dashboard" component={UserDashboard} />
              <Route path="/application-form" component={ApplicationForm} />
              <Route path="/sound-test" component={Soundtest} />
              <Route path='/ask-covid' component={CovidChoice} />
              <Route component={notfound} />
              <Route
                exact
                path='/'
                render={() =>
                  this.props.currentUser ? (
                    <Redirect to='/dashboard' />
                  ) : (
                      <HomePage />
                    )
                }
              />
            </Switch>
          </Router>
        </Layout>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);



