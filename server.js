const app = require("express")();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var adminId;
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./middelware/auth')
const User = require('./models/User')
let currentSocket;
let currentUser;
let allUsers = [];
let main = [];



//Connect Database
connectDB();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json({
    extended: true
}))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


app.put('/updatesocket', auth, async (req, res) => {

    const user = await User.findById(req.user.id).select('-password');
    user.sockets = allUsers;
    await user.save()
    return res.json(user)

})



io.on('connection', (socket) => {

    console.log("New Join " + socket.id + " on URL : " + socket.handshake.headers.referer);


    allUsers.push(socket.id);

    console.log(allUsers);

    socket.on('check user', function (data) {
        let flag = true;
        if (main) {
            currentUser = data.userId;
            main.map((obj) => {
                if (data.userId == obj.userId) {
                    flag = false;
                    obj.sockets.push(data.socketId)
                }
            })
            console.log(main)
        }
        if (data.userId && flag) {
            currentUser = data.userId;
            let user = {
                userId: data.userId,
                sockets: [data.socketId]
            }
            main.push(user)
            console.log(main);

        }

        if (socket.handshake.headers.referer == "http://localhost:3000/admin") {

            socket.emit('users_updated', main);
        }
        else {
            socket.broadcast.emit('users_updated', main);

        }
    })


    socket.on('chat message', async (data) => {
        if (data.isAdmin == true) {
            adminId = socket.id;
            // const user = await User.findById(currentUser).select('-password');

            // console.log(user.sockets)
            main.map((obj) => {
                if (obj.userId == currentUser) {
                    obj.sockets.map((soc, index) => {

                        io.to(soc).emit('chat message', data.msg.text || data.msg.emoji);
                    })
                }
            })



            // io.to(data.selectedSocket).emit('chat message', data.msg.text || data.msg.emoji);
        }
        else {
            io.to(adminId).emit('chat message', data.msg.text || data.msg.emoji)
        }
    });

    socket.on('disconnect', () => {
        main.map((obj, index) => {
            if (obj.userId == currentUser) {
                obj.sockets.splice(obj.sockets.indexOf(socket.id), 1)
            }
        })
        allUsers.splice(allUsers.indexOf(socket.id), 1);
        console.log("USer disconnected")

        console.log(socket.id + " Leaves")
        console.log(main)

        socket.broadcast.emit('users_updated', main);


    })
});

app.get('/logout', (req, res) => {
    console.log("LOGOUT");
    main.map((obj) => {
        main.splice(obj.userId.indexOf(currentUser), 1)
    })
    console.log(main);
    return res.json()
})



http.listen(5000, () => {
    console.log("Server Started")
})