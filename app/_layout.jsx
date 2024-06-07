import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="newform" options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="(paymenthistory)" options={{headerShown:false}}/>
    </Stack>
  );
}
