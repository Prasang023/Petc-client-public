import './style.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useRef, useState , useEffect } from "react"
import VideoCam from "./VideoCallComps/VideoCam"
import Mic from "./VideoCallComps/Mic"
import Chatbox from "./VideoCallComps/Chatbox"
import { Chatbtn } from "./VideoCallComps/Chatbox"
import CallEndIcon from '@mui/icons-material/CallEnd';
import firebase from 'firebase'

function GetUser(){
  const id = localStorage.getItem('userId')
  const [data,setdata] = useState([])
  useEffect(() => {
      firebase.firestore()
      .collection('users')
      .onSnapshot((snapshot) =>{
          setdata(snapshot.docs.map((doc)=>doc.data()))
      })
  }, [])

  for(var i=0 ; i<data.length ; i++){
      if(data[i]['id']==id){
          setdata(data[i])
      }
  }
  return data;
}
//import WebSocket from 'websocket'
const Reciever = props => {
    const User = GetUser()
    console.log(User.name)
    const chatRef = useRef();
    const btnRef = useRef();
    const { history } = props
    let currentMeeting = sessionStorage.getItem('currentMeeting')
    // const webSocket = new WebSocket("ws://intense-reef-21186.herokuapp.com/")
    // const webSocket = new WebSocket("wss://intense-reef-21186.herokuapp.com/")
    const webSocket = new WebSocket("ws://localhost:5000/")


webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data))
}

function handleSignallingData(data) {
    switch (data.type) {
        case "offer":
            peerConn.setRemoteDescription(data.offer)
            createAndSendAnswer()
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
            break
        case "chat_message":
            console.log(data.message)
            chatRef.current.childChat(data)
    }
}

function createAndSendAnswer () {
    peerConn.createAnswer((answer) => {
        peerConn.setLocalDescription(answer)
        sendData({
            type: "send_answer",
            answer: answer
        })
    }, error => {
        console.log(error)
    })
}

function sendData(data) {
    data.username = username
    if(webSocket.readyState === 1){
    console.log(webSocket)
    console.log(data)
    webSocket.send(JSON.stringify(data))
    console.log("Connection Successful")
    }
    else{
        console.log(webSocket.readyState)
    }
}


let localStream
let peerConn
let username

function joinCall() {

    username = document.getElementById("username-input").value

    document.getElementById("video-call-div")
    .style.display = "inline"

    let constraints = {
        video: {
            frameRate: 24,
            width: {
                min: 480, ideal: 720, max: 1280
            },
            aspectRatio: 1.33333
        },
        audio: true 
    };

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
        console.log(stream)
        localStream = stream
        let video = document.getElementById("local-video")
            video.srcObject = localStream
            video.onloadedmetadata = function(e) {
                video.play();
            };

        let configuration = {
            iceServers: [{
                urls: [ "stun:bn-turn1.xirsys.com" ]
             }, {
                username: "28B_rPlXwIxNUeQMhf-UyQlDUFBfDQKaJpmeU4-CX5dC5dD2guv8FBFPN-8LikaqAAAAAGF_wZRwcmFzYW5n",
                credential: "9eb1632a-3afe-11ec-b475-0242ac140004",
                urls: [
                    "turn:bn-turn1.xirsys.com:80?transport=udp",
                    "turn:bn-turn1.xirsys.com:3478?transport=udp",
                    "turn:bn-turn1.xirsys.com:80?transport=tcp",
                    "turn:bn-turn1.xirsys.com:3478?transport=tcp",
                    "turns:bn-turn1.xirsys.com:443?transport=tcp",
                    "turns:bn-turn1.xirsys.com:5349?transport=tcp"
                ]
             }]
            // iceServers: [
            //     {
            //         "urls": ["stun:stun.l.google.com:19302"]
            //     }
            // ]
        }

        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)

        peerConn.onaddstream = (e) => {
            document.getElementById("remote-video")
            .srcObject = e.stream
        }

        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            
            sendData({
                type: "send_candidate",
                candidate: e.candidate
            })
        })

        sendData({
            type: "join_call"
        })

    })
    .catch(function(error) {
        console.log(error)
    })
}

function removeVideo(){
    let constraints = {
        video: false,
        audio: false 
    };

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
        console.log("Access Removed")
        })
        .catch(function(error) {
            console.log(error)
        })
    }

let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    if(localStream!=null)
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    if(localStream!=null)
    localStream.getVideoTracks()[0].enabled = isVideo
}

function shut(){
    console.log("shut down called")
    peerConn.close()
    webSocket.close()
    localStream.getTracks().forEach(track => track.stop())
    history.push("/userprofile")
}

function send(obj){
    console.log("send tapped")
    obj.type = "chat_message"
    sendData(obj)
}

function hide(){
    chatRef.current.hide()

}

function closeicon(){
    btnRef.current.changeBtn()
}

    return ( 
        <div>
            <div className="input-div">
                {/* <input placeholder='Enter username' type='text' id='username-input' value={currentMeeting} /> */}
                <TextField sx={{ padding: '5px 5px'}} type='text' id='username-input'
                value ={currentMeeting}
            // label='Enter your email or Phone Number' 
             size="small" />
                <br />
                <Button variant="contained" onClick={joinCall}>Join Call</Button>
            </div>
            <div id="video-call-div">
                <video muted id="local-video" autoPlay></video>
                <video id="remote-video" autoPlay></video>
                <div className='call-action-div'>
                <div className='action' onClick={muteVideo}><VideoCam /></div>
                <div className='action' onClick={muteAudio}><Mic /></div>
                <div className='action' onClick={shut}><Button variant="contained" color="primary" size="large"><CallEndIcon /></Button></div>
                <div className='action' onClick={hide}><Chatbtn ref={btnRef} /></div>
                </div>
                <div id='chat-box' style={{ height: '100%', Color : '#fff', position: 'absolute', right: '0', top: '0', zIndex: '2' }}>
                <Chatbox 
                    ref={chatRef}
                    call={send}
                    closeicon={closeicon}
                />
                </div>
            </div>
        </div>
     );
}
 
export default Reciever;