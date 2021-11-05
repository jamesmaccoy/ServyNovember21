export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
export const getNotifications = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let notifications = [];
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  await db.collection("notifications")
  .where('userID', '==', user.uid)
  .orderBy('timestamp', 'desc')
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        if (item.data().category == null) {
          let category = '1'
          if (item.data().message == 'There is an update for your booking. Please check!') {
            category = '2'
          }
          notifications.push({ ...item.data(), category: category, id: item.id });
        } else {
          notifications.push({ ...item.data(), id: item.id });
        }
      });
    })
    .then(() => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: notifications,
      });
    });
};

export const dismissNotification = (notificationID) => async (dispatch,
  getState,
  { getFirestore, getFirebase, },) => {
    const db = getFirestore();
    await db.collection("notifications").doc(notificationID).delete()
    .then(() => {}).catch((err) => {
      console.log(err)
    })
  };