import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useFonts } from "expo-font";


export default function Index() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <StatusBar style="dark" />
        <View className="w-full h-full items-center justify-center px-4">
          <Link href="/home" className=" text-blue-600">
            Go to main page
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
