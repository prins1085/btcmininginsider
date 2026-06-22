import {
  getMessaging,
  getToken,
  isSupported as isFirebaseMessagingSupported,
  MessagePayload,
  Messaging,
  onMessage,
  Unsubscribe,
} from "firebase/messaging";
import { FIREBASE_VAPID_KEY, getFirebaseApp } from "./firebase";

export const FCM_TOKEN_STORAGE_KEY = "fcm_token";
export const FCM_SERVICE_WORKER_PATH = "/firebase-messaging-sw.js";

let messagingPromise: Promise<Messaging | null> | null = null;

const isClient = () => typeof window !== "undefined";

export const getStoredFcmToken = (): string | null => {
  if (!isClient()) {
    return null;
  }

  return window.localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
};

export const storeFcmToken = (token: string): void => {
  if (!isClient()) {
    return;
  }

  window.localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
};

export const isMessagingSupported = async (): Promise<boolean> => {
  if (
    !isClient() ||
    !("Notification" in window) ||
    !("serviceWorker" in navigator) ||
    !("localStorage" in window)
  ) {
    return false;
  }

  try {
    return await isFirebaseMessagingSupported();
  } catch (error) {
    console.error("Unable to verify Firebase Messaging browser support:", error);
    return false;
  }
};

export const registerMessagingServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!isClient() || !("serviceWorker" in navigator)) {
      console.warn("Service workers are not supported in this browser.");
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(
        FCM_SERVICE_WORKER_PATH,
      );

      await navigator.serviceWorker.ready;
      return registration;
    } catch (error) {
      console.error("Firebase messaging service worker registration failed:", error);
      return null;
    }
  };

export const getMessagingInstance = async (): Promise<Messaging | null> => {
  if (!messagingPromise) {
    messagingPromise = (async () => {
      const supported = await isMessagingSupported();

      if (!supported) {
        return null;
      }

      const firebaseApp = getFirebaseApp();

      if (!firebaseApp) {
        console.error("Firebase app is unavailable, skipping FCM setup.");
        return null;
      }

      try {
        return getMessaging(firebaseApp);
      } catch (error) {
        console.error("Firebase Messaging initialization failed:", error);
        return null;
      }
    })();
  }

  return messagingPromise;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isClient() || !("Notification" in window)) {
    throw new Error("Browser notifications are not supported.");
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  const permission = await Notification.requestPermission();

  if (permission === "denied") {
    throw new Error("Notification permission was denied.");
  }

  return permission;
};

export const getOrCreateFcmToken = async (): Promise<string | null> => {
  const messaging = await getMessagingInstance();

  if (!messaging) {
    throw new Error("Firebase Messaging is unavailable in this browser.");
  }

  const existingToken = getStoredFcmToken();

  if (existingToken) {
    return existingToken;
  }

  const serviceWorkerRegistration = await registerMessagingServiceWorker();

  if (!serviceWorkerRegistration) {
    throw new Error("Firebase service worker registration is unavailable.");
  }

  try {
    // Token generation binds this browser instance to FCM using the configured
    // VAPID key and the registered service worker used for web push delivery.
    const nextToken = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
      serviceWorkerRegistration,
    });

    if (!nextToken) {
      throw new Error("Firebase did not return an FCM token.");
    }

    if (nextToken !== existingToken) {
      storeFcmToken(nextToken);
    }

    return nextToken;
  } catch (error) {
    console.error("FCM token generation failed:", error);
    throw error;
  }
};

export const subscribeToForegroundMessages = async (
  callback: (payload: MessagePayload) => void,
): Promise<Unsubscribe> => {
  const messaging = await getMessagingInstance();

  if (!messaging) {
    return () => undefined;
  }

  return onMessage(messaging, callback);
};

export const showForegroundNotification = async (
  payload: MessagePayload,
): Promise<void> => {
  if (!isClient() || Notification.permission !== "granted") {
    return;
  }

  const title =
    payload.notification?.title || payload.data?.title || "New notification";
  const body =
    payload.notification?.body || payload.data?.body || "You have a new message.";
  const icon = payload.notification?.icon || "/icon.png";

  try {
    const registration = await registerMessagingServiceWorker();

    // Foreground messages arrive through onMessage while the page is open.
    // We surface them with the Notifications API so they are visible to the user,
    // even though the app already has the payload in-memory.
    if (registration) {
      await registration.showNotification(title, { body, icon });
      return;
    }

    new Notification(title, { body, icon });
  } catch (error) {
    console.error("Unable to display foreground notification:", error);
  }
};
