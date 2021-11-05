import React from 'react';
import Index from "./src/index";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/store/reducers/index";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./src/config/config";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig)
  )
);
const rrfProps = {
  firebase: fbConfig,
  attachAuthIsReady: true,
  config: { useFirestoreForProfile: true, userProfile: "users"},
  dispatch: store.dispatch,
};
const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Index />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
