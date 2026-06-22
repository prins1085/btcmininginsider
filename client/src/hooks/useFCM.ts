import { useCallback, useEffect, useState } from "react";
import {
  getOrCreateFcmToken,
  getStoredFcmToken,
  isMessagingSupported,
  registerMessagingServiceWorker,
  requestNotificationPermission,
} from "@/lib/firebaseMessaging";

type UseFCMResult = {
  currentToken: string | null;
  notificationPermission: NotificationPermission;
  requestPermission: () => Promise<string | null>;
  isSupported: boolean;
};

export const useFCM = (): UseFCMResult => {
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setCurrentToken(getStoredFcmToken());
    setNotificationPermission(Notification.permission);

    void (async () => {
      const supported = await isMessagingSupported();
      setIsSupported(supported);

      if (supported) {
        await registerMessagingServiceWorker();
      }
    })();
  }, []);

  const requestPermission = useCallback(async (): Promise<string | null> => {
    if (!isSupported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return null;
    }

    try {
      const permission = await requestNotificationPermission();
      setNotificationPermission(permission);

      if (permission !== "granted") {
        return null;
      }

      const token = await getOrCreateFcmToken();
      setCurrentToken(token);
      return token;
    } catch (error) {
      if (typeof window !== "undefined" && "Notification" in window) {
        setNotificationPermission(Notification.permission);
      }

      console.error("FCM permission/token request failed:", error);
      return null;
    }
  }, [isSupported]);

  return {
    currentToken,
    notificationPermission,
    requestPermission,
    isSupported,
  };
};
