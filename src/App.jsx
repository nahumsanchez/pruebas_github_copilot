import { motion } from "framer-motion";
import Clock from "./components/Clock";
import TaskList from "./components/TaskList";
import WeatherWidget from "./components/WeatherWidget";

export default function App() {
  return (
    <main className="cyber-shell min-h-screen px-4 py-10 sm:px-8">
      <motion.header
        className="mx-auto mb-8 max-w-6xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-sm uppercase tracking-[0.35em] text-neon-cyan">
          Personal Dashboard
        </p>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.16em] text-white sm:text-5xl">
          Cyber Core Console
        </h1>
      </motion.header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2">
        <Clock />
        <WeatherWidget />
        <TaskList />
      </section>
    </main>
  );
}
