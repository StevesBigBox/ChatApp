import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat.js';

const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log(`User connected ${socket.id}`);
});

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      try {
        await socket.emit("join_room", room);
      } catch (error) {
        console.log(error);

      }
      
      
    }
  };

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input
        type='text'
        placeholder='Your name ...'
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type='text'
        placeholder='Room ID...'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>

      <Chat socket={socket} username={username} room={room}/>

    </div>
  );
}

export default App;
