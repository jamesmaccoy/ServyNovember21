import { GET_NOTIFICATIONS } from "../actions/Notifications";
const initialState = {
    notifications: []
}

function notificationsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_NOTIFICATIONS:
            return {...state, notifications: action.payload};
        default:
            return {...state};
    }
}

export default notificationsReducer;