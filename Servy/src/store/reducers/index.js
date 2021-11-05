import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import bookingsReducer from "./Booking";
import ServiceReducer from "./ServiceReducer";
import AdminReducer from "./AdminReducer";
import UserReducer from "./UserReducer";
import categoryReducer from "./CategoryReducer";
import ProfileReducer from "./ProfileReducer";
import LocationReducer from "./locationReducer";
import NotificationsReducer from "./Notifications";
export default combineReducers({
  Auth: AuthReducer,
  bookingsReducer: bookingsReducer,
  notificationsReducer: NotificationsReducer,
  Service: ServiceReducer,
  Admin: AdminReducer,
  User: UserReducer,
  category: categoryReducer,
  profile: ProfileReducer,
  location: LocationReducer,
});
