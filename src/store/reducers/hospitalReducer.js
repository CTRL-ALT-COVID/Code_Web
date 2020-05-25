const initState = {
  hospital: null,
};

const hospitalAuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "HOSPITAL_LOGIN_ERROR":
      console.log("hospital login error");
      return state;

    case "HOSPITAL_LOGIN_SUCCESS":
      console.log("hospital login success");
      return {
        ...state,
        hospital: action.user,
      };

    case "HOSPITAL_SIGNOUT_SUCCESS":
      console.log("hospital signout success");
      return state;

    case "HOSPITAL_SEND_DATA_ERROR":
      console.log("hospital signout success");
      return state;
      case "PATIENT_UPDATE_SUCCESS":
        console.log("patient update success");
        return state;

    default:
      return state;
  }
};

export default hospitalAuthReducer;
