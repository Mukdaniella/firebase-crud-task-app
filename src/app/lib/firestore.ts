import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "@/app/types/task";

const tasksCol = collection(db, "tasks");

export const addTask = async (task: Omit<Task, "id">) => {
  const ref = await addDoc(tasksCol, { ...task, createdAt: serverTimestamp() });
  return ref.id;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  await updateDoc(doc(db, "tasks", id), data);
};

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};

export const listenToTasks = (userEmail: string, callback: (tasks: Task[]) => void) => {
  const q = query(tasksCol, where("userEmail", "==", userEmail), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );
    callback(tasks);
  });
};
