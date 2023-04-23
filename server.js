const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { newuser, getusersRoom, getCurrentUser, userLeave } = require('./user');
const format = require('./format');
const app = express()
const server = http.createServer(app)
const io = socketio(server)


server.listen(8080, () => {
    console.log("server is connected to port no 8080");
})

io.on("connection", (socket) => {
    console.log("New User joined");
    socket.on("newuser", ({ username, room }) => {

        const user = newuser(username, room, socket.id)
        socket.join(user.room)//nxm
        socket.emit("message", format("Masai Server", "welcome to masai server"))

        socket.broadcast.to(user.room).emit("message", format("Masai Server", `${username} joined the chat`))

        io.to(room).emit("roomusers", {
            room: user.room,//nxm
            users: getusersRoom(user.room)
        })

        socket.on("newmessage", (msg) => {
            const user = getCurrentUser(socket.id)
            io.to(user.room).emit("message", format(user.username, msg))
        })

        socket.on("disconnect", () => {
            let user = userLeave(socket.id)
            socket.broadcast.to(user.room).emit("message", format("Masai Server", `${username} Left the chat`))
            //updating on room that user is left
            io.to(room).emit("roomusers", {
                room: user.room,
                users: getusersRoom(user.room)
            })
            

        })


    })
})