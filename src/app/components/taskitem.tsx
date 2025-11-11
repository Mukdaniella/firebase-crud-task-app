import { Task } from "@/app/types/task";
import { updateTask, deleteTask } from "@/app/lib/firestore";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onEdit }: Props) {
  const handleToggleComplete = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div
      className={`p-5 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md 
      ${task.completed ? "opacity-70" : "opacity-100"} 
      bg-white border-gray-200 
      dark:bg-gray-800 dark:border-gray-700`}
    >
      {/* Task Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3
            className={`text-xl font-semibold mb-1 ${
              task.completed
                ? "text-gray-500 line-through"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
        </div>

        <span
          className={`text-sm px-2 py-1 rounded-lg font-medium
          ${
            task.priority === "High"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task Actions */}
      <div className="flex items-center justify-between mt-3">
        <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="w-4 h-4 accent-blue-500"
          />
          <span>Completed</span>
        </label>

        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
