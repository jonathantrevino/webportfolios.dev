import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const { uid, email, displayName, photoURL } = user;

    if (photoURL) {
      try {
        await bucket.upload(photoURL, {
          destination: `/profile/${uid}.png`,
        });

        console.log("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Merge the extracted user data with additional properties
    const userWithAdditionalData = {
      uid,
      email,
      displayName,
      photoURL,
      newsletter: false,
      emailVisible: false,
      setup: false,
    };

    db.collection("users").doc(user.uid).set(userWithAdditionalData);
  });
