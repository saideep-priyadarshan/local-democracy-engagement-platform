import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const subscribeToNotifications = (userId, neighborhoods, callback) => {
  if (!neighborhoods || neighborhoods.length === 0) {
    return () => {};
  }

  const notificationsCollection = collection(db, "notifications");
  const q = query(
    notificationsCollection,
    where("neighborhoodId", "in", neighborhoods),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notifications);
    },
    (error) => {
      console.error("Error subscribing to notifications:", error);
    }
  );
};

export const getNotificationsHistory = async (
  neighborhoods,
  startDate,
  endDate
) => {
  try {
    if (!neighborhoods || neighborhoods.length === 0) {
      return [];
    }

    const notificationsCollection = collection(db, "notifications");
    const q = query(
      notificationsCollection,
      where("neighborhoodId", "in", neighborhoods),
      where("createdAt", ">=", startDate),
      where("createdAt", "<=", endDate),
      orderBy("createdAt", "desc")
    );

    const notificationsSnapshot = await getDocs(q);

    return notificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notification history:", error);
    throw error;
  }
};
export const createNotification = async (notification) => {
  try {
    const notificationData = {
      ...notification,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, "notifications"),
      notificationData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (userId, notificationId) => {
  try {
    await addDoc(collection(db, "users", userId, "readNotifications"), {
      notificationId,
      readAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
