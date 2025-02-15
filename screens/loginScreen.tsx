import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";

const loginScreen = () => {
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 50 : 1 }}>
      <Text>loginScreen</Text>
    </SafeAreaView>
  );
};

export default loginScreen;
