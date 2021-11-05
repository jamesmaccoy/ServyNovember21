import axios from "axios";
export const userStatus = (state) => async (dispatch) => {
  dispatch({
    type: "USER_STATUS",
    payload: state,
  });
};
export const switchLoader = (state) => async (dispatch) => {
  dispatch({
    type: "SWITCH_LOADER",
    payload: state,
  });
};
export const profileInformation = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let userInformation = [];

  if (user) {
    const data = await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((providerInfo) => {
        userInformation.push({ ...providerInfo.data(), id: providerInfo.id });
      })
      .then(() => {
        dispatch({
          type: "PROFILE_INFO",
          payload: userInformation,
        });
      });
  } else {
    console.log("user is not signed in");
  }
};

export const updateInformation = (information) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let Email = information.Email;
  let about = information.about;
  let firstName = information.firstName;
  let lastName = information.lastName;
  let PhoneNumber = information.PhoneNumber;
  let websiteUrl = information.websiteUrl;
  let instagramUrl = information.instagramUrl;
  let facebookUrl = information.facebookUrl;
  let userType = information.userType;
  let userInformation = [];

  if (user) {
    const accountRef = await db.collection("users").doc(user.uid);
    accountRef
      .update({
        Email: Email,
        about: about,
        firstName: firstName,
        lastName: lastName,
        PhoneNumber: PhoneNumber,
        websiteUrl: websiteUrl,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        userType: userType,
      })
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((providerInfo) => {
            userInformation.push({
              ...providerInfo.data(),
              id: providerInfo.id,
            });
          })
          .then(() => {
            dispatch({
              type: "PROFILE_INFO",
              payload: userInformation,
            });
          });

        dispatch({
          type: "ACCOUNT_ADDED_INFO",
          payload: true,
        });
      });
  } else {
    console.log("user not signed in");
  }
};

export const serviceProviderInformation = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();

  let userInformation = [];

  const data = await db
    .collection("users")
    .get()
    .then((providerInfo) => {
      providerInfo.docs.forEach((userData) => {
        if (id == userData.id) {
          userInformation.push({ ...userData.data(), id: userData.id });
        }
      });
    })
    .then(() => {
      dispatch({
        type: "SERVICE_PROVIDER_INFO",
        payload: userInformation,
      });
    });
};

export const userNotifications = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let notifications = [];

  var user = await firebase.auth().currentUser;

  const res = await db
    .collection("users")
    .doc(user.uid)
    .collection("notifications")
    .get();
  const array = res.docs.forEach((doc) => {
    notifications.push({ ...doc.data(), id: doc.id });
  });

  dispatch({
    type: "USER_NOTIFICATIONS",
    payload: notifications,
  });
};

export const handleRemoveNotification = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let notifications = [];
  await db
    .collection("users")
    .doc(user.uid)
    .collection("notifications")
    .doc(id)
    .delete();

  const res = await db
    .collection("users")
    .doc(user.uid)
    .collection("notifications")
    .get();
  res.docs.forEach((doc) => {
    notifications.push({ ...doc.data(), id: doc.id });
  });

  dispatch({
    type: "USER_NOTIFICATIONS",
    payload: notifications,
  });
};

export const bannerInfo = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const remoteConfig = firebase.remoteConfig();

  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
  };
};
export const shareDynamicLinks = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const res = await axios({
    method: "post",
    url:
      "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAFdShW11pxYFmSWkLmQcOLm2QJRHp4A7s",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      dynamicLinkInfo: {
        domainUriPrefix: "https://serveys.page.link",
        link: `https://www.serveys.page.link/${id}`,
        androidInfo: { androidPackageName: "com.rameezraja.serveys" },
      },
    }),
  });
  const response = res.data.shortLink;
  dispatch({
    type: "DYNAMIC-LINK",
    payload: response,
  });
};


export const getUserInformation = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();

  let userInformation = {};

  const data = await db
    .collection("users").doc(id)
    .get()
    .then((providerInfo) => {
      userInformation = { ...providerInfo.data(), id: providerInfo.id };
    })
    .then(() => {
      dispatch({
        type: "USER_INFO",
        payload: userInformation,
      });
    });
};

