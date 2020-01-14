import io from 'socket.io-client'
import { Socket } from 'dgram';
import axios from 'axios'
import jwt from 'jsonwebtoken';
// import config from 'config'
let socket = io('http://localhost:5000')
let data;



socket.on('connect', async () => {
  let token = localStorage.getItem('token');

  //  await axios.update('/updatesocket');
  if (token) {
    const decoded = jwt.verify(token, "MYJSONWEBTOKENSECRET");

    let userId = decoded.user.id
    let socketId = socket.id;
    data = {
      socketId, 
      userId
    }
    socket.emit('check user', data)
  }


})

const initialState = {
  data: socket
};



export default function (state = initialState, action) {

  return state
}