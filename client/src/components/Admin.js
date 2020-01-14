import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import io from 'socket.io-client'
import { Socket } from 'dgram';
import { connect } from 'react-redux'
import socket from '../reducers/socket'
import auth from '../reducers/auth'
import { one } from '../actions/oneone'


class Admin extends React.Component {

    state = { array: [] }

    constructor(props) {
        super();
        // if(props.isAuthenticated)
        props.Socket.data.on('users_updated', (data) => {
            this.setState({
                array: data
            })
        })
        
    }

    onClick = (event) => {
        this.props.one(event.target.value)
    }

    render() {



        return (
            this.state.array.map((user, index) => (
                <button value={user} onClick={this.onClick}>{user.userId} {index + 1}</button>
            ))

        )

    }

}

Admin.propTypes = {

    Socket: PropTypes.object.isRequired,
    one: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

}
const mapStateToProps = state => ({
    Socket: state.socket,
    isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, { socket, one, auth })(Admin)
