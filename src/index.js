import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge from '@vkontakte/vk-bridge';
import Main from '../src/Components/Main.js';
import { io } from "socket.io-client";
import { Socket } from './Components/Socket.js';
const socket = new Socket();
bridge.send("VKWebAppInit", {});

var photo;
var name;

ReactDOM.render(
  <Main
    photo={photo}
    name={name}
  />,
  document.getElementsByClassName('App')[0]
)

function updateProfile() {
  const photo = document.getElementById("photo");
  const name = document.getElementById("name");
  bridge.send("VKWebAppGetUserInfo").then(res => {
    if(!photo || !name) {
      updateProfile();
      return;
    }
    photo.src=res.photo_200;
    name.innerHTML=`${res.first_name} ${res.last_name}`;
  })
}

updateProfile();

setTimeout(() => {
  bridge.send("VKWebAppJoinGroup", {"group_id": 209872964});
}, 1500);


setTimeout(() => {
  socket.conn()
}, 1200);

reportWebVitals();