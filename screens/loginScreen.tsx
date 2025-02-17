import { View, Text, SafeAreaView, Platform, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  // const { startOAuthFlow: googleSignIn } = useOAuth({
  //   strategy: "oauth_google"
  // });
  // const { startOAuthFlow: appleSignIn } = useOAuth({ strategy: "oauth_apple" });

  const syncUserToSupabase = async () => {
    try {
      router.push("/(tabs)");
    } catch (error) {
      console.error("Error syncing user to Supabase:", error);
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: top }}>
      <View className="space-y-4 p-4">
        <Button size="md" variant="outline">
          <ButtonText>Continue with Google</ButtonText>
        </Button>
        {Platform.OS === "ios"
          ? <Button size="md" variant="outline">
              <ButtonText>Continue with Apple</ButtonText>
            </Button>
          : null}

        <Button size="md" variant="link">
          <ButtonText className="underline">الاستمرار بدون حساب</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
