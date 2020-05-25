export const signInHospital = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((rsp) => {
        firestore
          .collection("hospitals")
          .get()
          .then((resp) => {
            resp.forEach((hospital) => {
              const data = hospital.data();
              if (data.uid === rsp.user.uid) {
                firestore
                  .collection("hospital_users")
                  .doc(data.uid)
                  .update({
                    hospital_slug: data.hospital_slug,
                    govt: data.govt,
                    review: data.review,
                    uid: data.uid,
                    name: data.name,
                    phone: data.phone,
                    location: data.location,
                    no_of_beds: data.no_of_beds,
                    no_of_ventilators: data.no_of_ventilators,
                    speciality: data.speciality,
                    only_covid: data.only_covid,
                    address: data.address,
                    email: data.email,
                  })
                  .catch((err) => {
                    console.log(err);
                    dispatch({ type: "HOSPITAL_SEND_DATA_ERROR", err });
                  });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: "HOSPITAL_SEND_DATA_ERROR", err });
          });
      })
      .then(() => {
        dispatch({ type: "HOSPITAL_LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "HOSPITAL_LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "HOSPITAL_SIGNOUT_SUCCESS" });
      });
  };
};

export const acceptedRejectedPatient = (id, accepted) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    firestore
      .collection("hospital_users")
      .get()
      .then((resp) => {
        resp.docs.forEach((doc) => {
          let user_patients = doc.data();
          let patient_data ={}
          /* Make data suitable for rendering */
          
          if (user_patients.uid === uid) {
            if (user_patients.covid_patients) patient_data = user_patients.covid_patients;
            else patient_data = user_patients.not_covid_patients;

            let patient = patient_data.filter((patient) => {
              if (patient.uid === id) return patient;
            });
            console.log(patient[0])
            patient[0] ={
              ...patient[0],
              accepted: accepted
            };
            console.log(patient[0])
            if (user_patients.covid_patients)
              firestore.collection("hospital_users").doc(uid).update({
                covid_patients: patient,
              });
            else
              firestore.collection("hospital_users").doc(uid).update({
                not_covid_patients: patient,
              });
          }
        })
      })
      
      .then(() => {
        dispatch({ type: "PATIENT_UPDATE_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "HOSPITAL_SEND_DATA_ERROR", err });
      });
  };
};
