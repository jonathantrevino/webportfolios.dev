import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import cors from 'cors';
admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

// Enable CORS
const corsHandler = cors({ origin: true });

exports.createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const { uid, email, displayName, photoURL } = user;

    if (photoURL) {
      try {
        await bucket.upload(photoURL, {
          destination: `/profile/${uid}.png`,
        });
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

exports.subscribeToNewsletter = functions.https.onRequest(async (req: any, res: any) => {
  corsHandler(req, res, async () => {

    // Ensure it's a POST request
    if (req.method !== 'POST') {
      res.status(405).send({ success: false, message: 'Method Not Allowed' });
      return; // Ensure we return here after sending the response
    }
    const email = req.body.email; // Get the email from the request body

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send({ success: false, message: 'Invalid email address' });
    }

    const db = admin.firestore(); // Initialize Firestore
    const docRef = db.collection('newsletter').doc(email); // Reference the document based on the email

    // Check if the email already exists
    const doc = await docRef.get(); // Get the document
    if (doc.exists) {
      return res.status(409).send({ success: false, message: 'Email already subscribed' });
    }

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "America/Chicago",
    }).format(date);

    // Save the email
    await docRef.set({ email, subscribed: formattedDate }); // Save the email to Firestore
    return res.status(201).send({ success: true, message: 'Subscribed successfully' });
  })
});

