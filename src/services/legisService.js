import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const getLegislationSummaries = async (
  neighborhoodIds,
  page = 1,
  pageSize = 10
) => {
  try {
    const legislationCollection = collection(db, "legislation");
    let q;

    if (neighborhoodIds && neighborhoodIds.length > 0) {
      q = query(
        legislationCollection,
        where("affectedNeighborhoods", "array-contains-any", neighborhoodIds),
        orderBy("dateProposed", "desc"),
        limit(pageSize)
      );
    } else {
      q = query(
        legislationCollection,
        orderBy("dateProposed", "desc"),
        limit(pageSize)
      );
    }

    const legislationSnapshot = await getDocs(q);

    return legislationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching legislation summaries:", error);
    throw error;
  }
};

export const getLegislationDetail = async (legislationId) => {
  try {
    const legislationDoc = doc(db, "legislation", legislationId);
    const legislationSnapshot = await getDoc(legislationDoc);

    if (!legislationSnapshot.exists()) {
      throw new Error("Legislation not found");
    }

    return {
      id: legislationSnapshot.id,
      ...legislationSnapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching legislation detail:", error);
    throw error;
  }
};

export const searchLegislation = async (searchTerm) => {
  try {
    const legislationCollection = collection(db, "legislation");
    const q = query(legislationCollection);
    const legislationSnapshot = await getDocs(q);

    const results = legislationSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (legislation) =>
          legislation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          legislation.plainLanguageSummary
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );

    return results;
  } catch (error) {
    console.error("Error searching legislation:", error);
    throw error;
  }
};
