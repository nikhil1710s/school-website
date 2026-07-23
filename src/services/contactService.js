import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const get = async () => {
  const document = await getDoc(doc(db, "settings", "contactInfo"));

  if (!document.exists()) return {};

  return document.data();
};

export const update = async (data) => {
  await setDoc(
    doc(db, "settings", "contactInfo"),
    data,
    { merge: true }
  );

  return data;
};