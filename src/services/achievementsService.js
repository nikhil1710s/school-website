import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export const getAll = async () => {
  const snapshot = await getDocs(collection(db, "achievements"));

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getStudentAchievements = async () => {
  const q = query(
    collection(db, "achievements"),
    where("type", "==", "student")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getTeacherAchievements = async () => {
  const q = query(
    collection(db, "achievements"),
    where("type", "==", "teacher")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getSchoolAchievements = async () => {
  const q = query(
    collection(db, "achievements"),
    where("type", "==", "school")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const create = async (data) => {
  const docRef = await addDoc(collection(db, "achievements"), data);
  return { id: docRef.id, ...data };
};

export const update = async (id, data) => {
  await updateDoc(doc(db, "achievements", String(id)), data);
  return { id, ...data };
};

export const remove = async (id) => {
  await deleteDoc(doc(db, "achievements", String(id)));
  return id;
};