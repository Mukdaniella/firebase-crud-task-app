'use client';

import { useState } from "react";
import ProtectedRoute from "@/app/components/protectedroute";
import { useAuth } from "@/app/lib/useauth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import TaskItem from "@/app/components/taskitem";
import TaskForm from "../components/taskform";
import { Task } from "@/app/types/task";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Local state for managing tasks and editing
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleFinish = () => {
    setEditingTask(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-6 transition-colors duration-300">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* Task Form */}
          <TaskForm
            userEmail={user?.email || ""}
            editingTask={editingTask}
            onFinish={handleFinish}
          />

          {/* Task List */}
          <div className="grid gap-4 mt-8">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={setEditingTask} />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                No tasks yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
