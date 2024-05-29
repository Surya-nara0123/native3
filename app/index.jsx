import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { FIREBASE_AUTH } from "../firebaseConfig";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.push("home");
      }
    };
    checkToken();
  }, []);
  const onPress = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("userToken", response.user.stsTokenManager.accessToken);
      // console.log(response);
      navigation.push("home");
    } catch (error) {
      alert("Invalid email or password");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <StatusBar style="dark" />
        <View className="w-full h-full items-center justify-center px-4">
          <TextInput
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
            className=" bg-gray-200 w-4/5 rounded-full p-2"
          />
          <TextInput
            placeholder="Enter password"
            onChangeText={(text) =>setPassword(text)}
            className=" bg-gray-200 w-4/5 rounded-full p-2 mt-2"
            secureTextEntry={true}
            textContentType=""
          />
          {!(loading) ? (
          <TouchableHighlight
            className=" bg-blue-300 p-3 rounded-full mt-2"
            onPress={onPress}
            underlayColor="#"
          >
            <Text>Go to main page</Text>
          </TouchableHighlight>): (
            <ActivityIndicator size="medium`" color="#0000ff"/>
          )}
          <Text>Don't have an account? </Text>
          <Link href="/signup" className="mt-2">
            <Text>Register</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
