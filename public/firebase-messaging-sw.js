/* eslint-disable no-undef */


// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
    apiKey: "AIzaSyDi8BhbPLYVZ2P3Z4FmYJ5Dz4jm1gd63wY",
    authDomain: "hgfg-75aa5.firebaseapp.com",
    projectId: "hgfg-75aa5",
    storageBucket: "hgfg-75aa5.appspot.com",
    messagingSenderId: "783385628961",
    appId: "1:783385628961:web:8a5704e3e035600811ae60"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



// Function to retrieve device token and store it in database
