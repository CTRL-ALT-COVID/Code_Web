import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import hospitalAuthReducer from './hospitalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  hospitalAuth: hospitalAuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

// the key name will be the data property on the state object