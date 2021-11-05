export const getCurrentLocation = (location) => async (dispatch, getState) => {
  dispatch({
    type: "USER_LOCATION",
    payload: location,
  });
};

export const distanceRadius = (distance) => async (dispatch) => {
  dispatch({
    type: "DISTANCE_RADIUS",
    payload: distance,
  });
};
