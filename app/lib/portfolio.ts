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
import { UserType } from "@/types";

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

        let userData: UserType | null = null;
        if (userDocSnapshot.exists()) {
          userData = userDocSnapshot.data() as UserType;
        }

        return {
          ...portfolioData,
          user_displayName: userData!.displayName,
          user_photoURL: userData!.photoURL,
          user_title: userData!.title,
        };
      })
    );
    return portfolios
  }




}
