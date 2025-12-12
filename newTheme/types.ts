import type { ThemeColors } from '../newConstants/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

export type Theme = ThemeColors;

export interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}
