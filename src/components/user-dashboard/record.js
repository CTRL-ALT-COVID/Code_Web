import React, { useState, useEffect } from "react";
import { ReactMic } from "react-mic";
import firebase from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import {Button} from 'react-bootstrap';
import {sendStatus} from './../../store/actions/authActions';

const Recording = (props) => {
  const [recording, setRecording] = useState(false);
  const [firebaseUrl, setFirebaseUrl] = useState("");

  let storageRef = firebase.storage().ref();
  let userStorageRef = storageRef.child(`songs/${props.auth.uid}`);
  let songStorageRef = userStorageRef.child(`cough-audio`);

  useEffect(() => {
    try {
      songStorageRef.getDownloadURL().then(
        (url) => {
          setFirebaseUrl(url);
        },
        () => {}
      );
    } catch (ex) {
      console.log(ex.message);
    }
  }, [songStorageRef]);

  let b = "";
  const [url, setURL] = useState(b);

  const onStop = (recordedBlob) => {
    // if (firebase.auth().currentUser.isAnonymous) {
    //   alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
    //   return;
    // }
    console.log("recordedBlob:", recordedBlob);
    console.log(songStorageRef);

    let audioFile = recordedBlob.blob;
    songStorageRef.put(audioFile).then(() => {
      setFirebaseUrl(songStorageRef.getDownloadURL());

      console.log("song url", songStorageRef.getDownloadURL());
      songStorageRef.getDownloadURL().then(function (url) {
        console.log("file: ", url);
        setURL(url);
      });
    });
    props.sendStatus(status);


  };

  let temp = "gamma";

  const [name, setName] = useState(temp);
  const [status, setStatus] = useState("");

  // let k = 1;
  useEffect(() => {
    console.log("hola");
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, url: url }),
    };
    fetch("/submit", requestOptions)
      .then((response) => response.json())
      .then((data) => setStatus(data.status));
  }, [name, url]);

  const recordingChange = () => {
    setRecording(!recording);
  };
  console.log(status);

  return (
    <div>
      <div>
        <br />
        <ReactMic
          record={recording}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#fff"
          backgroundColor="#000"
          mimeType="audio/mp3"
          channelCount={1}
        />
        <br />
       
        <audio
          style={{ width: "75%", margin: "0px 2.5%", height: "70%" }}
          src={firebaseUrl}
          controls
        />

        <div>
        <Button onClick={recordingChange} style={{marginRight: 15}}>
          {recording ? "Stop" : "Record"}
        </Button>

          <Button onClick={props.saveSong}>Save</Button>
          
        </div>
        <div>
          <h6>Name: {props.profile.displayName}</h6> 
          <h5>Result: {status}</h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return{
    sendStatus : (data) =>dispatch(sendStatus(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recording);
