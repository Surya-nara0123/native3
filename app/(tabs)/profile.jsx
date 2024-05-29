import { ScrollView, View, Text, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import { get, ref } from "firebase/database";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useRouter();
  const onSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      await AsyncStorage.removeItem("userToken");
      navigation.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dbRef = ref(FIREBASE_DATABASE, `users/${FIREBASE_AUTH.currentUser.uid}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 10,
        }}
      >
        <View className="h-full w-full items-center">
          {/* graph of recent payments */}
          <View className="bg-gray-300 rounded-xl h-[300px] items-center w-full mt-[100px]">
            <Text className=" text-center text-2xl font-black text-black mt-[100px]">
              {user?.username}
            </Text>
            <TouchableHighlight
              onPress={onSignOut}
              className="bg-slate-400 rounded-xl items-center justify-center p-3 "
            >
              <Text className="text-center text-2xl font-black text-black">
                Sign Out
              </Text>
            </TouchableHighlight>
          </View>
          <StatusBar style="dark" />
          <MaterialCommunityIcons
            name="account"
            size={180}
            color="#171515"
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              left: "25%",
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
