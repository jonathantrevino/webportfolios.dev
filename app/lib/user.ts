import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore, storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export const getUserInfo = async (uid: string) => {
  const userRef = doc(firestore, "users", uid);
  const response = await getDoc(userRef);
  if (response.exists()) {
    return {
      uid: response.data().uid,
      title: response.data().title,
      setup: response.data().setup,
      photoURL: response.data().photoURL,
      newsletter: response.data().newsletter,
      emailVisible: response.data().emailVisible,
      email: response.data().email,
      displayName: response.data().displayName,
    };
  }
  return null;
};

export const updateUsersProfilePic = async (
  profilePicture: string,
  uid: string,
) => {
  const userRef = doc(firestore, "users", uid);

  const profilePictureBlob = await fetch(profilePicture).then((response) =>
    response.blob(),
  );
  const fileRef = ref(storage, "/profile/" + uid);
  let photoURL;

  try {
    const snapshot = await uploadBytes(fileRef, profilePictureBlob).then(() => {
      return getDownloadURL(fileRef);
    });
    photoURL = snapshot;

    await setDoc(
      userRef,
      {
        photoURL: photoURL,
      },
      { merge: true },
    );
    return photoURL;
  } catch (e: any) {
    console.log("error occured here", e);
    return;
  }

  await updateDoc(userRef, {
    photoURL: photoURL,
  });
};

export const updateUsersName = async (
  first_name: string,
  last_name: string,
  uid: string,
) => {
  const userRef = doc(firestore, "users", uid);

  await updateDoc(userRef, {
    displayName: first_name + " " + last_name,
  });
};

export const updateUsersTitle = async (title: string, uid: string) => {
  const userRef = doc(firestore, "users", uid);

  await updateDoc(userRef, {
    title: title,
  });
};

export const updateVisits = async (
  portfolio_id: string,
  type: "unique" | "views",
) => {
  const portfolioRef = doc(firestore, "portfolios", portfolio_id);
  if (type === "unique") {
    await updateDoc(portfolioRef, {
      uniqueViews: increment(1),
      totalViews: increment(1),
    });
  } else if (type === "views") {
    await updateDoc(portfolioRef, {
      totalViews: increment(1),
    });
  }
};

export const viewPortfolio = async (portfolio_id: string) => {
  if (!portfolio_id) return null;

  const portfolioRef = doc(firestore, "portfolios", portfolio_id);

  const portfolioSnapshot = await getDoc(portfolioRef);

  if (!portfolioSnapshot.exists()) return null;

  const portfolio = portfolioSnapshot.data();

  const userRef = doc(firestore, "users", portfolio.user_id);

  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) return null;

  const user = userSnapshot.data();
  return {
    likes: portfolio.likes,
    photoURL: portfolio.photoURL,
    portfolioURL: portfolio.portfolioURL,
    user_id: portfolio.user_id,
    displayName: user.displayName,
    user_photoURL: user.photoURL,
    title: user.title,
  };
};

export const usersProfile = async (user_id: string) => {
  if (!user_id) return null;
};

export const usersPortfolio = async (user_id: string) => {
  if (!user_id) return null;

  const portfolioRef = doc(firestore, "portfolios", user_id);

  const portfolioSnapshot = await getDoc(portfolioRef);

  if (!portfolioSnapshot.exists()) return null;

  const portfolio = portfolioSnapshot.data();

  return {
    likes: portfolio.likes,
    photoURL: portfolio.photoURL,
    portfolioURL: portfolio.portfolioURL,
    user_id: portfolio.user_id,
    totalViews: portfolio.totalViews,
    uniqueViews: portfolio.uniqueViews,
  };
};

export const checkUserUpdate = async (user_id: string) => {
  const updatesRef = collection(firestore, "updates");

  const q = query(updatesRef, where("user_id", "==", user_id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0].data();
};

export const uploadPortfolio = async (
  url: string,
  user_id: string,
  firebase_id: string,
) => {
  try {
    // insert (or update if already exists) request into updates db

    const updateDoc = doc(firestore, "updates", user_id);

    await setDoc(updateDoc, {
      status: "Pending",
      statusCode: 0,
      statusMessage: "Calling API",
      user_id: user_id,
    });

    const response = await fetch(
      "https://vqa37eeoahmezfx6loxgsliijy0wppbf.lambda-url.us-east-1.on.aws/record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          user_id: user_id,
          firebase_id: firebase_id,
        }),
      },
    );

    // check if AWS Rekognition detected potential desired moderation
    if (response.status === 400) {
      return { status: false, statusText: "Moderation Detected" };
    }

    // check if screenshots were successful
    else if (response.status === 200) {
      const data = await response.json();

      let screenshots = data.screenshotData;
      let screenshotPhotoLocations = [];

      for (const screenshot of screenshots) {
        // Convert Uint8Array to a Blob
        const blob = new Blob([Uint8Array.from(screenshot.data)], {
          type: "image/png",
        });

        if (blob) {
          // Upload the Blob to Firestore Storage
          const storageRef = ref(
            storage,
            "/users/" + user_id + "/" + Date.now() + ".png",
          );

          // Store URL of uploaded file
          screenshotPhotoLocations.push(
            await uploadBytesResumable(storageRef, blob).then(() => {
              return getDownloadURL(storageRef);
            }),
          );
        }
      }
      const portfolioDocRef = doc(firestore, "portfolios", user_id);
      const userDocRef = doc(firestore, "users", user_id);

      let views = 0;
      let likes = 0;

      const date = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'America/Chicago',
      }).format(date)


      await setDoc(
        portfolioDocRef,
        {
          user_id: user_id,
          portfolioURL: url,
          photoURL: screenshotPhotoLocations,
          uniqueViews: views,
          totalViews: views,
          likes: likes,
          uploaded: formattedDate,
        },
        { merge: true },
      );

      await setDoc(userDocRef, {
        setup: true,
      }, { merge: true })

      return { status: true, statusText: "Upload Successful" };
    } else {
    }
  } catch (error) {
    console.log(error)
  }
};

export const paginatePortfolios = async (category: string | null, lastVisible: any) => {
  let userQ;
  let portfolioQ;
  if (lastVisible) {

    console.log(lastVisible.id)
  }
  // Create the user query based on the category (user title)
  userQ = query(
    collection(firestore, "users"),
    where('setup', '==', true),
    ...(category ? [where("title", "==", category)] : []), // Conditionally add title filter
    ...(lastVisible ? [startAfter(lastVisible)] : []), // Add pagination if lastVisible exists
    limit(6)
  );


  const userSnapshot = await getDocs(userQ);
  console.log(userSnapshot)

  const userIds = userSnapshot.docs.map(doc => doc.id)


  console.log(userIds)
  if (userIds.length === 0) {
    return null;
  }

  const lastDocument = userSnapshot.docs[userSnapshot.docs.length - 1];

  portfolioQ = query(collection(firestore, 'portfolios'), where('user_id', 'in', userIds || ''))

  const portfolioSnapshot = await getDocs(portfolioQ);

  if (portfolioSnapshot.empty) return null;


  let portfolios: any[] = [];

  for (const portfolio of portfolioSnapshot.docs) {
    // Convert snapshot to iterable using .docs

    // Fetch user data from Firestore
    const userRef = doc(firestore, "users", portfolio.id);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      // Add the portfolio and user data to the portfolios array
      portfolios.push({
        ...portfolio.data(), // Use portfolio.data() to get the actual data
        user_photoURL: userSnapshot.data()?.photoURL,
        user_displayName: userSnapshot.data()?.displayName,
        user_title: userSnapshot.data()?.title,
      });
    } else {
      console.log(`No user found for portfolio: ${portfolio.id}`);
    }
  }



  return { portfolios, lastDocument };
};
