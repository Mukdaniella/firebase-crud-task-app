'use client'

import { useState, useEffect } from "react";
import { addTask, updateTask } from "@/app/lib/firestore";
import { Task } from "@/app/types/task";

interface Props {
  userEmail: string;
  editingTask?: Task | null;
  onFinish: () => void;
}

export default function TaskForm({ userEmail, editingTask, onFinish }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");

    if (editingTask) {
      await updateTask(editingTask.id, { title, description, priority });
    } else {
      await addTask({ title, description, priority, completed: false, userEmail });
    }

    onFinish();
    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mt-6 w-full max-w-md mx-auto transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
