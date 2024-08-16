import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
