import { ScrollView, View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter, useNavigation } from "expo-router";

const Home = () => {
  const navigation = useRouter();
  const onPress = () => {
    // Navigate to the payment history page
    navigation.push("index1");
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 10,
        }}
      >
        {/* graph of recent payments */}
        <TouchableHighlight
          onPress={() => {}}
          className="bg-slate-400 rounded-xl items-center justify-center w-full "
        >
          <View className="bg-slate-400 rounded-xl items-center justify-center w-full ">
            <Text className="text-center text-2xl font-black text-black">
              Graph of Recent Payments
            </Text>
            <View className="bg-pink-300 h-[300px] w-full rounded-xl items-center justify-center">
              <Text className="text-center text-2xl font-black text-black">
                Graph
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* list of recent payments */}
        <TouchableHighlight className="bg-slate-400 rounded-xl items-center justify-center w-full mt-2" onPress={onPress}>
          <View className="bg-slate-400 rounded-xl items-center justify-center w-full">
            <Text className="text-center text-2xl font-black text-black">
              Recent Payments
            </Text>
            <View className="bg-pink-300 h-[200px] w-full rounded-xl items-center justify-center">
              <Text className="text-center text-2xl font-black text-black">
                list
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* statistics of the all payments in the current period */}
        <TouchableHighlight className="bg-slate-400 rounded-xl items-center justify-center w-full mt-2" onPress={() => {}}>
          <View className="bg-slate-400 rounded-xl items-center justify-center w-full">
            <Text className="text-center text-2xl font-black text-black">
              Statistics
            </Text>
            <View className="bg-pink-300 h-[230px] w-full rounded-xl items-center justify-center">
              <Text className="text-center text-2xl font-black text-black">
                Graph
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
