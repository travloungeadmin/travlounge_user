import { Platform, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { useTheme } from './theme-provider';

export function ThemeToggler() {
  const { theme, name, setTheme } = useTheme();

  const SunnyIcon = () => (
    <Svg
      width={Platform.OS === 'ios' ? 22 : 25}
      height={Platform.OS === 'ios' ? 22 : 25}
      viewBox="0 0 512 512">
      <Path
        fill="black"
        d="M256 118a22 22 0 0 1-22-22V48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22m0 368a22 22 0 0 1-22-22v-48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22m113.14-321.14a22 22 0 0 1-15.56-37.55l33.94-33.94a22 22 0 0 1 31.11 31.11l-33.94 33.94a21.93 21.93 0 0 1-15.55 6.44M108.92 425.08a22 22 0 0 1-15.55-37.56l33.94-33.94a22 22 0 1 1 31.11 31.11l-33.94 33.94a21.94 21.94 0 0 1-15.56 6.45M464 278h-48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44m-368 0H48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44m307.08 147.08a21.94 21.94 0 0 1-15.56-6.45l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.55 37.56M142.86 164.86a21.9 21.9 0 0 1-15.55-6.44l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.56 37.55M256 358a102 102 0 1 1 102-102a102.12 102.12 0 0 1-102 102"
      />
    </Svg>
  );

  const MoonIcon = () => (
    <Svg
      width={Platform.OS === 'ios' ? 22 : 25}
      height={Platform.OS === 'ios' ? 22 : 25}
      viewBox="0 0 512 512">
      <Path
        fill="black"
        d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480"
      />
    </Svg>
  );
  return (
    <TouchableOpacity onPress={() => setTheme(name === 'light' ? 'dark' : 'light')} hitSlop={4}>
      {name === 'dark' ? <SunnyIcon /> : <MoonIcon />}
    </TouchableOpacity>
  );
}
