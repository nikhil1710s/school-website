import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

// Get all faculty
export const getAll = async () => {
  const snapshot = await getDocs(collection(db, "faculty"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get one faculty
export const getById = async (id) => {
  const document = await getDoc(doc(db, "faculty", String(id)));

  if (!document.exists()) return null;

  return {
    id: document.id,
    ...document.data(),
  };
};

// Create faculty
export const create = async (data) => {
  const docRef = await addDoc(collection(db, "faculty"), data);

  return {
    id: docRef.id,
    ...data,
  };
};

// Update faculty
export const update = async (id, data) => {
  await updateDoc(doc(db, "faculty", String(id)), data);

  return {
    id,
    ...data,
  };
};

// Delete faculty
export const remove = async (id) => {
  await deleteDoc(doc(db, "faculty", String(id)));
  return id;
};