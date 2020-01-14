
const initialState = {
    data: null
};



export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "ONE_TWO_ONE":
            console.log(payload);
            return {
                ...state,
                data: payload
            }
        default:
            return state

    }
}