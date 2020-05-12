import React from "react";
import { Tabs, Tab } from "react-bootstrap";

class HomePage extends React.Component {

	constructor( props){ 

		super(props);
		this.state={


		}

	}

    render() {
    return (
      <div>
        <div className="tabs-first-section">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
              Hello
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Hello
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Hello
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Hello
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default HomePage;
