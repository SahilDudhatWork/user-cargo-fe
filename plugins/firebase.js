import { initializeApp, getApps } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAISMT6efSSAAsEOW4BSoHe4luZEG0MlaU",
  authDomain: "notification-92dce.firebaseapp.com",
  projectId: "notification-92dce",
  storageBucket: "notification-92dce.firebasestorage.app",
  messagingSenderId: "431799702508",
  appId: "1:431799702508:web:92b3226cba7feb102de6c9",
  measurementId: "G-QTSDLX2C42",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let messaging;
if (process.client) {
  messaging = getMessaging(app);

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
}

export { messaging };
