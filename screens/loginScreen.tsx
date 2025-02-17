import { View, Text, SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useSSO } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageBackground } from "@/components/ui/image-background";
import image from "@/assets/images/bgImg.jpeg";
import logo from "@/assets/images/logo3.png";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google"
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.push("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple"
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.push("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_facebook"
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.push("/(tabs)");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleContinueAsGuest = () => {
    router.push("/(tabs)");
  };

  return (
    <ImageBackground source={image} className="flex-1">
      <SafeAreaView style={{ paddingTop: top }} className="flex-1">
        <View className="flex-1 px-6 py-10">
          <View className="w-full items-center justify-center">
            <Image
              source={logo}
              style={{ width: 180, height: 180, marginBottom: 20 }}
            />
          </View>
          {/* Header Section */}
          <View className="items-center mb-10">
            <Text className="text-2xl font-bold text-gray-800">
              تسجيل الدخول إلى حسابك
            </Text>
            <Text className="text-gray-500 mt-2">
              ابقَ على تواصل مع عالم الحيوانات
            </Text>
          </View>

          <View className="space-y-4 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="flex-row justify-center items-center border-[#e5e7eb] bg-white h-14"
              onPress={handleGoogleSignIn}
            >
              <Ionicons name="logo-google" className="mr-2" />
              <ButtonText className="text-gray-700 text-base">
                المتابعة مع Google
              </ButtonText>
            </Button>

            {Platform.OS === "ios" &&
              <Button
                size="lg"
                variant="outline"
                className="flex-row justify-center items-center border-[#e5e7eb] bg-white h-14"
                onPress={handleAppleSignIn}
              >
                <Ionicons name="logo-apple" className="mr-2" />
                <ButtonText className="text-gray-700 text-base">
                  المتابعة مع Apple
                </ButtonText>
              </Button>}

            <Button
              size="lg"
              variant="outline"
              className="flex-row justify-center items-center border-[#e5e7eb] bg-white h-14"
              onPress={handleFacebookSignIn}
            >
              <Ionicons name="logo-facebook" className="mr-2" />
              <ButtonText className="text-gray-700 text-base">
                المتابعة مع Facebook
              </ButtonText>
            </Button>
          </View>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-4 text-gray-400">أو</Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          <Button
            size="lg"
            variant="link"
            className="mt-2"
            onPress={handleContinueAsGuest}
          >
            <ButtonText className="text-blue-500 underline text-base">
              الاستمرار بدون حساب
            </ButtonText>
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default LoginScreen;
