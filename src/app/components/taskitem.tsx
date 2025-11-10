import { Task } from "@/app/types/task";
import { updateTask, deleteTask } from "@/app/lib/firestore";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onEdit }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <label>
        Completed:{" "}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => updateTask(task.id, { completed: !task.completed })}
        />
      </label>
      <br />
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}
