import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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

export const viewPortfolio = async (portfolio_id: string) => {
  if (!portfolio_id) return null;

  const portfolioRef = doc(firestore, "portfolios", portfolio_id);

  const portfolioSnapshot = await getDoc(portfolioRef);

  if (!portfolioSnapshot.exists()) return null;

  const portfolio = portfolioSnapshot.data();
  console.log(portfolio);

  return {
    likes: portfolio.likes,
    photoURL: portfolio.photoURL,
    portfolioURL: portfolio.portfolioURL,
    user_id: portfolio.user_id,
    views: portfolio.views,
  };
};

export const usersPortfolio = async (user_id: string) => {
  if (!user_id) return null;

  const portfolioRef = doc(firestore, "portfolios", user_id);

  const portfolioSnapshot = await getDoc(portfolioRef);

  if (!portfolioSnapshot.exists()) return null;

  const portfolio = portfolioSnapshot.data();
  console.log(portfolio);

  return {
    likes: portfolio.likes,
    photoURL: portfolio.photoURL,
    portfolioURL: portfolio.portfolioURL,
    user_id: portfolio.user_id,
    views: portfolio.views,
  };
};

export const uploadPortfolio = async (url: string, user_id: string) => {
  try {
    const response = await fetch(
      "https://vqa37eeoahmezfx6loxgsliijy0wppbf.lambda-url.us-east-1.on.aws/record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }), // Pass the URL to record
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

      console.log("screenshots: ", screenshots);
      for (const screenshot of screenshots) {
        console.log("screenshot: ", screenshot);

        // Convert Uint8Array to a Blob
        const blob = new Blob([Uint8Array.from(screenshot.data)], {
          type: "image/png",
        });

        console.log(blob);
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

      let views = 0;
      let likes = 0;

      await setDoc(
        portfolioDocRef,
        {
          user_id: user_id,
          portfolioURL: url,
          photoURL: screenshotPhotoLocations,
          views: views,
          likes: likes,
        },
        { merge: true },
      );
      return { status: true, statusText: "Upload Successful" };
    } else {
    }
  } catch (error) {}
};
