import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";

const homeScreen = () => {
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 50 : 1 }}>
      <Text>homeScreen</Text>
    </SafeAreaView>
  );
};

export default homeScreen;
