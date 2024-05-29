import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainPageLayout = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    
  });
  return (
    <>
      <Tabs
        showHeader={false}
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "transparent",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="hat-fedora"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="information"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default MainPageLayout;

const styles = StyleSheet.create({});
