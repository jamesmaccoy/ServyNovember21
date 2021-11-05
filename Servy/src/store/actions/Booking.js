// import { addEventToCalendar } from "../../../functions/index";

export const GET_BOOKINGS = 'GET_BOOKINGS'
export const GET_PROVIDER_BOOKINGS = 'GET_PROVIDER_BOOKINGS'
export const GET_ALL_PROVIDER_BOOKINGS = 'GET_ALL_PROVIDER_BOOKINGS'
export const GET_BOOKING_BY_ID = 'GET_BOOKING_BY_ID'

/*
export const addEvent = (id, dataa, documentId) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();

//   addEventToCalendar();
  console.log("heelwerwerewr")
};
*/

export const getBookings = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let bookings = [];
  await db.collection("bookings")
    .where("userID", "==", user.uid)
    .orderBy('date', 'desc')
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        bookings.push({ ...item.data(), id: item.id, cuid: user.uid });
      });
    })
    .then(() => {
      dispatch({
        type: GET_BOOKINGS,
        payload: bookings,
      });
    });
};
export const getProviderBookings = (serviceID) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let bookings = [];
  await db.collection("bookings")
    .where("providerID", "==", user.uid)
    .where("serviceID", "==", serviceID)
    .orderBy('date', 'desc')
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        bookings.push({ ...item.data(), id: item.id, cuid: user.uid });
      });
    })
    .then(() => {
      dispatch({
        type: GET_PROVIDER_BOOKINGS,
        payload: bookings,
      });
    });
};
export const getAllProviderBookings = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let bookings = [];
  await db.collection("bookings")
    .where("providerID", "==", user.uid)
    .orderBy('date', 'desc')
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        bookings.push({ ...item.data(), id: item.id, cuid: user.uid });
      });
    })
    .then(() => {
      dispatch({
        type: GET_ALL_PROVIDER_BOOKINGS,
        payload: bookings,
      });
    });
};

export const setBookingStatus = (bookingID, status, notificationID, providerID) => async (dispatch,
  getState,
  { getFirestore, getFirebase, },) => {
    const db = getFirestore();
    const firebase = getFirebase();
    var user = await firebase.auth().currentUser;
    let batch = db.batch()
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    let bookingRef = db.collection("bookings").doc(bookingID)
    batch.set(bookingRef, {status: status, lastUpdate: timestamp, lastUpdateBy: user.uid}, {merge: true})

    if (notificationID != null) {
      let notificationRef = db.collection("notifications").doc(notificationID)
      batch.delete(notificationRef)
    }

    await batch.commit()
    .then(() => {}).catch((err) => {
      console.log(err)
    })

  };


export const updateBooking = (bookingID, newDate) => async (dispatch,
  getState,
  { getFirestore, getFirebase, },) => {
    const db = getFirestore();
    const firebase = getFirebase();
    var user = await firebase.auth().currentUser;
    await db.collection("bookings").doc(bookingID).set({date: newDate, lastUpdateBy: user.uid}, {merge: true})
    .then(() => {}).catch((err) => {
      console.log(err)
    })
  };

export const getBookingByID = (id) => async (
      dispatch,
      getState,
      { getFirestore, getFirebase }
    ) => {
      const db = getFirestore();
      const firebase = getFirebase();
      var user = await firebase.auth().currentUser;
      let booking = {};
      await db.collection("bookings")
      .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            booking = { ...doc.data(), id: doc.id, cuid: user.uid };
          }
        })
        .then(() => {
          dispatch({
            type: GET_BOOKING_BY_ID,
            payload: booking,
          });
        });
    };
    