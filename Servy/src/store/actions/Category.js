export const AddCategory = (category, features) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let parentCategory = [];

  await db
    .collection("categories")
    .add({
      label: category.label,
      value: category.value,
      other: category.other,
      features: features,
      createdAt: new Date(),
    })
    .then(() => {
      db.collection("categories")
        .get()
        .then((docRef) => {
          docRef.docs.forEach((value, index) => {
            parentCategory.push({ ...value.data(), id: value.id });
          });
        })
        .then(() => {
          dispatch({
            type: "ADMIN_COLLECTION",
            payload: parentCategory,
          });
        });
      dispatch({
        type: "GET_CATEGORY",
      });
    });
};
export const updateCategory = (category, features, id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let parentCategory = [];

  var docRef = db.collection("categories").doc(id);
  docRef
    .update({
      label: category.label,
      value: category.value,
      features: features,
      createdAt: new Date(),
    })
    .then(() => {
      db.collection("categories")
        .get()
        .then((docRef) => {
          docRef.docs.forEach((value, index) => {
            parentCategory.push({ ...value.data(), id: value.id });
          });
        })
        .then(() => {
          dispatch({
            type: "ADMIN_COLLECTION",
            payload: parentCategory,
          });
        });
      dispatch({
        type: "GET_CATEGORY",
      });
      console.log("sucessss");
    });
};

export const getAdminCategory = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let parentCategory = [];

  await db
    .collection("categories")
    .get()
    .then((docRef) => {
      docRef.docs.forEach((value, index) => {
        parentCategory.push({ ...value.data(), id: value.id });
      });
    })
    .then(() => {
      dispatch({
        type: "ADMIN_COLLECTION",
        payload: parentCategory,
      });
    });
};
export const deleteCategory = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let parentCategory = [];
  await db
    .collection("categories")
    .doc(id)
    .delete()
    .then(() => {
      db.collection("categories")
        .get()
        .then((docRef) => {
          docRef.docs.forEach((value, index) => {
            parentCategory.push({ ...value.data(), id: value.id });
          });
        })
        .then(() => {
          dispatch({
            type: "ADMIN_COLLECTION",
            payload: parentCategory,
          });
        });
      dispatch({
        type: "DELETE_CATEGORY",
        payload: true,
      });
      console.log("deleteddd");
    });
};
