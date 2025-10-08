import { Slot, useGlobalSearchParams, usePathname } from 'expo-router';

export default function RootLayout() {
  const path = usePathname();
  const params = useGlobalSearchParams();
  console.log('⭐ path', path, params);

  return <Slot />;
}
