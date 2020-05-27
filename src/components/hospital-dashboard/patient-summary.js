import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap";
import { acceptedRejectedPatient } from "../../store/actions/hospitalAuthActions";
import { connect } from "react-redux";

class PatientSummary extends React.Component {
  acceptPatient = (user) => {
    console.log(user);
    this.props.acceptedRejectedPatient(user["uid"], true);
  };
  rejectPatient = (user) => {
    this.props.acceptedRejectedPatient(user["uid"], false);
  };
  render() {
    const { patients } = this.props;
    let data = 0;
    if (patients["status"] === "safe") data = 0.89;
    else data = 0.11;
    return (
      <div>
        <CardDeck className="justify-content-center">
          {patients ? (
            <Card className="hospital-card">
              <Card.Body>
                <Card.Title>
                  {patients["displayName"]}
                  <br />
                  <br />
                  <h4>Patient Details:</h4>
                </Card.Title>
                <Card.Text className="text">
                  {patients["thinksHasCovid"]
                    ? "The patient thinks he/she has Covid19"
                    : null}
                  <br />
                  {
                    <h6
                      style={{ marginTop: 10, marginBottom: 10, color: "red" }}
                    >
                      Risk factor for COVID19:{" "}
                      {Math.floor(
                        ((data + patients["score"] / 7.541) / 2) * 100
                      )}{" "}
                      %{" "}
                    </h6>
                  }
                  {patients["otherDiseases"] !== "" ? (
                    <div>
                      Wants Medication for the diseases:
                      {patients["otherDiseases"]} <br />{" "}
                    </div>
                  ) : null}
                  {"Age: " + patients["age"]} <br />
                  {"Gender: " + patients["gender"]}
                  <br />
                  {"Sore throat: " + patients["soreThroat"]}
                  <br />
                  {"Fever fever: " + patients["age"]}
                  <br />
                  {"Diarrhea: " + patients["diarrhea"]}
                  <br />
                  {"Nasal Congestion: " + patients["nasalCongestion"]}
                  <br />
                  {"Shortness of Breath: " + patients["shortnessOfBreath"]}
                  <br />
                  {" Fatigue: " + patients["fatigue"]}
                  <br />
                  {"Lung Disease: " + patients["lungDisease"]}
                  <br />
                  {" Hypertension : " + patients["hypertension"]}
                  <br />
                  {"Diabetes: " + patients["diabetes"]}
                  <br />
                  {"Heart Disease: " + patients["heartDisease"]}
                  <br />
                  {"Travelled outside India : " + patients["travelled"]}
                  <br />
                  {"Interacted with a Covid19 postive patient : " +
                    patients["interaction"]}
                  <br />
                  <br />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {patients["accepted"] === undefined ? (
                  <div>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => this.acceptPatient(patients)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => this.rejectPatient(patients)}
                      style={{ marginLeft: 15 }}
                    >
                      Reject
                    </Button>{" "}
                  </div>
                ) : patients["accepted"] ? (
                  <div className="accepted" style={{ color: "green" }}>
                    Accepted
                  </div>
                ) : !patients["accepted"] ? (
                  <div className="rejected" style={{ color: "red" }}>
                    Rejected
                  </div>
                ) : null}
                {patients["coming"] === undefined ? null : patients[
                    "coming"
                  ] === true ? (
                  <div
                    className="accepted float-right"
                    style={{ color: "green" }}
                  >
                    The patient will be coming
                  </div>
                ) : (
                  <div
                    className="accepted  float-right"
                    style={{ color: "red" }}
                  >
                    The patient will not be coming
                  </div>
                )}
              </Card.Footer>
            </Card>
          ) : (
            "Loading"
          )}
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
