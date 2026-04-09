import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cyber-dashboard-tasks-v1";

function parseStoredTasks(rawValue) {
  try {
    const parsed = JSON.parse(rawValue || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(() =>
    parseStoredTasks(localStorage.getItem(STORAGE_KEY)),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const pendingCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  );

  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const editTask = (id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task)),
    );
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    pendingCount,
    addTask,
    editTask,
    toggleTask,
    removeTask,
  };
}
