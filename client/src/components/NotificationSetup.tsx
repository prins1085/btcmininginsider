import { useEffect } from "react";
import { subscribeToForegroundMessages, showForegroundNotification } from "@/lib/firebaseMessaging";
import { useFCM } from "@/hooks/useFCM";

const NotificationSetup = (): null => {
  const { isSupported, notificationPermission, requestPermission } = useFCM();

  useEffect(() => {
    void requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (!isSupported) {
      console.warn("Skipping FCM setup because this browser is unsupported.");
      return;
    }

    let unsubscribe: () => void = () => {};

    void (async () => {
      unsubscribe = await subscribeToForegroundMessages((payload) => {
        console.log("FCM foreground message received:", payload);
        void showForegroundNotification(payload);
      });
    })();

    return () => {
      unsubscribe();
    };
  }, [isSupported]);

  useEffect(() => {
    if (notificationPermission === "denied") {
      console.warn("Notification permission has been denied by the user.");
    }
  }, [notificationPermission]);

  return null;
};

export default NotificationSetup;
