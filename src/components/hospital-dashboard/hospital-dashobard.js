import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PatientSummary from "./patient-summary";

class HospitalDashboard extends React.Component {
  render() {
    const { hospital } = this.props;
    return (
      <div className="hospitals">
        <h2 className="heading">Patients who need Medication</h2>
        <br />
        {hospital ? (
          hospital.covid_patients ? (
            hospital.covid_patients.map((patient) => {
              return <PatientSummary patients={patient} />;
            })
          ) : (
            hospital.not_covid_patients.map((patient) => {
              return <PatientSummary patients={patient} />;
            })
          )
        ) : (
          <h3>Loading Patients</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const uid = state.firebase.auth.uid;
  const hospital_user = state.firestore.ordered.hospital_users;

  const hospital = hospital_user
    ? hospital_user.filter((user) => {
        if (user.id === uid) return user;
      })[0]
    : null;

  return {
    hospital: hospital,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "hospitals" },
    { collection: "hospital_users" },
  ])
)(HospitalDashboard);
