import { createContext, useContext, useState, ReactNode } from "react";

// Define the theme context type
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void; // Function type
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider for the theme context
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  // Define the toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light"; // Determine new theme
      document.documentElement.classList.toggle("dark", newTheme === "dark"); // Update the class based on the new theme
      return newTheme; // Return the new theme
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
