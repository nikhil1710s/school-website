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
} from "firebase/firestore";

import { db } from "./firebase";

// Get all events
export const getAll = async () => {
  const snapshot = await getDocs(collection(db, "events"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get upcoming events
export const getUpcoming = async () => {
  const q = query(
    collection(db, "events"),
    where("upcoming", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get one event
export const getById = async (id) => {
  const document = await getDoc(doc(db, "events", String(id)));

  if (!document.exists()) return null;

  return {
    id: document.id,
    ...document.data(),
  };
};

// Create event
export const create = async (data) => {
  const docRef = await addDoc(collection(db, "events"), data);

  return {
    id: docRef.id,
    ...data,
  };
};

// Update event
export const update = async (id, data) => {
  await updateDoc(doc(db, "events", String(id)), data);

  return {
    id,
    ...data,
  };
};

// Delete event
export const remove = async (id) => {
  await deleteDoc(doc(db, "events", String(id)));

  return id;
};