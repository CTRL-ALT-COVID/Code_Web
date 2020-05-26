import React from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { applicationForm, sendData } from "../../../store/actions/authActions";
import "./application-form.css";

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soreThroat: false,
      fever: false,
      diarrhea: false,
      nasalCongestion: false,
      shortnessOfBreath: false,
      fatigue: false,
      lungDisease: false,
      hypertension: false,
      diabetes: false,
      heartDisease: false,
      travelled: false,
      interaction: false,
      score: 0,
      uid: this.props.auth.uid,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.applicationForm(this.state);
    this.props.sendData(this.state);
    this.props.history.push("/hospitals");
  };

  handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;

    this.setState({
      [name]: value === "true" ? true : value === "false" ? false : value,
    });
  };

  render() {
    // const {currentUser} = this.props;
    return (
      <div className="profile-form">
        <h2>Choose whatever feels right</h2> <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridThroat">
              <Form.Label>Do you have a sore throat?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="soreThroat"
                onChange={this.handleChange}
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="soreThroat"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridFever">
              <Form.Label>Do you have fever?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="fever"
                onChange={this.handleChange}
                type="radio"
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="fever"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGriddiarrhea">
              <Form.Label>Do you have a diarrhea?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="diarrhea"
                onChange={this.handleChange}
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="diarrhea"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridnasalCongestion">
              <Form.Label>Do you have nasal congestion?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="nasalCongestion"
                onChange={this.handleChange}
                type="radio"
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="nasalCongestion"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridshortnessOfBreath">
              <Form.Label>Do you experince shortness of breath?</Form.Label>{" "}
              <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="shortnessOfBreath"
                onChange={this.handleChange}
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="shortnessOfBreath"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridfatigue">
              <Form.Label>Do you experience fatigue often?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="fatigue"
                onChange={this.handleChange}
                type="radio"
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="fatigue"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridlungDisease">
              <Form.Label>Do have any lung disease?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="lungDisease"
                onChange={this.handleChange}
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="lungDisease"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridheartDisease">
              <Form.Label>Do you have any heart disease?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="heartDisease"
                onChange={this.handleChange}
                type="radio"
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="heartDisease"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridhypertension">
              <Form.Label>Do have hypertension?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="hypertension"
                onChange={this.handleChange}
                required
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="hypertension"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGriddiabetes">
              <Form.Label>Do you have diabetes?</Form.Label> <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="diabetes"
                onChange={this.handleChange}
                required
                type="radio"
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="diabetes"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridlungtarvelled">
              <Form.Label>
                Have you travelled outside in the last 24 to 45 days?
              </Form.Label>{" "}
              <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                type="radio"
                name="travelled"
                required
                onChange={this.handleChange}
              />
              <Form.Check
                value={false}
                inline
                label="No"
                type="radio"
                name="travelled"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridheartinteraction">
              <Form.Label>
                Have you interacted with anyone who has been confirmed positive
                for COVID 19 recently?
              </Form.Label>{" "}
              <br />
              <Form.Check
                value={true}
                inline
                label="Yes"
                name="interaction"
                onChange={this.handleChange}
                required
                type="radio"
              />
              <Form.Check
                value={false}
                inline
                label="No"
                name="interaction"
                onChange={this.handleChange}
                type="radio"
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Continue
          </Button>
          {this.state.canRedirect ? <Redirect to="/hospitals" /> : <div></div>}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applicationForm: (data) => dispatch(applicationForm(data)),
    sendData: (data) => dispatch(sendData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
