import { ScrollView, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Link, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const About = () => {
  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View className="h-full w-full m-2 items-center">
          <Image
            source={require("../../assets/images/me.jpg")}
            className="absolute y-0 h-[200px] w-[200px] rounded-3xl border-black border-8 z-10 mx-auto p-3"
          />
          <View className=" bg-slate-300 h-2/5 w-auto m-1 rounded-lg items-center mt-[100px]">
            <Text className="text-center text-2xl font-black text-black mt-[100px]">
              Surya Narayanan C{"\n"}
            </Text>
            <Text className="text-center text-1xl font-normal text-black">
              Hi!!! Everyone this is Surya Narayanan C, I am a Full Stack...
              {"\n"}
              pls help me to complete this [This is a sample text, please
              replace it with your own content ]
            </Text>
            <View className=" flex flex-row my-auto">
              <Link href="https://github.com/Surya-nara0123" className="text-blue-500">
                <MaterialCommunityIcons name="github" size={40} color="#171515" />
              </Link>
              <Link href="www.linkedin.com/in/surya-narayanan-c-a43855291" className="text-blue-500">
                <MaterialCommunityIcons name="linkedin" size={40} color="#0A66C2" />
              </Link>
            </View>
          </View>
        </View>
        <Text>Yoooo</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
