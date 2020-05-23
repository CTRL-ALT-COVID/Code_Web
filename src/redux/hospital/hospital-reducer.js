import { HospitalActionTypes } from './hospital-types';

const INITIAL_STATE = {
  currentUser: null
};

const hospitalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HospitalActionTypes.SET_CURRENT_HOSPITAL:
      return {
        ...state,
        hospital: action.payload
      };
    default:
      return state;
  }
};

export default hospitalReducer;