importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const serviceWorkerUrl = new URL(self.location.href);

firebase.initializeApp({
  apiKey: serviceWorkerUrl.searchParams.get("apiKey"),
  authDomain: serviceWorkerUrl.searchParams.get("authDomain"),
  projectId: serviceWorkerUrl.searchParams.get("projectId"),
  storageBucket: serviceWorkerUrl.searchParams.get("storageBucket"),
  messagingSenderId: serviceWorkerUrl.searchParams.get("messagingSenderId"),
  appId: serviceWorkerUrl.searchParams.get("appId"),
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
