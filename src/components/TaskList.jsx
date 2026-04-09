import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTasks } from "../hooks/useTasks";

export default function TaskList() {
  const { tasks, pendingCount, addTask, editTask, toggleTask, removeTask } =
    useTasks();
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(input);
    setInput("");
  };

  const beginEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const commitEdit = () => {
    if (!editingId) return;
    editTask(editingId, editingText);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <motion.section
      className="cyber-card col-span-1 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="card-label">Task Matrix</p>
        <p className="text-sm uppercase tracking-[0.2em] text-white/55">
          Pending: {pendingCount}
        </p>
      </div>

      <form
        className="mb-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          className="cyber-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add a mission..."
          maxLength={120}
        />
        <button className="cyber-button sm:w-auto" type="submit">
          Add Task
        </button>
      </form>

      <ul className="space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-white/15 bg-white/[0.03] p-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`h-6 w-6 rounded border transition ${
                    task.completed
                      ? "border-neon-cyan bg-neon-cyan shadow-neon-cyan"
                      : "border-neon-violet/60 bg-transparent"
                  }`}
                  aria-label="Toggle task"
                  type="button"
                />

                <div className="flex-1">
                  {editingId === task.id ? (
                    <input
                      className="cyber-input"
                      value={editingText}
                      onChange={(event) => setEditingText(event.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") commitEdit();
                        if (event.key === "Escape") {
                          setEditingId(null);
                          setEditingText("");
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <p
                      className={`cursor-text text-lg ${
                        task.completed
                          ? "text-white/40 line-through"
                          : "text-white/90"
                      }`}
                      onDoubleClick={() => beginEdit(task)}
                    >
                      {task.text}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    className="cyber-subtle-button"
                    onClick={() => beginEdit(task)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="cyber-subtle-button"
                    onClick={() => removeTask(task.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {tasks.length === 0 ? (
        <p className="mt-5 text-sm uppercase tracking-widest text-white/40">
          No missions yet. Start with one.
        </p>
      ) : null}
    </motion.section>
  );
}
