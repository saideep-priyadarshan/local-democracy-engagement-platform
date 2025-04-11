import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion,
  arrayRemove, 
  where,
  GeoPoint
} from "firebase/firestore";

export const getNeighborhoods = async () => {
  try {
    const neighborhoodsCollection = collection(db, "neighborhoods");
    const neighborhoodsSnapshot = await getDocs(neighborhoodsCollection);
    
    return neighborhoodsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching neighborhoods:", error);
    throw error;
  }
};

export const findNeighborhoodsByLocation = async (searchTerm) => {
  try {
    const neighborhoodsCollection = collection(db, "neighborhoods");
    const q = query(
      neighborhoodsCollection, 
      where("zipCodes", "array-contains", searchTerm)
    );
    
    const neighborhoodsSnapshot = await getDocs(q);
    
    return neighborhoodsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error finding neighborhoods:", error);
    throw error;
  }
};

export const subscribeToNeighborhood = async (userId, neighborhoodId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      neighborhoods: arrayUnion(neighborhoodId)
    });
    
    const neighborhoodRef = doc(db, "neighborhoods", neighborhoodId);
    await updateDoc(neighborhoodRef, {
      subscribers: arrayUnion(userId)
    });
    
    return true;
  } catch (error) {
    console.error("Error subscribing to neighborhood:", error);
    throw error;
  }
};

export const unsubscribeFromNeighborhood = async (userId, neighborhoodId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      neighborhoods: arrayRemove(neighborhoodId)
    });
    
    const neighborhoodRef = doc(db, "neighborhoods", neighborhoodId);
    await updateDoc(neighborhoodRef, {
      subscribers: arrayRemove(userId)
    });
    
    return true;
  } catch (error) {
    console.error("Error unsubscribing from neighborhood:", error);
    throw error;
  }
};