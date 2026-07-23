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

// Get all gallery items
export const getAll = async () => {
  const q = query(
    collection(db, "gallery"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get gallery by category
export const getByCategory = async (category) => {
  const q = query(
    collection(db, "gallery"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get one gallery item
export const getById = async (id) => {
  const document = await getDoc(doc(db, "gallery", String(id)));

  if (!document.exists()) return null;

  return {
    id: document.id,
    ...document.data(),
  };
};

// Create gallery item
export const create = async (data) => {
  const docRef = await addDoc(collection(db, "gallery"), data);

  return {
    id: docRef.id,
    ...data,
  };
};

// Update gallery item
export const update = async (id, data) => {
  await updateDoc(doc(db, "gallery", String(id)), data);

  return {
    id,
    ...data,
  };
};

// Delete gallery item
export const remove = async (id) => {
  await deleteDoc(doc(db, "gallery", String(id)));
  return id;
};