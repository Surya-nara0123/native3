import { ScrollView, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className=" flex-1">
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          margin: 2,
          flexGrow: 1,
          marginHorizontal: 20,
        }}
      >
        <View className=" w-screen items-center mt-1 pb-[150px]">
          <View className="bg-pink-300 h-2/5 w-11/12 m-1 rounded-lg items-center">
            <Text className="text-center text-2xl font-black text-black">
              graph of payment made recently
            </Text>
          </View>
          <View className="bg-slate-300 h-2/5 w-11/12 m-1 rounded-lg items-center">
            <Text className="text-center text-2xl font-black text-black">
              recent payments made
            </Text>
          </View>
          <View className="bg-slate-300 h-2/5 w-11/12 m-1 rounded-lg items-center">
            <Text className="text-center text-2xl font-black text-black">
              recent payments made
            </Text>
          </View>
          <View className="bg-slate-300 h-2/5 w-11/12 m-1 rounded-lg items-center">
            <Text className="text-center text-2xl font-black text-black">
              recent payments made
            </Text>
          </View>
          <View className="bg-slate-300 h-2/5 w-11/12 m-1 rounded-lg items-center">
            <Text className="text-center text-2xl font-black text-black">
              recent payments made
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
