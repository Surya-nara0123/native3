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
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../firebaseConfig";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set, ref } from "firebase/database";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await AsyncStorage.setItem("userToken", response.user.stsTokenManager.accessToken);
      const user = response.user;
      const db = FIREBASE_DATABASE;
      const userRef = ref(db, `users/${user.uid}`);
      console.log(response);
      const response1 = await set(userRef, {
        email: user.email,
        username: username,
      });
      navigation.push("home");
    } catch (error) {
      alert(error.message);
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
            placeholder="Enter Username"
            onChangeText={(text) => setUsername(text)}
            className=" bg-gray-200 w-4/5 rounded-full p-2"
          />
          <TextInput
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
            className=" bg-gray-200 w-4/5 rounded-full p-2 mt-2"
          />
          <TextInput
            placeholder="Enter password"
            onChangeText={(text) => setPassword(text)}
            className=" bg-gray-200 w-4/5 rounded-full p-2 mt-2"
            secureTextEntry={true}
            textContentType=""
          />
          {!loading ? (
            <TouchableHighlight
              className=" bg-blue-300 p-3 rounded-full mt-2"
              onPress={onPress}
              underlayColor="#"
            >
              <Text>Go to main page</Text>
            </TouchableHighlight>
          ) : (
            <ActivityIndicator size="medium`" color="#0000ff" />
          )}
          <Text>Already have an account? </Text>
          <Link href="/" className="mt-2">
            <Text>Login</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
