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

export const getAll = async () => {
  const q = query(
    collection(db, "downloads"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getByCategory = async (category) => {
  const q = query(
    collection(db, "downloads"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getById = async (id) => {
  const document = await getDoc(doc(db, "downloads", String(id)));

  if (!document.exists()) return null;

  return {
    id: document.id,
    ...document.data(),
  };
};

export const create = async (data) => {
  const docRef = await addDoc(collection(db, "downloads"), data);
  return { id: docRef.id, ...data };
};

export const update = async (id, data) => {
  await updateDoc(doc(db, "downloads", String(id)), data);
  return { id, ...data };
};

export const remove = async (id) => {
  await deleteDoc(doc(db, "downloads", String(id)));
  return id;
};