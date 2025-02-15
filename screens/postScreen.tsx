import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";

const postScreen = () => {
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 50 : 1 }}>
      <Text>postScreen</Text>
    </SafeAreaView>
  );
};

export default postScreen;
