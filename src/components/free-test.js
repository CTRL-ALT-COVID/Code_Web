import React from "react";
import Recording from "./user-dashboard/record";
import { Button } from "react-bootstrap";

class FreeTest extends React.Component {
  handleRedirect = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <Recording />
        <Button variant="primary" type="button" onClick={this.handleRedirect}>
          Back
        </Button>
      </div>
    );
  }
}

export default FreeTest;
