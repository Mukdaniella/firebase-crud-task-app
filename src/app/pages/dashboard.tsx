import { useAuth } from "@/app/lib/useauth";
import ProtectedRoute from "@/app/components/protectedroute";
import TaskForm from "@/app/components/taskform";
import TaskItem from "@/app/components/taskitem";
import { useEffect, useState } from "react";
import { listenToTasks } from "@/app/lib/firestore";
import { Task } from "@/app/types/task";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/router";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) return;
    const unsubscribe = listenToTasks(user.email, setTasks);
    return () => unsubscribe();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello, {user?.email}</h1>
      <button onClick={() => { signOut(auth); router.push("/login"); }}>Logout</button>
      <TaskForm userEmail={user?.email || ""} editingTask={editingTask} onFinish={() => setEditingTask(null)} />
      <h2>Your Tasks</h2>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onEdit={setEditingTask} />
      ))}
    </div>
  );
}
