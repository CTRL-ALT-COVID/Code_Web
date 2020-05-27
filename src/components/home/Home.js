import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import UserLoginandReg from '../../components/user-logn-and-reg/user-login-and-reg';
import HospitalLogin from '../../components/hospital-login';
// import Recording from '../../components/record';
import './home.css';
import {ComingSoon} from '../coming-soon';


class HomePage extends React.Component {

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
            {/* <Tab eventKey="freetest" title="Free Test">
              <Recording />
            </Tab> */}
            <Tab eventKey="emergency" title="Emergency">
              <ComingSoon  />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default HomePage;
