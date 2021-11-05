const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const { Expo } = require('expo-server-sdk');
const moment = require('moment')

exports.newService = functions.firestore.document('services1/{serviceID}').onCreate((snap, context) => {
    let data = snap.data()
    let serviceID = context.params.serviceID
    if (data.approve == true) {
        return false
    }
    return admin.firestore().collection('services1').doc(serviceID).set({
        approve: true
    }, {merge: true})
    .then(() => {
        return true
    })
    .catch((error) => {
        console.log(error)
        return false
    })
});

exports.dailyAtFour = functions.pubsub.schedule('0 4 * * *').onRun(async (context) => {
    let batch = admin.firestore().batch()
    let bookings = await getThreeDayOldBooking()
    let timestamp = admin.firestore.Timestamp.now()
    if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
            batch.update(admin.firestore().collection('bookings').doc(bookings[i]), {status: 'autoClose', lastUpdate: timestamp}, {merge: true})
        }
        batch.commit()
        .then(() => {
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    } else {
        return false
    }
})

function getThreeDayOldBooking() {
    let bookings = []
    let threeDay = moment().subtract(3, 'days')

    return admin.firestore().collection('bookings')
    .where('lastUpdate', "<=", threeDay)
    .where('status', '==', 'providerCompleted')
    .get()
    .then((docs) => {
        docs.forEach((doc) => {
            bookings.push(doc.id)
        })
        return bookings
    }).catch((err) => {
        console.log(err)
        return bookings
    })
}

exports.dailyAtFive = functions.pubsub.schedule('0 5 * * *').onRun(async (context) => {
    let batch = admin.firestore().batch()
    let bookings = await getOneDayOldBooking()
    let timestamp = admin.firestore.Timestamp.now()
    if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
            batch.update(admin.firestore().collection('bookings').doc(bookings[i]), {status: 'closeIncomplete', lastUpdate: timestamp}, {merge: true})
        }
        batch.commit()
        .then(() => {
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    } else {
        return false
    }
})
exports.dailyAtEleven = functions.pubsub.schedule('0 11 * * *').onRun(async (context) => {
    let batch = admin.firestore().batch()
    let bookings = await getOneDayOldBooking()
    let timestamp = admin.firestore.Timestamp.now()
    if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
            batch.update(admin.firestore().collection('bookings').doc(bookings[i]), {status: 'closeIncomplete', lastUpdate: timestamp}, {merge: true})
        }
        batch.commit()
        .then(() => {
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    } else {
        return false
    }
})
exports.dailyAtSeventeen = functions.pubsub.schedule('0 17 * * *').onRun(async (context) => {
    let batch = admin.firestore().batch()
    let bookings = await getOneDayOldBooking()
    let timestamp = admin.firestore.Timestamp.now()
    if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
            batch.update(admin.firestore().collection('bookings').doc(bookings[i]), {status: 'closeIncomplete', lastUpdate: timestamp}, {merge: true})
        }
        batch.commit()
        .then(() => {
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    } else {
        return false
    }
})
exports.dailyAtTwentyThree = functions.pubsub.schedule('0 23 * * *').onRun(async (context) => {
    let batch = admin.firestore().batch()
    let bookings = await getOneDayOldBooking()
    let timestamp = admin.firestore.Timestamp.now()
    if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
            batch.update(admin.firestore().collection('bookings').doc(bookings[i]), {status: 'closeIncomplete', lastUpdate: timestamp}, {merge: true})
        }
        batch.commit()
        .then(() => {
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    } else {
        return false
    }
})

function getOneDayOldBooking() {
    let bookings = []
    let oneDay = moment().subtract(2, 'days')

    return admin.firestore().collection('bookings')
    .where('lastUpdate', "<=", oneDay)
    .where('status', '==', 'clientRejected')
    .get()
    .then((docs) => {
        docs.forEach((doc) => {
            bookings.push(doc.id)
        })
        return bookings
    }).catch((err) => {
        console.log(err)
        return bookings
    })
}


exports.createBooking = functions.firestore.document('bookings/{bookingID}').onCreate(async (snap, context) => {
    const newData = snap.data();
    let bookingID = context.params.bookingID
    let service = await getServiceOwner(newData.serviceID)
    let token1 = await getToken(newData.userID)
    let token2 = await getToken(service.owner)
    let messages = []
    messages[0] = "We'll let you know when " + service.ownerName + " accepts"
    messages[1] = "New booking for " + service.serviceName
    saveNotifications([newData.userID, service.owner], messages, bookingID, newData.serviceID, service.owner, '1', [token1, token2], 'Booking update!')
    return true
});
exports.updateBooking = functions.firestore.document('bookings/{bookingID}').onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();
    let bookingID = context.params.bookingID
    let messages = ["There is an update for your booking", "There is an update for your booking"]
    let newStatus = newData.status
    let newDate = moment(newData.date.toDate())
    let oldDate = moment(oldData.date.toDate())
    let diff = newDate.diff(oldDate)
    let service = await getServiceOwner(newData.serviceID)
    let token1 = await getToken(newData.userID)
    let token2 = await getToken(service.owner)
    let lastUpdateBy = newData.lastUpdateBy
    let category = ""
    if (diff != 0) {
        if (lastUpdateBy == service.owner) {
            messages[0] = "There is an update for your booking date"
            messages[1] = ""
        } else {
            messages[0] = ""
            messages[1] = "There is an update for your booking date"
        }
        category = '10'
        saveNotifications([newData.userID, service.owner], messages, bookingID, newData.serviceID, service.owner, category, [token1, token2], 'Booking update!')
    } else {
        if (newStatus == 'providerRejected') {
            messages[0] = service.ownerName + " has rejected the booking for " + service.serviceName
            messages[1] = ""
            category = '3'
        } else if (newStatus == 'providerConfirmed') {
            messages[0] = service.ownerName + " accepted the booking for " + service.serviceName
            messages[1] = ""
            category = '4'
        } else if (newStatus == 'providerCompleted') {
            messages[0] = service.ownerName + " has marked the job completed"
            messages[1] = ""
            category = '5'
        } else if (newStatus == 'close') {
            messages[0] = ""
            messages[1] = service.serviceName + " has been set to complete, booking has been closed"
            category = '6'
        } else if (newStatus == 'autoClose') {
            messages[0] = service.serviceName + " has been closed"
            messages[1] = service.serviceName + " has been closed"
            category = '7'
        } else if (newStatus == 'providerCancelled') {
            messages[0] = service.serviceName + " has been cancelled by " + service.ownerName
            messages[1] = ""
            category = '8'
        } else if (newStatus == 'clientCancelled') {
            messages[0] = ""
            messages[1] = service.serviceName + " has been cancelled by the client"
            category = '9'
        } else if (newStatus == 'clientRejected') {
            messages[0] = ""
            messages[1] = service.serviceName + " has been rejected by the client"
            category = '11'
        }
        saveNotifications([newData.userID, service.owner], messages, bookingID, newData.serviceID, service.owner, category, [token1, token2], 'Booking update!')
        return true
    }
});

/*
exports.testNotification = functions.firestore.document('notifications/{userID}').onCreate(async (snap, context) => {
    let data = snap.data()
    let userID = context.params.userID
    //let token = await getToken(userID)
    sendNotification(["ExponentPushToken[iuCW7VHNW5B6YdWiVObUU4]"], 'this is title',  "this is body", 'E04M4xbGxPeW3lq8oXbk', '1')
});
*/

function sendNotification(tokens, title, body, type, category, notificationID, serviceID, providerID) {
    let expo = new Expo();
    let messages = []
    for (let i = 0; i < tokens.length; i++) {
        if (!Expo.isExpoPushToken(tokens[i])) {
            console.error(`Push token ${tokens[i]} is not a valid Expo push token`);
        } else {
            messages.push({
                to: tokens[i],
                sound: 'default',
                title: title,
                body: body,
                data: { type: type, notificationID: notificationID, serviceID: serviceID, providerID: providerID },
                categoryId: category
            })
        }
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//            console.log(ticketChunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }
    })();
    for (let i = 0; i < tickets.length; i++) {
//        console.log(JSON.stringify(tickets[i]))
    }
}

function saveNotifications(users, body, type, serviceID, providerID, category, tokens, title) {
    let batch = admin.firestore().batch()
    let timestamp = admin.firestore.Timestamp.now()
    for (let i = 0; i < users.length; i++) {
        if (body[i] != '') {
            let newCat = category
            if (newCat == "1") {
                if (users[i] != providerID) {
                    newCat = "2"
                }
            }
            let id = admin.firestore().collection(`notifications`).doc().id
            batch.set(admin.firestore().collection(`notifications`).doc(id), {
                timestamp: timestamp,
                userID: users[i],
                message: body[i],
                type: type,
                category: newCat,
                serviceID: serviceID,
                providerID: providerID,
            })
            sendNotification([tokens[i]], title, body[i], type, newCat, id, serviceID, providerID)
        }
    }
    batch.commit()
    .then(() => {
    }).catch((err) => {
        console.log(err)
    })
}

async function getToken(userID) {
    return admin.firestore().collection('expoToken').doc(userID).get()
    .then((doc) => {
        if (doc.exists) {
            return doc.data().token
        } else {
            return ''
        }
    }).catch((err) => {
        console.log(err)
        return ''
    })
}

async function getServiceOwner(serviceID) {
    return admin.firestore().collection('services').doc(serviceID).get()
    .then((doc) => {
        if (doc.exists) {
            return {owner: doc.data().userId, serviceName: doc.data().serviceName, ownerName: doc.data().providerName}
        } else {
            return {owner: '', serviceName: '', ownerName: ''}
        }
    }).catch((err) => {
        console.log(err)
        return {owner: '', serviceName: '', ownerName: ''}
    })
}