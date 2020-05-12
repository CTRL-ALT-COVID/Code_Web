import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import UserLoginandReg from '../../components/user-logn-and-reg/user-login-and-reg';
import HospitalLogin from '../../components/hospital-login';
import { auth , createUserProfileDocument } from '../../firebase/firebase.utils'
import './home.css';


class HomePage extends React.Component {

	constructor( props){ 

		super(props);
		this.state={
      currentUser:  null
		}

  }
  
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }
  unsubscribeFromAuth = null;

  componentWillUnmount(){
    this.unsubscribeFromAuth();

  }


  render() {
    return (
      <div>
        <div className="tabs-first-section">
          <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
            <Tab eventKey="user" title="User Login">
              <UserLoginandReg />
            </Tab>
            <Tab eventKey="hospital" title="Hospital Login">
              <HospitalLogin />
            </Tab>
            <Tab eventKey="freetest" title="Free Test">
              <HospitalLogin />
            </Tab>
            <Tab eventKey="emergency" title="Emergency">
              <HospitalLogin />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default HomePage;
