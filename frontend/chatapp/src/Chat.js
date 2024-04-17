import React, { useState } from 'react';
import socket from './App';


function Chat(username, room) {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = () => {

        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            try {
                socket.broadcast.emit("send_message", messageData);
            } catch (error) {
                console.log(error, messageData);
            }

        };
    };

    // useEffect(() => {
    //     socket.on("received_message", (data) => {
    //         console.log(data.message)
    //     })
    // }, [socket]);


    return (
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
            </div>
            <div className='chat-footer'>
                <input
                    className='current_message'
                    type='text'
                    placeholder='Enter Chat here...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat