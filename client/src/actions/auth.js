import axios from 'axios';


import setAuthToken from '../utils/setAuthToken'


//Load User
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        console.log(res.data)
       

        dispatch({
            type: "USER_LOADED",
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        })
    }

}
//Set Current User

export const setCurrentUser = ( clientSocket ) => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: "SET_CURRENT_USER",
            payload: res.data,

        })

    } catch (err) {
        console.log(err.message)
    }

}



//Register User
export const register = ({ name, email, password }) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });

    try {

        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });


    } catch (err) {

        console.log(err.message)
        dispatch({
            type: "REGISTER_FAIL"
        })
    }

}

//Login User
export const login = ({ email, password }) => async dispatch => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });

    try {

        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });


    } catch (err) {

        const errors = err.response.data.errors

        console.log(errors)
        dispatch({
            type: "LOGIN_FAIL"
        })
    }

}

//Logout User

export const logout = () =>async dispatch => {
    await axios.get('logout')
    dispatch({
        type: "LOGOUT"
    })
}


