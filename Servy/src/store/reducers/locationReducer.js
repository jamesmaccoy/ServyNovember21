const initialState = {
  userLocation: null,
  initialDistance: 2
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
      case "DISTANCE_RADIUS":
      return {
        ...state,
        initialDistance: action.payload,
      };  

    default:
      return state;
  }
}
