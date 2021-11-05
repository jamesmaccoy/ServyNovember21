export const UploadProfileImage = (image) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;

  if (user) {
    const ImageResponse = await fetch(image);
    const blob = await ImageResponse.blob();
    var ref = firebase.storage().ref().child(`images/${image}`);

    ref
      .put(blob)
      .then((response) => {
        response.ref.getDownloadURL().then((url) => {
          const data = db.collection("users").doc(user.uid);

          data.update({
            photoURL: url,
          });
        });
      })
  } else {
  }
};
