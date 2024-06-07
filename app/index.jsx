import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";

import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export default function Index() {
  const [username, setUsername] = useState("");
  const navigation = useRouter();
  const onPress = async () => {
    setUsername(username.replace(/\s/g,''));
    console.log(username);
    try {
      const db = await SQLite.openDatabaseAsync("nativeDB");
      await db.execAsync(
        "create table if not exists users (id integer primary key autoincrement, value text);"
      );
      const allRows = await db.getAllAsync("SELECT * FROM users");
      if (allRows.length > 0) {
        await db.execAsync(
          `update users set value = "${username}" where id = 1;`
        );
        console.log(1);
      } else {
        await db.execAsync(`insert into users (value) values ("${username}");`);
        console.log(2);
      }
      console.log(" done ");
      navigation.push("home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView
      keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          height: "100%",
          backgroundColor: "#282828"
        }}
      >
        <StatusBar style="light" backgroundColor="#171616" />
        <View className="w-full h-full items-center justify-center px-4">
          <Image source={require("../assets/images/me.jpg")} 
          className="w-[195px] h-[195px] mb-2 rounded-full border-4 border-black"
          />
          <TextInput
            className="bg-[#D9D9D9] w-4/5 p-2 rounded-full mt-2"
            value={username}
            placeholder="Enter your name"
            placeholderTextColor={"#8C8C8C"}
            onChangeText={setUsername}
          />
          <TouchableHighlight
            className=" bg-blue-300 p-3 rounded-full mt-2 shadow-[#00C2FF] shadow-2xl"
            style={{ 
              backgroundColor: "#00C2FF",
              shadowColor: "#00C2FF",
              shadowOffset: {
                width: 32,
                height: 0
              },
              shadowOpacity: 0.25,
              shadowRadius: 32

             }}
            activeOpacity={0.6}
            onPress={onPress}
            underlayColor="#"
          >
            <Text>Go to main page</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*

position: absolute;
width: 149px;
height: 51px;
left: 140px;
top: 575px;

filter: drop-shadow(16px 16px 32px rgba(0, 194, 255, 0.25));



position: absolute;
width: 129px;
height: 31px;
left: 10px;
top: 10px;

background: #00C2FF;
border-radius: 10px;

*/