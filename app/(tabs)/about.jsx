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
          backgroundColor: "#282828",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View className="h-full w-full m-2 items-center">
          <Image
            source={require("../../assets/images/me.jpg")}
            className="absolute y-0 h-[200px] w-[200px] border-black border-8 z-10 mx-auto p-3"
            style={{ 
              top: 0,
              borderRadius: 100,
              borderColor: "#171616",
              borderWidth: 4,
             }}
          />
          <View className=" bg-[#171717] h-2/5 w-auto m-1 rounded-lg items-center mt-[100px] px-2">
            <Text className="text-center text-2xl font-black text-white mt-[100px]">
              Surya Narayanan C{"\n"}
            </Text>
            <Text className="text-center text-1xl font-normal text-white">
              Hi!!! Everyone this is Surya Narayanan C, I am a Full Stack...
              {"\n"}
              pls help me to complete this [This is a sample text, please
              replace it with your own content ]
            </Text>
            <View className=" flex flex-row my-auto">
              <Link href="https://github.com/Surya-nara0123" className="text-blue-500">
                <MaterialCommunityIcons name="github" size={40} color="#e8eaea" />
              </Link>
              <Link href="https://www.linkedin.com/in/suryanara0123" className="text-blue-500">
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
