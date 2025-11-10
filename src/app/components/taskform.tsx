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
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">{editingTask ? "Update" : "Add"} Task</button>
    </form>
  );
}
