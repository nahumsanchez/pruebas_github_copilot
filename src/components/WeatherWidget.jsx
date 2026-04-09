import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";

export default function WeatherWidget() {
  const { status, weather, message, mood, requestWeather } = useWeather();

  return (
    <motion.section
      className="cyber-card col-span-1"
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="card-label">Weather Pulse</p>
        <span className="rounded-full border border-neon-violet/60 px-3 py-1 text-xs uppercase tracking-wider text-neon-violet">
          {mood}
        </span>
      </div>

      {!weather ? (
        <div className="space-y-4">
          <p className="text-white/70">{message}</p>
          <button
            className="cyber-button"
            onClick={requestWeather}
            type="button"
          >
            Grant Location Access
          </button>
          <p className="text-xs uppercase tracking-wider text-white/40">
            status: {status}
          </p>
        </div>
      ) : (
        <div className="space-y-3 text-white/85">
          <div className="flex items-end justify-between">
            <p className="font-display text-4xl text-neon-violet">
              {weather.temperature}C
            </p>
            <p className="text-sm uppercase tracking-[0.25em] text-neon-cyan">
              {weather.condition}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-white/50">Humidity</p>
              <p className="text-xl">{weather.humidity}%</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-white/50">Wind</p>
              <p className="text-xl">{weather.wind} m/s</p>
            </div>
          </div>

          <p className="text-xs uppercase tracking-widest text-white/45">
            coords: {weather.coordinates}
          </p>
          <p className="text-xs uppercase tracking-widest text-white/45">
            updated: {weather.updatedAt}
          </p>
          <button
            className="cyber-button mt-2"
            onClick={requestWeather}
            type="button"
          >
            Refresh Local Weather
          </button>
        </div>
      )}
    </motion.section>
  );
}
