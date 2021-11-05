import { getPendingResultAsync } from "expo-image-picker";
import * as Linking from "expo-linking";
export const AddNewService = (
  service,
  attributes,
  userLocation,
  images,
  selectedValue
) => async (dispatch, getState, { getFirestore, getFirebase }) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let providerName;
  var user = await firebase.auth().currentUser;
  let serviceName = service.serviceName;
  let category = service.category;
  let location = service.location;
  let imageArray = [];
  let services = [];

  dispatch({
    type: "SERVICE_LOADING",
    payload: true,
  });

  await images.forEach(async (serviceImage, index) => {
    const ImageResponse = await fetch(serviceImage);
    const blob = await ImageResponse.blob();
    var ref = firebase.storage().ref().child(`images/${serviceImage}`);
    await ref.put(blob).then((response) => {
      response.ref
        .getDownloadURL()
        .then((url) => {
          imageArray.push(url);
        })
        .then(async () => {
          if (imageArray.length === images.length) {
            if (user) {
              dispatch({
                type: "SERVICE_LOADING",
                payload: true,
              });
              await db
                .collection("users")
                .doc(user.uid)
                .get()
                .then((providerInfo) => {
                  providerName = providerInfo.data().Name;
                })
                .then(async () => {
                  const res = db
                    .collection("services")
                    .add({
                      serviceName: serviceName,
                      category: category,
                      location: location,
                      maps: userLocation.locationCords,
                      userId: user.uid,
                      attributes: attributes,
                      approve: false,
                      providerName: providerName,
                      averageRating: 0,
                      totalReviews: 0,
                      imagesUrl: imageArray,
                      createdAt: new Date(),
                    })
                    .then(async () => {
                      db.collection("services")
                        .where("userId", "==", user.uid)
                        .get()
                        .then((response) => {
                          response.docs.forEach((item, index) => {
                            services.push({ ...item.data(), id: item.id });
                          });
                          dispatch({
                            type: "USER_SERVICES",
                            payload: services,
                          });
                        });
                      if (selectedValue.value === "other") {
                        await db.collection("categories").add({
                          label: category,
                          value: category.replace(/\s/g, ""),
                          other: true,
                          features: attributes,
                          createdAt: new Date(),
                        });
                      }
                      dispatch({
                        type: "ADD_SERVICE",
                        payload: true,
                      });
                      dispatch({
                        type: "SERVICE_LOADING",
                        payload: false,
                      });
                    })
                    .catch(() => {
                      dispatch({
                        type: "FAIL_SERVICE",
                        payload: true,
                      });
                      dispatch({
                        type: "SERVICE_LOADING",
                        payload: false,
                      });
                    });
                });
            } else {
              console.log("user is not signed in");
            }
          }
        });
    });
  });
};
export const getServices = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  console.log("servicess");
  const db = getFirestore();
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });
  let services = [];
  db.collection("services")
    .where("approve", "==", true)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        services.push({ ...item.data(), id: item.id });
      });
      dispatch({
        type: "SERVICES",
        payload: services,
      });
      dispatch({
        type: "FILTER_SERVICES",
        payload: services,
      });
    })
    .then(() => {
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};

export const addProviderServices = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const state = getState();
  let currentUser = state.Auth.user;
};

export const addServiceReview = (state, id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  const reduxState = getState();
  let Name = reduxState.profile.profileInformation[0].Name;
  let photoURL = reduxState.profile.profileInformation[0].photoURL;
  let Reviews = [];

  const res = await db
    .collection("services")
    .doc(id)
    .collection("reviews")
    .add({
      serviceId: id,
      comment: state.comment,
      totalRating: state.service,
      userId: user.uid,
      Name: Name,
      photoURL: photoURL,
      createdAt: new Date(),
    })
    .then((e) => {
      db.collection("services")
        .doc(id)
        .get()
        .then((ratingDoc) => {
          db.collection("services")
            .doc(id)
            .collection("reviews")
            .get()
            .then((docRef) => {
              docRef.docs.map((data, index) => {
                var docRef = db.collection("services").doc(id);
                docRef.update({
                  averageRating:
                    (ratingDoc.data().averageRating += data.data().totalRating) /
                    (index + 1),
                  totalReviews: ratingDoc.data().totalReviews + 1,
                });
              });
            });
        });
    })
    .then(() => {
      db.collection("services")
        .doc(id)
        .collection("reviews")
        .orderBy("createdAt", "desc")
        .get()

        .then((docRef) => {
          docRef.docs.map((data) => {
            Reviews.push({
              ...data.data(),
              id: data.id,
            });
          });
        })
        .then(() => {
          dispatch({
            type: "GET_REVIEWS",
            payload: Reviews,
          });
        });
    });
};
export const getServiceReview = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();

  let Reviews = [];
  dispatch({
    type: "LOADER",
    payload: true,
  });
  const res = await db
    .collection("services")
    .doc(id)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get()
    .then((docRef) => {
      docRef.docs.map((data) => {
        Reviews.push({
          ...data.data(),
          id: data.id,
        });
      });
    })
    .then(() => {
      dispatch({
        type: "LOADER",
        payload: false,
      });
      dispatch({
        type: "GET_REVIEWS",
        payload: Reviews,
      });
    })
    .catch(() => {
      dispatch({
        type: "LOADER",
        payload: false,
      });
    });
};

export const getServicesByCategory = (data, attributes) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let services = [];
  let newService = [];
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });
  await db
    .collection("services")
    .where("category", "==", data)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        dispatch({
          type: "SERVICE_LOADER",
          payload: false,
        });
        if (item.data().approve === true) {
          if (attributes.length !== 0) {
            item.data().attributes.filter((fire) => {
              if (attributes.includes(fire.id)) {
                if (fire.attributeState === true) {
                  services.push({ ...item.data(), id: item.id });
                }
              }
            });
          } else {
            newService.push({ ...item.data(), id: item.id });
          }
        }
      });
    })
    .then(() => {
      if (attributes.length !== 0) {
        for (let i = 0; i < services.length; i++) {
          if (newService.length === 0) {
            newService.push(services[i]);
          }
          if (newService.length > 0) {
            const Index = newService.findIndex((e) => e.id === services[i].id);
            if (Index === -1) {
              newService.push(services[i]);
            }
          }
        }
      }
    })
    .then(() => {
      dispatch({
        type: "FILTER_SERVICES",
        payload: newService,
      });
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    })
    .catch(() => {
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};

export const deletesService = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let services = [];
  let proService = [];

  await db
    .collection("services")
    .doc(id)
    .delete()
    .then(() => {
      dispatch({
        type: "DELETE_SERVICE",
        payload: true,
      });
    });
  db.collection("services")
    .where("userId", "==", user.uid)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        services.push({ ...item.data(), id: item.id });
      });
      dispatch({
        type: "USER_SERVICES",
        payload: services,
      });
    })
    .then(() => {
      if (services.length === 0) {
        db.collection("services")
          .where("serviceName", "==", "Hoola hoop teacher")
          .get()
          .then((response) => {
            response.docs.forEach((item, index) => {
              proService.push({ ...item.data(), id: item.id });
            });
            dispatch({
              type: "USER_SERVICES",
              payload: proService,
            });
          });
      }
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};
export const updateService = (
  service,
  attributes,
  userLocation,
  images,
  selectedValue,
  serviceId,
  sample
) => async (dispatch, getState, { getFirestore, getFirebase }) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let serviceName = service.serviceName;
  let category = service.category;
  let location = service.location;
  let services = [];
  const state = getState();
  const providerInfo = state.profile.profileInformation;
  let providerName = providerInfo[0].Name;

  dispatch({
    type: "SERVICE_LOADING",
    payload: true,
  });

  const promises = images.map(async (serviceImage, index) => {
    if (serviceImage.startsWith("file")) {
      const ImageResponse = await fetch(serviceImage);
      const blob = await ImageResponse.blob();
      var ref = await firebase.storage().ref().child(`images/${serviceImage}`);
      const response = await ref.put(blob);
      const url = await response.ref.getDownloadURL();
      return url;
    } else {
      return serviceImage;
    }
  });
  const asb = await Promise.all(promises);

  if (asb) {
    if (sample === false) {
      let docRefrence = db.collection("services").doc(serviceId);
      docRefrence
        .update({
          serviceName: serviceName,
          category: category,
          location: location,
          maps: userLocation.locationCords,
          attributes: attributes,
          imagesUrl: asb,
        })
        .then(async () => {
          dispatch({
            type: "ADD_SERVICE",
            payload: true,
          });
          dispatch({
            type: "SERVICE_LOADING",
            payload: false,
          });
          await db
            .collection("services")
            .where("userId", "==", user.uid)
            .get()
            .then((response) => {
              response.docs.forEach((item, index) => {
                services.push({ ...item.data(), id: item.id });
              });
              dispatch({
                type: "USER_SERVICES",
                payload: services,
              });
            });
          if (selectedValue.value === "other") {
            await db.collection("categories").add({
              label: category,
              value: category.replace(/\s/g, ""),
              other: true,
              features: attributes,
              createdAt: new Date(),
            });
          }
        })
        .catch(() => {
          dispatch({
            type: "FAIL_SERVICE",
            payload: true,
          });
          dispatch({
            type: "SERVICE_LOADING",
            payload: false,
          });
        });
    }
    if (sample === true) {
      db.collection("services")
        .add({
          serviceName: serviceName,
          category: category,
          location: location,
          maps: userLocation.locationCords,
          userId: user.uid,
          attributes: attributes,
          approve: false,
          providerName: providerName,
          averageRating: 0,
          totalReviews: 0,
          imagesUrl: asb,
          createdAt: new Date(),
        })
        .then(() => {
          db.collection("services")
            .where("userId", "==", user.uid)
            .get()
            .then((response) => {
              response.docs.forEach((item, index) => {
                services.push({ ...item.data(), id: item.id });
              });
              dispatch({
                type: "USER_SERVICES",
                payload: services,
              });
              dispatch({
                type: "ADD_SERVICE",
                payload: true,
              });
              dispatch({
                type: "SERVICE_LOADING",
                payload: false,
              });
            })
            .then(() => {
              if (selectedValue === "other") {
                db.collection("categories").add({
                  label: category,
                  value: category.replace(/\s/g, ""),
                  other: true,
                  features: attributes,
                  createdAt: new Date(),
                });
              }
            });
        })
        .catch(() => {
          dispatch({
            type: "FAIL_SERVICE",
            payload: true,
          });
          dispatch({
            type: "SERVICE_LOADING",
            payload: false,
          });
        });
    }
  }
};

export const getServicesByProvider = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let services = [];
  let proService = [];
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });
  await db
    .collection("services")
    .where("userId", "==", user.uid)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        services.push({ ...item.data(), id: item.id });
      });
      if (services.length !== 0) {
        dispatch({
          type: "USER_SERVICES",
          payload: services,
        });
        dispatch({
          type: "SERVICE_LOADER",
          payload: false,
        });
      }
    })
    .then(() => {
      if (services.length === 0) {
        db.collection("services")
          .where("serviceName", "==", "Hoola hoop teacher")
          .get()
          .then((response) => {
            response.docs.forEach((item, index) => {
              proService.push({ ...item.data(), id: item.id });
            });
            dispatch({
              type: "USER_SERVICES",
              payload: proService,
            });
          });
      }
    })
    .then(() => {
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    })
    .catch(() => {
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};

export const selectOption = (data) => async (dispatch, getState) => {
  dispatch({
    type: "PREVIEW_LISTING",
    payload: data,
  });
};

export const getServicesBySearch = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let services = [];
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });

  if (data.length !== 0) {
    const res = await db
      .collection("services")
      .where("category", "in", [data])
      .get();
    res.docs.forEach((item) => {
      services.push({ ...item.data(), id: item.id });
    });
    dispatch({
      type: "FILTER_SERVICES",
      payload: services,
    });
    dispatch({
      type: "SERVICE_LOADER",
      payload: false,
    });
  } else {
    const res = await db.collection("services").get();
    res.docs.forEach((item) => {
      services.push({ ...item.data(), id: item.id });
    });
    dispatch({
      type: "FILTER_SERVICES",
      payload: services,
    });
    dispatch({
      type: "SERVICE_LOADER",
      payload: false,
    });
  }
};

export const getDataByKey = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let services = [];

  dispatch({
    type: "LOADER",
    payload: true,
  });

  await db
    .collection("services")
    .doc(id)
    .get()
    .then((res) => {
      dispatch({
        type: "SERVICE-DATA-BY-KEY",
        payload: { ...res.data(), id: res.id },
      });
      dispatch({
        type: "LOADER",
        payload: false,
      });
    })
    .catch(() => {
      dispatch({
        type: "LOADER",
        payload: false,
      });
    });
};

export const getDynamicLinkId = (link) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  dispatch({
    type: "DYNAMIC_LOADER",
    payload: true,
  });
  dispatch({
    type: "DYNAMIC_ID",
    payload: link,
  });
  dispatch({
    type: "DYNAMIC_URL1",
    payload: link,
  });
};

export const resetDynamicLinkId = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch({
    type: "DYNAMIC_LOADER",
    payload: true,
  });
  dispatch({
    type: "DYNAMIC-ID",
    payload: "",
  });
  dispatch({
    type: "DYNAMIC_LOADER",
    payload: false,
  });
};
export const resetDynamicLoader = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch({
    type: "DYNAMIC_LOADER",
    payload: false,
  });
};
export const getLinkFromBackBackground = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  Linking.addEventListener("url", (url) => {
    dispatch({
      type: "CHECK_URL",
      payload: url,
    });
    if (url !== "" && typeof url !== "object") {
      if (url.startsWith("https")) {
        dispatch({
          type: "DYNAMIC_LOADER",
          payload: true,
        });
        let res = url.substr(30);
        dispatch({
          type: "DYNAMIC_ID",
          payload: res,
        });
      }
    }
  });
};
export const servicesLenght = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch({
    type: "SERVICES_LENGTH",
    payload: data,
  });
};

export const restrictNavigation = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch({
    type: "ADD_SERVICE",
    payload: false,
  });
};





export const bookService = (
  data,
) => async (dispatch, getState, { getFirestore, getFirebase }) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;

  dispatch({
    type: "SERVICE_LOADING",
    payload: true,
  });

  let timestamp = firebase.firestore.FieldValue.serverTimestamp()

  await db.collection("bookings").add({
    'status': 'pending',
    'userID': user.uid,
    'date': data.date,
    'serviceID': data.serviceID,
    'providerID': data.providerID,
    'lastUpdate': timestamp,
    'lastUpdateBy': user.uid,
  }).then((docRef) => {
    dispatch({
      type: "NEW_BOOKING_ID",
      //payload: { ...docRef.data(), id: docRef.id, navigate: true },
      payload: { id: docRef.id, date: data.date, status: 'pending', userID: user.uid, serviceID: data.serviceID, providerID: data.providerID, navigate: true },
    });
    dispatch({
      type: "SERVICE_LOADING",
      payload: false,
    });
  }).catch((err) => {
    dispatch({
      type: "SERVICE_LOADING",
      payload: false,
    });
    console.log(err)
  });
};

export const resetNewBookingID = () => (dispatch) => {
  dispatch({
    type: "NEW_BOOKING_ID",
    payload: { navigate: false },
  });
}