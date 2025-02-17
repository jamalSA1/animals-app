import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const postScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ paddingTop: top }}>
      <Text>postScreen</Text>
    </SafeAreaView>
  );
};

export default postScreen;
