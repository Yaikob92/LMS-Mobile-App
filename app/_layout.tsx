import { ThemeProvider } from "@/contex/theme.contex";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboading/index" />
      </Stack>
    </ThemeProvider>
  );
}
