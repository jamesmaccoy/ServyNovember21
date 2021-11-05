import * as Google from "expo-google-app-auth";
import * as Notifications from "expo-notifications";
import axios from "axios";

export const sendPushNotification = (id, dataa, documentId) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();

  const providerInfo = await db.collection("users").doc(id).get();
  const dt = providerInfo.data().deviceToken;
  const docRef = await db.collection("services").doc(documentId);
  console.log("daataaaa", dt.data);

  docRef.update({
    approve: true,
  });

  const res = await axios({
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer AAAA1F4uasE:APA91bGNhUMh9-eQT5M-f7bv5M0y7Y8aDlSqpOxPqKiQgwYa0nSLIVVKq1-GNpWxj3K2UMJzz06kRBbu8Kp0kj8Zkh2ThxzJWtPh1JVpd-rF8rctp8Jr-r_7ptnTp7Nz5DO7Uy1-3IuZ",
    },
    data: JSON.stringify({
      to: dt.data,
      data: {
        experienceId: "@numansafi97/servys",
        title: "Congratulations",
        message: `Your Listing has been Approved - [ ${dataa} ]`,
      },
    }),
  });
  await db
    .collection("users")
    .doc(id)
    .collection("notifications")
    .add({
      message: `your Listing has been published- [ ${dataa}] `,
      cretedAt: Date.now(),
      listingId: documentId,
    });
};

export const onSignUp = (user) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let name = user.Name;
  let email = user.Email;
  let password = user.password1;
  let phoneNumber = user.phoneNumber;

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.additionalUserInfo.isNewUser) {
        db.collection("users").doc(res.user.uid).set({
          Name: name,
          Email: email,
          PhoneNumber: phoneNumber,
          photoURL: "",
          approve: false,
          type: "user",
          about: "",
          firstName: "",
          lastName: "",
          userType: "",
          websiteUrl: "",
          facebookUrl: "",
          instagramUrl: "",
          cretedAt: Date.now(),
        });
      }
    })
    .then(() => {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: true,
      });
    })
    .catch((error) => {
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: false,
      });
      dispatch({
        type: "SIGNUP_FAIL",
        payload: error.message,
      });
    });
};
export const signInWithEmail = (email, password) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {})
    .catch((error) => {
      let errorMessage = error.message;
      dispatch({
        type: "LOGIN_ERROR",
        payload: errorMessage,
      });
    });
};

export const verifyUser = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  dispatch({
    type: "LOADING",
    payload: true,
  });

  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({
        type: "CURRENT_USER",
        payload: user.uid,
      });
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: true,
      });
      dispatch({
        type: "LOADING",
        payload: false,
      });
    
    } else {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: false,
      });
      dispatch({
        type: "LOADING",
        payload: false,
      });
    }
  });
};
export const Logout = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  await firebase
    .auth()
    .signOut()
    .then(function () {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: false,
      });
    })
    .catch(function (error) {});
};

export const signInWithGoogle = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  dispatch({
    type: "LOADING",
    payload: true,
  });

  try {
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (
            providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()
          ) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    };

    const onSignIn = (googleUser) => {
      var unsubscribe = firebase
        .auth()
        .onAuthStateChanged(function (firebaseUser) {
          unsubscribe();
          if (!isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then((res) => {
                if (res.additionalUserInfo.isNewUser) {
                  db.collection("users").doc(res.user.uid).set({
                    Name: res.user.displayName,
                    photoURL: res.user.photoURL,
                    PhoneNumber: res.user.phoneNumber,
                    Email: res.user.email,
                    type: "user",
                    firstName: "",
                    lastName: "",
                    about: "",
                    userType: "",
                    websiteUrl: "",
                    facebookUrl: "",
                    instagramUrl: "",
                    deviceToken: "",
                  });
                }
              })
              .catch(function (error) {
                dispatch({
                  type: "LOADING",
                  payload: false,
                });
              });
          } else {
          }
        });
    };
    const result = await Google.logInAsync({
      androidClientId:
        "256539792953-u00leiuuf4odj68p6ephgfneq2r1p7uo.apps.googleusercontent.com",
      androidStandaloneAppClientId:
        "256539792953-u00leiuuf4odj68p6ephgfneq2r1p7uo.apps.googleusercontent.com",
      status: true,
      xfbml: true,
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      dispatch({
        type: "LOADING",
        payload: false,
      });
      return { cancelled: true };
    }
  } catch ({ message }) {
    dispatch({
      type: "LOADING",
      payload: false,
    });
    alert("login: Error:" + message + "Please Retry");
  }
};
export const Authorization = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const state = getState();
  let currentUser = state.Auth.user;

  dispatch({
    type: "AUTH_CHECK",
    payload: true,
  });
  await db
    .collection("users")
    .doc(currentUser)
    .get()
    .then((response) => {
      if (response) {
        dispatch({
          type: "ADMIN",
          payload: response.data().type,
        });
        dispatch({
          type: "AUTH_CHECK",
          payload: false,
        });
      }
    })
    .then(async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        if (settings.status === "granted") {
          const token = await Notifications.getDevicePushTokenAsync();
          console.log("stetttings", token);
          var docRef = await db.collection("users").doc(currentUser);
          docRef.update({
            deviceToken: token,
          });
        }
      } catch (err) {
        console.log("ERROR", err);
      }
    })
    .catch(() => {
      dispatch({
        type: "AUTH_CHECK",
        payload: false,
      });
    });
};

export const removeErrorMessage = () => async (dispatch) => {
  dispatch({
    type: "SIGNUP_FAIL",
    payload: "",
  });
};
