import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      if (!isLoaded) return;

      const inTabsGroup = segments[0] === "(tabs)";

      if (isSignedIn && !inTabsGroup) {
        router.replace("/(tabs)");
      }

      setLoading(false);
    },
    [isSignedIn, isLoaded, segments]
  );

  // Don't render anything while checking auth state
  if (!isLoaded || loading) {
    return null;
  }

  return <Slot />;
};

export default function Layout() {
  return <InitialLayout />;
}
