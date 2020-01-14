import {combineReducers} from 'redux';
import socket from './socket'
import oneone from './oneone'
import auth from './auth'
export default combineReducers({socket,oneone,auth});