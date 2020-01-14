import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Launcher } from 'react-chat-window'
import PropTypes from 'prop-types'
import socket from '../reducers/socket'
import { register } from '../actions/auth'
import { setCurrentUser } from '../actions/auth'
import axios from 'axios'




let data;


class ChatBox extends React.Component {





  constructor(props) {
    super();
    axios.put('updatesocket');

    if (window.location.pathname == '/') {
      props.setCurrentUser();
    }
    props.Socket.data.on('connection',()=>{
      let token=localStorage.getItem('token')
     props.Socket.data.emit('check token',token)
    })
    props.Socket.data.on('chat message', (message) => {


      
      this.setState({
        messageList: [...this.state.messageList, { type: 'text', author: 'them', data: { text: message } }]
      })

    })



    this.state = {
      messageList: []
    };

  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    let x = this.state.messageList;
    console.log(x);
    let msg = message.data;
    let id = this.props.Socket.data.id;
    let selectedSocket = this.props.One.data
    let url = window.location.origin + window.location.pathname;


    console.log(url);
    if (url == 'http://localhost:3000/admin') {
      data = { msg, id, selectedSocket, url, isAdmin: true };
    }
    else {
      data = { msg, id, selectedSocket, url, isAdmin: false };

    }

    this.props.Socket.data.emit('chat message', data)



    console.log(this.state.messageList);
  }

  _sendMessage(text) {

    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })

    }
  }


  render() {


    if (this.props.isAuthenticated || window.location.pathname == "/admin") {
      return (<div>

        <Launcher
          agentProfile={{
            teamName: 'Messenger 2',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}

          onMessageWasSent={this._onMessageWasSent.bind(this)}

          messageList={this.state.messageList}

          showEmoji
        />


      </div>)
    }
    else {
      return null
    }
  }
}
ChatBox.propTypes = {

  Socket: PropTypes.object.isRequired,
  One: PropTypes.object.isRequired,

  setCurrentUser: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  Socket: state.socket,
  One: state.oneone,
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { socket, register, setCurrentUser })(ChatBox);