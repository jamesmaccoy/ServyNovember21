import { SET_EXPO_TOKEN } from "../actions/SaveExpoToken";
const initialState = {
    expoToken: ''
}

function setExpoTokenReducer(state = initialState, action) {
    switch(action.type) {
        case SET_EXPO_TOKEN:
            return {...state, expoToken: action.payload};
        default:
            return {...state};
    }
}

export default setExpoTokenReducer;