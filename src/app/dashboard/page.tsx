'use client';

import { useState, useEffect } from "react";
import ProtectedRoute from "@/app/components/protectedroute";
import { useAuth } from "@/app/lib/useauth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import TaskItem from "@/app/components/taskitem";
import TaskForm  from "../components/taskform";
import { Task } from "@/app/types/task";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userEmail", "==", user.email)
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks: Task[] = [];
      snapshot.forEach((doc) => {
        fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      await addDoc(collection(db, "tasks"), taskData);
    } catch (error: any) {
      console.error("Error adding task:", error);
      alert("Failed to add task: " + error.message);
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, taskData);
      setEditingTask(null);
    } catch (error: any) {
      console.error("Error updating task:", error);
      alert("Failed to update task: " + error.message);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error: any) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task: " + error.message);
    }
  };

  const handleFinish = () => {
    setEditingTask(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-6 transition-colors duration-300">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              Logout
            </button>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Hello, <span className="font-semibold">{user?.email}</span> 👋
          </p>

          {/* Task Form */}
          <TaskForm
            userEmail={user?.email || ""}
            editingTask={editingTask}
            onFinish={handleFinish}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
          />

          {/* Task List */}
          <div className="grid gap-4 mt-8">
            {loading ? (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                Loading tasks...
              </p>
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200"
                >
                  <TaskItem
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                No tasks yet. Create your first task above!
              </p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
