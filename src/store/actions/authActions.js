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
    const profile = getState().firebase.profile;
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

    console.log(profile);
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
      })
      .then(() => {
        dispatch({ type: "APPLICATION_FORM" });
      })
      .catch((err) => {
        dispatch({ type: "APPLICATION_FORM_ERROR", err });
      });

    if (profile.thinksHasCovid) {
      firestore
        .collection("hospital-users")
        .doc("patients")
        .update({
          covid_patients: firestore.FieldValue.arrayUnion(uid),
        })
        .catch((err) => {
          console.error(err);
        });
    } else
      firestore
        .collection("hospital-users")
        .doc("patients")
        .update({
          not_covid_patients: firestore.FieldValue.arrayUnion(uid),
        })
        .catch((err) => {
          console.error(err);
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
    const uid = getState().firebase.auth.uid;
    if (profile.thinksHasCovid) {
      firestore
        .collection("hospitals")
        .get()
        .then((resp) => {
          resp.forEach((hospital) => {
            const data = hospital.data();
            if (data.only_covid) hospitals.push(data);
          });

          hospitals.forEach(({ hospital_slug }) => {
            console.log(hospital_slug);
            firestore
              .collection("hospitals")
              .doc(hospital_slug)
              .update({
                covid_patients: firestore.FieldValue.arrayUnion(uid),
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

          hospitals.forEach(({ hospital_slug }) => {
            console.log(hospital_slug);
            firestore
              .collection("hospitals")
              .doc(hospital_slug)
              .update({
                not_covid_patients: firestore.FieldValue.arrayUnion(uid),
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
