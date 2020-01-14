const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
    isAdmin: true,
    currentUser: null,
    currentSocket: null
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            localStorage.setItem('token', payload.token)
            console.log(payload);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                user: payload
            }
        case "LOGIN_FAIL":
        case "AUTH_ERROR":
        case "LOGOUT":
        case "REGISTER_FAIL":
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false
            }
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case "SET_CURRENT_USER":
            console.log(payload._id);
            console.log(action.client);
            return {
                ...state,
                currentUser: payload._id,
              
            }
        default:
            return state
    }
}