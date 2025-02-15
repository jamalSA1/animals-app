import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";

const vedioScreen = () => {
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 50 : 1 }}>
      <Text>vedioScreen</Text>
    </SafeAreaView>
  );
};

export default vedioScreen;
