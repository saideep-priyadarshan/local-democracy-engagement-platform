import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const submitFeedback = async (
  userId,
  representativeId,
  message,
  topic,
  isPublic = false
) => {
  try {
    const feedbackData = {
      userId,
      representativeId,
      message,
      topic,
      isPublic,
      status: "submitted",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      response: null,
      responseDate: null,
    };

    const docRef = await addDoc(collection(db, "feedback"), feedbackData);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

export const getUserFeedbackHistory = async (userId) => {
  try {
    const feedbackCollection = collection(db, "feedback");
    const q = query(
      feedbackCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const feedbackSnapshot = await getDocs(q);

    return feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user feedback history:", error);
    throw error;
  }
};

export const getPublicFeedback = async (representativeId) => {
  try {
    const feedbackCollection = collection(db, "feedback");
    const q = query(
      feedbackCollection,
      where("representativeId", "==", representativeId),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    );

    const feedbackSnapshot = await getDocs(q);

    return feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching public feedback:", error);
    throw error;
  }
};
