import { View, Text, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const loginScreen = () => {
  const { user, setUser } = useAuth();
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 50 : 1 }} />
  );
};

export default loginScreen;
