import React, { useEffect, useState } from "react";

function DarkmodeToggle() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <button
      className="  text-lg rounded-full  text-gray-500 dark:text-white "
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {" "}
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkmodeToggle;
