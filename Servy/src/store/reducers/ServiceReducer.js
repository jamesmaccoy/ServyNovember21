const initialState = {
  serviceMessage: false,
  serviceLoading: false,
  services: [],
  categoryFeatures: [],
  serviceProviderInfo: [],
  reviewsList: [],
  userReviewInfo: [],
  loader: true,
  serviceLoader: true,
  uploadData: [],
  deleteService: false,
  userServices: [],
  optionSelect: "",
  filterServices: [],
  serviceDataByKey: {},
  dynamicId: "",
  dynamicLoader: true,
  dynamicUrl1: "",
  checkUrl: "",
  servicesLenght: false,
  newBookingID: {navigate: false},
};
export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_SERVICE":
      return {
        ...state,
        serviceMessage: action.payload,
      };
    case "UPLOAD_SERVICE":
      return {
        ...state,
        uploadData: action.payload,
      };

    case "SERVICE_LOADING":
      return {
        ...state,
        serviceLoading: action.payload,
      };
    case "SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "CATEGORY_FEATURES":
      return {
        ...state,
        categoryFeatures: action.payload,
      };
    case "SERVICE_PROVIDER_INFO":
      return {
        ...state,
        serviceProviderInfo: action.payload,
      };
    case "GET_REVIEWS":
      return {
        ...state,
        reviewsList: action.payload,
      };
    case "USER_REVIEW_INFO":
      return {
        ...state,
        userReviewInfo: action.payload,
      };
    case "LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SERVICE_LOADER":
      return {
        ...state,
        serviceLoader: action.payload,
      };
    case "DELETE_SERVICE":
      return {
        ...state,
        deleteService: action.payload,
      };
    case "USER_SERVICES":
      return {
        ...state,
        userServices: action.payload,
      };
    case "PREVIEW_LISTING":
      return {
        ...state,
        optionSelect: action.payload,
      };
    case "FILTER_SERVICES":
      return {
        ...state,
        filterServices: action.payload,
      };
    case "SERVICE-DATA-BY-KEY":
      return {
        ...state,
        serviceDataByKey: action.payload,
      };
    case "DYNAMIC_ID":
      return {
        ...state,
        dynamicId: action.payload,
      };
    case "DYNAMIC_LOADER":
      return {
        ...state,
        dynamicLoader: action.payload,
      };
    case "DYNAMIC_URL1":
      return {
        ...state,
        dynamicUrl1: action.payload,
      };
    case "CHECK_URL":
      return {
        ...state,
        checkUrl: action.payload,
      };
    case "SERVICES_LENGTH":
      return {
        ...state,
        servicesLenght: action.payload,
      };
    case "NEW_BOOKING_ID":
      return {
        ...state,
        newBookingID: action.payload,
      };
      default:
      return state;
  }
}
