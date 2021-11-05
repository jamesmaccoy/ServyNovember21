import { GET_BOOKINGS, GET_PROVIDER_BOOKINGS, GET_ALL_PROVIDER_BOOKINGS, GET_BOOKING_BY_ID } from "../actions/Booking";
const initialState = {
    bookings: [],
    pbookings: [],
    allBookings: [],
    booking: {},
}

function bookingsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_BOOKINGS:
            return {...state, bookings: action.payload};
        case GET_PROVIDER_BOOKINGS:
            return {...state, pbookings: action.payload};
        case GET_ALL_PROVIDER_BOOKINGS:
            return {...state, allBookings: action.payload};
        case GET_BOOKING_BY_ID:
            return {...state, booking: action.payload};
    
        default:
            return {...state};
    }
}

export default bookingsReducer;