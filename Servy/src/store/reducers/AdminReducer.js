const initialState = {
  servicesList: [],
  users: [],
  currentData: null,
  adminLoading: false,
};

export default function AdminReducer(state = initialState, action) {
  switch (action.type) {
    case "SERVICES_LIST":
      return {
        ...state,
        servicesList: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "CURRENT_USER_LISTING":
      return {
        ...state,
        currentData: action.payload,
      };
    case "ADMIN_LISTING_LOADING":
      return {
        ...state,
        adminLoading: action.payload,
      };

    default:
      return state;
  }
}
