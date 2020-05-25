import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap";
import { acceptedRejectedPatient } from "../../store/actions/hospitalAuthActions";
import { connect } from "react-redux";

class PatientSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: false,
      reject: false,
    };
  }

  acceptPatient = (user) => {
    this.props.acceptedRejectedPatient(user['uid'], true);
   
  };
  rejectPatient = (user) => {
    this.props.acceptedRejectedPatient(user["uid"], false);
    
  };
  render() {
    const { patients } = this.props;

    return (
      <div>
        <CardDeck className="justify-content-center">
            {console.log(patients["0"]["uid"])}
          {patients
            ? 
                  <Card className="hospital-card" >
                      
                    <Card.Body>
                      <Card.Title>
                        {patients["0"]["displayName"]}
                        <br />
                        <br />
                        <h4>Patient Details:</h4>
                      </Card.Title>
                      <Card.Text className="text">
                        <br />
                        {patients["0"]["thinksHasCovid"] ? "Thinks has Covid19" : null}
                        <br />
                        {patients["0"]["otherDiseases"] !== ""
                          ? "Wants Medication for the diseases: " +
                          patients["0"]["otherDiseases"]
                          : null}
                        <br />
                        {"Age: " +patients["0"]["age"]} <br />
                        {"Gender: " + patients["0"]["gender"]}
                        <br />
                        {"Risk factor: " + patients["0"]["score"]}
                        <br />
                        {"Sore throat: " + patients["0"]["soreThroat"]}
                        <br />
                        {"Fever fever: " + patients["0"]["age"]}
                        <br />
                        {"Diarrhea: " + patients["0"]["diarrhea"]}
                        <br />
                        {"Nasal Congestion: " + patients["0"]["nasalCongestion"]}
                        <br />
                        {"Shortness of Breath: " + patients["0"]["shortnessOfBreath"]}
                        <br />
                        {" Fatigue: " + patients["0"]["fatigue"]}
                        <br />
                        {"Lung Disease: " + patients["0"]["lungDisease"]}
                        <br />
                        {" Hypertension : " + patients["0"]["hypertension"]}
                        <br />
                        {"Diabetes: " + patients["0"]["diabetes"]}
                        <br />
                        {"Heart Disease: " + patients["0"]["heartDisease"]}
                        <br />
                        {"Travelled outside India : " + patients["0"]["travelled"]}
                        <br />
                        {"Interacted with a Covid19 postive patient : " +
                          patients["0"]["interaction"]}
                        <br />
                        <br />
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {patients["0"]["accepted"] === undefined ? (
                        <div>
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => this.acceptPatient(patients["0"])}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            onClick={() => this.rejectPatient(patients["0"])}
                            style={{ marginLeft: 15 }}
                          >
                            Reject
                          </Button>{" "}
                        </div>
                      ) : patients["0"]["accepted"] ? (
                        <div className="accepted">Accepted</div>
                      ) : !patients["0"]["accepted"] ? (
                        <div className="rejected">Rejected</div>
                      ) : null}
                      {/* <small className="text-muted">
                        {hospital.only_covid
                          ? "Attending Covid19 Patients only"
                          : "Attending all kinds of patients"}
                        </small> */}
                  </Card.Footer> 
                  </Card>
                
              
            : "Loading"}
        </CardDeck>
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
    acceptedRejectedPatient: (id, accepted) =>
      dispatch(acceptedRejectedPatient(id, accepted)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientSummary);
