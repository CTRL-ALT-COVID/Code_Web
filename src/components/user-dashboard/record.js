// import React, { useState, useEffect } from 'react';
// import { ReactMic } from 'react-mic';
// import firebase from '../firebase/firebase.utils';
// import {connect} from 'react-redux';

// const Recording = (props) => {

//   const [recording, setRecording] = useState(false);
//   const [firebaseUrl, setFirebaseUrl] = useState("");

//   let storageRef = firebase.storage().ref();
//   let userStorageRef = storageRef.child(`songs/${Math.random()*1000}`);
//   let songStorageRef = userStorageRef.child(`cough-audio`);

//   useEffect(() => {
//     try {
//       songStorageRef.getDownloadURL().then((url) => {
//         setFirebaseUrl(url);
//       }, () => { });
//     } catch (ex) {
//       console.log(ex.message);
//     }

//   }, [songStorageRef]);


//   const onStop = (recordedBlob) => {
//     // if (firebase.auth().currentUser.isAnonymous) {
//     //   alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
//     //   return;
//     // }
//     console.log("recordedBlob:", recordedBlob);
//     console.log(songStorageRef);
//     let audioFile = recordedBlob.blob;
//     songStorageRef.put(audioFile).then(() => {
//       setFirebaseUrl(songStorageRef.getDownloadURL());  
//       console.log("song url",songStorageRef.getDownloadURL());
//     });
//   };

//   const recordingChange = () => {
//     setRecording(!recording);
//   }

//   const [name, setName]= useState("");
//   const [status, setStatus]= useState("");
//   useEffect(() => {
//     fetch("/getResult").then(res => res.json().then(data => {
// 			setName(data.username);
// 			setStatus(data.result);
// 		})
//   	);
// }, []);

//   return (
//     <div>
//       <div>
//         <br />
//         <ReactMic
//           record={recording}
//           className="sound-wave"
//           onStop={onStop}
//           strokeColor="#000000"
//           backgroundColor="#FF4081"
//           mimeType="audio/mp3"
//           channelCount={1}
//         />
//         <br />
//         <button onClick={recordingChange}>{recording ? "Stop" : "Record"}</button>

//         <audio style={{ width: '75%', margin: '0px 2.5%', height: '70%' }} src={firebaseUrl} controls />

//         <div >
//           <button onClick={props.saveSong}>Save</button>
//           <button onClick={props.exit}>Exit</button>
//         </div>
//       </div>

//     </div>
//   );

// }

// // const mapStateToProps = state => ({
// // 	currentUser: state.user.currentUser
// // 	});
	
// export default Recording;