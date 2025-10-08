// import CustomHeader from "@/components/common/custom-header";
import useUserStore from '@/modules/user';
import CustomHeader from '@/old/components/common/custom-header';
import { Stack } from 'expo-router';

export default function MainLayout() {
  const { session, isRegistered, user } = useUserStore();

  // if (!isRegistered) {
  //   return <Redirect href="/edit-profile" />;
  // }
  // if (!session) {
  //   return <Redirect href="/auth" />;
  // }
  return (
    <Stack
      // initialRouteName="(tabs)"
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      {/* <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
        }}
      /> */}
      <Stack.Screen
        name="travlounge/home"
        options={{
          //   header: () => (
          //     // <CustomHeader isHome={true} title={'Search'} isBack={true} isWallet={false} />
          //   ),
          header: () => (
            <CustomHeader isHome={false} title={'Travlounge'} isBack={true} isWallet={false} />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="services/[service]"
        options={{
          header: () => (
            <CustomHeader isHome={false} title={'Toloo'} isBack={true} isWallet={false} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          header: () => (
            <CustomHeader isHome={false} title={'Search'} isBack={true} isWallet={false} />
          ),
          headerShown: true,
        }}
      />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="auth" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}
