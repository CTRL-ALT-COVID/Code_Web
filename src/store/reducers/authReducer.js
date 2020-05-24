const initState = {
  authError: null,
  user: null,
  isLoading: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        user: action.user,
        isLoading: action.isLoading,
        authError: "Login failed",
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        user: action.user,
        isLoading: action.isLoading,
        authError: null,
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };
    case "COMPLETE_PROFILE":
      console.log("completed profile");
      return state;

    case "COMPLETE_PROFILE_ERROR":
      console.log("completed profile error");
      return state;

    case "APPLICATION_FORM":
      console.log("application sent");
      return state;

    case "APPLICATION_FORM_ERROR":
      console.log("application error");
      return state;

    case "DISEASE_DATA":
      console.log("disease data sent");
      return state;

    case "DISEASE_DATA_ERROR":
      console.log("disease data error");
      return state;

    case "SEND_DATA":
      console.log("data sent");
      return state;
      
    case "SEND_DATA_ERROR":
      console.log("send data error");
      return state;

    default:
      return state;
  }
};

export default authReducer;
