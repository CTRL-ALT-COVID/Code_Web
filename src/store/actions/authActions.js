export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    console.log("hey");
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          displayName: newUser.displayName,
          email: newUser.email,
          createdAt: new Date(),
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const completeProfile = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    firestore
      .collection("users")
      .doc(uid)
      .update({
        gender: data.gender,
        age: data.age,
        phone: data.phone,
        location: data.location,
      })
      .then(() => {
        dispatch({ type: "COMPLETE_PROFILE" });
      })
      .catch((err) => {
        dispatch({ type: "COMPLETE_PROFILE_ERROR", err });
      });
  };
};

export const applicationForm = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const {
      soreThroat,
      fever,
      diarrhea,
      nasalCongestion,
      shortnessOfBreath,
      fatigue,
      diabetes,
      lungDisease,
      hypertension,
      heartDisease,
      travelled,
      interaction,
    } = data;

    let score = 0;
    if (fever === true) score = score + 0.879;
    if (fatigue === true) score = score + 0.381;
    if (shortnessOfBreath) score = score + 0.186;
    if (soreThroat) score = score + 0.139;
    if (nasalCongestion) score = score + 0.48;
    if (diarrhea) score = score + 0.37;
    if (diabetes) score = score + 0.2;
    if (lungDisease) score = score + 0.2;
    if (hypertension) score = score + 0.2;
    if (travelled) score = score + 0.2;
    if (heartDisease) score = score + 0.2;
    if (interaction) score = score + 0.8;

    data.score = score;
    firestore
      .collection("users")
      .doc(uid)
      .update({
        soreThroat: data.soreThroat,
        fever: data.fever,
        diarrhea: data.diarrhea,
        nasalCongestion: data.nasalCongestion,
        shortnessOfBreath: data.shortnessOfBreath,
        fatigue: data.fatigue,
        lungDisease: data.lungDisease,
        hypertension: data.hypertension,
        diabetes: data.diabetes,
        heartDisease: data.heartDisease,
        travelled: data.travelled,
        interaction: data.interaction,
        score: data.score,
        uid: data.uid,
      })
      .then(() => {
        dispatch({ type: "APPLICATION_FORM" });
      })
      .catch((err) => {
        dispatch({ type: "APPLICATION_FORM_ERROR", err });
      });
  };
};

export const diseaseData = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    firestore
      .collection("users")
      .doc(uid)
      .update({
        thinksHasCovid: data.thinksHasCovid,
        hasOtherDiseases: data.hasOtherDiseases,
        otherDiseases: data.otherDiseases,
      })
      .then(() => {
        dispatch({ type: "DISEASE_DATA" });
      })
      .catch((err) => {
        dispatch({ type: "DISEASE_DATA_ERROR", err });
      });
  };
};

export const sendData = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const hospitals = [];
    if (profile.thinksHasCovid) {
      firestore
        .collection("hospitals")
        .get()
        .then((resp) => {
          console.log(resp);
          resp.forEach((hospital) => {
            const data = hospital.data();
            if (data.only_covid) hospitals.push(data);
          });

          hospitals.forEach(({ uid }) => {
           
            firestore
              .collection("hospital_users")
              .doc(uid)
              .update({
                covid_patients: firestore.FieldValue.arrayUnion(profile),
              });
          });
        })
        .catch((err) => {
          dispatch({ type: "SEND_DATA_ERROR", err });
        });
    }else{
      firestore
        .collection("hospitals")
        .get()
        .then((resp) => {
          resp.forEach((hospital) => {
            const data = hospital.data();
            if (data.only_covid ===false) hospitals.push(data);
          });

          hospitals.forEach(({ uid }) => {
            firestore
              .collection("hospital_users")
              .doc(uid)
              .update({
                not_covid_patients: firestore.FieldValue.arrayUnion(profile),
              });
          });
        }).then(() => {
          dispatch({ type: "SEND_DATA" });
        })
        .catch((err) => {
          dispatch({ type: "SEND_DATA_ERROR", err });
        });
    }
  };
};

export const acceptedRejectHospital = (id, accepted) => {
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
          let patients= [];
          if (user_patients.uid === id) {
            if (user_patients.covid_patients) patient_data = user_patients.covid_patients;
            else patient_data = user_patients.not_covid_patients;
            console.log(patient_data);
            patient_data.map((patient) => {
              if (patient.uid === uid) {
                let new_patient = {
                  ...patient, 
                  coming: accepted
                };
                console.log(new_patient)
                patients.push(new_patient)
                return new_patient;}
                patients.push(patient)
                return patient;
            });
            console.log(patients);
            if (user_patients.covid_patients)
            firestore.collection("hospital_users").doc(id).update({
              covid_patients: patients,
            });
          else
            firestore.collection("hospital_users").doc(id).update({
              not_covid_patients: patients,
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

export const sendStatus = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    firestore
      .collection("users")
      .doc(uid)
      .update({
       status: data
      })
      .then(() => {
        dispatch({ type: "DISEASE_DATA" });
      })
      .catch((err) => {
        dispatch({ type: "DISEASE_DATA_ERROR", err });
      });
  };
};