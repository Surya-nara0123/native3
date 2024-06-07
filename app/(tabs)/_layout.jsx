import { StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MainPageLayout = () => {
  return (
    <>
      <Tabs
        showHeader={false}
        screenOptions={{
          tabBarActiveTintColor: "#00C2FF",
          tabBarInactiveTintColor: "#CDCDE0",
          justifyContent: "center",
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1D1D1D",
            borderTopWidth: 1,
            borderTopColor: "transparent",
            height: 70,
            paddingBottom: 7,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarBadgeStyle: {
              paddingBottom: 20,
              shadowColor: "#00C2FF",
              shadowOffset: {
                width: 64,
                height: 64,
              },
            },
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
            tabBarBadgeStyle: {
              paddingBottom: 20,
              shadowColor: "#00C2FF",
              shadowOffset: {
                width: 64,
                height: 64,
              },
            },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
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
            tabBarBadgeStyle: {
              paddingBottom: 20,
              shadowColor: "#00C2FF",
              shadowOffset: {
                width: 64,
                height: 64,
              },
            },
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


/*

position: absolute;
width: 430px;
height: 89px;
left: 0px;
top: 0px;

background: linear-gradient(180deg, #282828 0%, #1D1D1D 55.5%);

*/