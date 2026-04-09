import { useMemo, useState } from "react";

const CONDITIONS = ["Clear", "Cloudy", "Storm", "Mist", "Drizzle", "Aurora"];

function toFixedNumber(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function synthesizeWeather(lat, lon, now = new Date()) {
  const seed = Math.abs(
    Math.round((lat + 90) * 1000 + (lon + 180) * 1000 + now.getHours() * 97),
  );
  const condition = CONDITIONS[seed % CONDITIONS.length];

  const daylightFactor = Math.sin((now.getHours() / 24) * Math.PI * 2) * 3;
  const latitudeFactor = (30 - Math.abs(lat)) / 6;
  const temperature = toFixedNumber(18 + daylightFactor + latitudeFactor);
  const humidity = Math.max(25, Math.min(92, 40 + (seed % 50)));
  const wind = toFixedNumber(4 + (seed % 18) / 2);

  return {
    condition,
    temperature,
    humidity,
    wind,
    coordinates: `${toFixedNumber(lat)}, ${toFixedNumber(lon)}`,
    updatedAt: now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
}

export function useWeather() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(
    "Enable geolocation to build a local weather pulse.",
  );
  const [weather, setWeather] = useState(null);

  const requestWeather = () => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      setMessage("This browser does not support geolocation.");
      return;
    }

    setStatus("loading");
    setMessage("Requesting location...");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const generated = synthesizeWeather(coords.latitude, coords.longitude);
        setWeather(generated);
        setStatus("ready");
        setMessage("Weather generated from your local coordinates.");
      },
      (error) => {
        if (error.code === 1) {
          setStatus("denied");
          setMessage(
            "Location denied. You can grant permission and try again.",
          );
          return;
        }

        setStatus("error");
        setMessage("Could not read geolocation. Try again.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 120000 },
    );
  };

  const mood = useMemo(() => {
    if (!weather) return "Offline";
    if (weather.temperature >= 27) return "Hot";
    if (weather.temperature <= 12) return "Cold";
    return "Balanced";
  }, [weather]);

  return {
    status,
    message,
    weather,
    mood,
    requestWeather,
  };
}
