import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function TopNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        height: "60px",
        background: theme === "dark" ? "#222" : "#1976d2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h1>Society</h1>
      <button
        onClick={toggleTheme}
        style={{
          background: "white",
          color: "#1976d2",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
