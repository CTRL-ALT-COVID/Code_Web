
import { HospitalActionTypes } from './hospital-types';

export const setCurrentHospital = hospital => ({
  type:HospitalActionTypes.SET_CURRENT_HOSPITAL,
  payload: hospital
});