importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Background notifications are handled by the service worker when no page
  // from this origin is focused. This keeps push delivery working after deploy
  // without any app code changes beyond the initial FCM setup.
  const title =
    payload.notification?.title || payload.data?.title || "New notification";
  const body =
    payload.notification?.body || payload.data?.body || "You have a new message.";
  const icon = payload.notification?.icon || "/icon.png";

  self.registration.showNotification(
    title,
    {
      body,
      icon,
    }
  );
});
