import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBUjnw5xLzauv0gYqk-JtNN3yHNYTAh4lk",
    authDomain: "crack-covid.firebaseapp.com",
    databaseURL: "https://crack-covid.firebaseio.com",
    projectId: "crack-covid",
    storageBucket: "crack-covid.appspot.com",
    messagingSenderId: "8783552186",
    appId: "1:8783552186:web:aa2f8dfb3516e8f95eac83",
    measurementId: "G-ES0E2JTB90"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot =await userRef.get();

    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log("error in creating user", error.message);
        }
    }

    return userRef;
    
}



export const auth = firebase.auth();
export const firestore =  firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

