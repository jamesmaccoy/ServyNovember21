const initialState = {
  status: false,
  switchLoader: false,
  notifications: [],
  dynamicLink: "",
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SWITCH_LOADER":
      return {
        ...state,
        switchLoader: action.payload,
      };
    case "USER_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    case "DYNAMIC-LINK":
      return {
        ...state,
        dynamicLink: action.payload,
      };
      case "USER_INFO":
        return {
          ...state,
          userInfo: action.payload,
        };
      default:
      return state;
  }
}
