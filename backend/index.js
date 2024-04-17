const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');


app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"],
        optionSuccessStatus: 200,
    },
});

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         credentials: true,
//         methods: ["GET", "POST"],
//         optionSuccessStatus: 200,
//     },
// });

io.on("connect", (socket) => {
    console.log(`User connected : ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("received_message", data);
        //const myJSON = JSON.stringify(data);
        console.log(data);
    });



    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});


server.listen(3001, () => {
    console.log("Server running on 3001");
});