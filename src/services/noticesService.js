import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

// Get all notices (latest first)
export const getAll = async () => {
  const q = query(
    collection(db, "notices"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get pinned notices
export const getPinned = async () => {
  const q = query(
    collection(db, "notices"),
    where("pinned", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get one notice
export const getById = async (id) => {
  const document = await getDoc(doc(db, "notices", String(id)));

  if (!document.exists()) return null;

  return {
    id: document.id,
    ...document.data(),
  };
};

// Create notice
export const create = async (data) => {
  const docRef = await addDoc(collection(db, "notices"), data);

  return {
    id: docRef.id,
    ...data,
  };
};

// Update notice
export const update = async (id, data) => {
  await updateDoc(doc(db, "notices", String(id)), data);

  return {
    id,
    ...data,
  };
};

// Delete notice
export const remove = async (id) => {
  await deleteDoc(doc(db, "notices", String(id)));

  return id;
};