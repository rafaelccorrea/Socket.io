const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
let port = 8000;

io.on("connection", (socket) => {

    socket.on("disconnect", () => {
        console.log("Disconnect: " + socket.id);
    })

    socket.on("msg", (data) => {
        io.emit("showMessage", data);
        console.log("Message: " + data);
    })

});

app.set("view engine", "ejs");

app.use(require('cors')())

app.get("/", (req, res) => {
    res.render("index")
})

http.listen(port, (req, res) => {
    console.log("listening on port: " + port);
})