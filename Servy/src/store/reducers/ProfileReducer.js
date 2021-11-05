const initialState = {
    profileInformation:[]
  };
  
  export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case "PROFILE_INFO":
          return {
            ...state,
            profileInformation: action.payload,
          };
      default:
        return state;
    }
  }
  