import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";
import { SupabaseProvider } from "@/context/SupabaseContext";

SplashScreen.preventAutoHideAsync();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });

  useEffect(
    () => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    },
    [loaded]
  );

  if (!loaded) {
    return null;
  }

  return (
    <SupabaseProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <StatusBar style="auto" />
          <GluestackUIProvider mode="light">
            <InitialLayout />
          </GluestackUIProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </SupabaseProvider>
  );
}
