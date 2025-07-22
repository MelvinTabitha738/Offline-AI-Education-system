import React, { useEffect, useState } from "react";
import styles from "./OfflineIndicator.module.css";

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [show, setShow] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShow(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

 return (
    <div
      className={`${styles.indicator} ${show ? styles.visible : ""} ${
        isOnline ? styles.online : styles.offline
      }`}
    >
      {!isOnline && <span className={styles.circle}></span>}
      {isOnline ? "✅ Back online" : "Offline mode active"}
    </div>
  );
};

export default OfflineIndicator;
