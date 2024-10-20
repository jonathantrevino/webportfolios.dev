import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { PortfolioType, UserType } from "@/types";

export async function getRecentPortfolios(lastVisible: any) {
  const portfolioRef = collection(firestore, 'portfolios');
  let portfolioQuery = query(
    portfolioRef,
    orderBy('uploaded', 'desc'),
    limit(5),
  )
  if (lastVisible) {
    portfolioQuery = query(portfolioRef, orderBy('uploaded', 'desc'), startAfter(lastVisible), limit(3))
  }

  const querySnapshot = await getDocs(portfolioQuery)
  if (!querySnapshot.empty) {
    const portfolios = await Promise.all(
      querySnapshot.docs.map(async (docItem) => {
        const portfolioData = docItem.data();
        const userId = portfolioData.user_id;

        // Fetch user information from Firestore
        const userDocRef = doc(firestore, 'users', userId); // Assume users collection
        const userDocSnapshot = await getDoc(userDocRef);

        let userData = null;
        if (userDocSnapshot.exists()) {
          userData = userDocSnapshot.data() as UserType;
        }

        return {
          ...portfolioData,
          user_displayName: userData?.displayName || 'Anonymous',
          user_photoURL: userData?.photoURL || '/default.png',
          user_title: userData?.title || 'No Title',
        } as PortfolioType;
      })
    );
    return portfolios
  }
  return []
}

export async function getAllPortfolios() {

  try {
    // Create a reference to the collection
    const collectionRef = collection(firestore, "yourCollectionName");

    // Fetch all documents in the collection
    const querySnapshot = await getDocs(collectionRef);

    // Map through the documents and extract the data
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Get the document data
    }));

    return documents; // Return the array of documents
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error; // Rethrow the error for handling upstream if necessary
  }
}
