export const providerService = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let services = [];
  dispatch({
    type: "ADMIN_LISTING_LOADING",
    payload: true,
  });

  const res = await db
    .collection("services")
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        services.push({ ...item.data(), id: item.id });
      });
      dispatch({
        type: "SERVICES_LIST",
        payload: services,
      });
      dispatch({
        type: "ADMIN_LISTING_LOADING",
        payload: false,
      });
    })
    .catch(() => {
      dispatch({
        type: "ADMIN_LISTING_LOADING",
        payload: false,
      });
    });
};

export const getUsers = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let users = [];

  const data = await db
    .collection("users")
    .get()
    .then((userInfo) => {
      userInfo.docs.forEach((userData) => {
        users.push({ ...userData.data(), id: userData.id });
      });
    })
    .then(() => {
      dispatch({
        type: "GET_USERS",
        payload: users,
      });
    });
};

export const currentOption = (data) => async (dispatch) => {
  dispatch({
    type: "CURRENT_USER_LISTING",
    payload: data,
  });
};
export const duplicateListing = (document) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let services = [];
  dispatch({
    type: "ADMIN_LISTING_LOADING",
    payload: true,
  });
  db.collection("services")
    .add({
      serviceName: document.serviceName,
      category: document.category,
      location: document.location,
      maps: document.maps,
      userId: document.userId,
      attributes: document.attributes,
      approve: false,
      providerName: document.providerName,
      averageRating: 0,
      totalReviews: 0,
      imagesUrl: document.imagesUrl,
      createdAt: new Date(),
    })
    .then(() => {
      db.collection("services")
        .get()
        .then((res) => {
          res.docs.forEach((data) => {
            services.push({ ...data.data(), id: data.id });
          });
          dispatch({
            type: "SERVICES_LIST",
            payload: services,
          });
          dispatch({
            type: "ADMIN_LISTING_LOADING",
            payload: false,
          });
        })
        .catch(() => {
          dispatch({
            type: "ADMIN_LISTING_LOADING",
            payload: false,
          });
        });
    });
};

export const assignListing = (doc, serviceId) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let services = [];
  dispatch({
    type: "ADMIN_LISTING_LOADING",
    payload: true,
  });

  let docRef = db.collection("services").doc(serviceId);
  docRef
    .update({
      userId: doc.id,
      providerName: doc.Name,
    })
    .then(() => {
      db.collection("services")
        .get()
        .then((res) => {
          res.docs.forEach((data) => {
            services.push({ ...data.data(), id: data.id });
          });
        })
        .then(() => {
          dispatch({
            type: "SERVICES_LIST",
            payload: services,
          });
          dispatch({
            type: "ADMIN_LISTING_LOADING",
            payload: false,
          });
        });
    })
    .catch(() => {
      dispatch({
        type: "ADMIN_LISTING_LOADING",
        payload: false,
      });
    });
};
