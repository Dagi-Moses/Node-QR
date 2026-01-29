// stores/themeStore.ts
import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  setDarkMode: (value) => {
    set({ isDarkMode: value });
    localStorage.setItem("theme", value ? "dark" : "light");
    document.documentElement.classList.toggle("dark", value);
  },
  toggleTheme: () =>
    set((state) => {
      const newValue = !state.isDarkMode;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newValue);
      return { isDarkMode: newValue };
    }),
}));
