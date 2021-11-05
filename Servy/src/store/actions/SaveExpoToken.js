export const SAVE_EXPO_TOKEN = 'SAVE_EXPO_TOKEN'
export const SET_EXPO_TOKEN = 'SET_EXPO_TOKEN'
export const setExpoToken = (token) => async (dispatch,
    getState,
    { getFirestore, getFirebase, },) => {
        dispatch({
            type: "SET_EXPO_TOKEN",
            payload: token,
          });
    };
export const saveExpoToken = (token) => async (dispatch,
    getState,
    { getFirestore, getFirebase, },) => {
      const db = getFirestore();
      const firebase = getFirebase();
      var user = await firebase.auth().currentUser;
      await db.collection("expoToken").doc(user.uid).set({token: token}, {merge: true})
      .then(() => {}).catch((err) => {
        console.log(err)
      })
    };