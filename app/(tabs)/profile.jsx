import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState([]);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [textinput, setTextinput] = useState("");
  const [colors, setColors] = useState([
    "bg-red-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-purple-400",
  ]);
  const navigation = useRouter();
  const onDelete = async (color) => {
    const db = await SQLite.openDatabaseAsync("nativeDB");
    await db.execAsync(
      `update colortags set tag = 'unassigned' where id = ${color};`
    );
    const tags = await db.getAllAsync("select * from colortags;");
    setTags(tags);
    console.log(tags);
  };
  const onSignOut = async () => {
    navigation.push("/");
  };

  const onSubmit = async (text, color) => {
    const db = await SQLite.openDatabaseAsync("nativeDB");
    const tags = await db.getAllAsync("select * from colortags;");
    console.log(tags);
    const tag = tags.find((tag) => tag.color == color);
    if (!tag) {
      console.log("no tag");
      await db.execAsync(
        `insert into colortags (tag, color) values ('${text}', '${color}');`
      );
    } else {
      console.log("tag");
      await db.execAsync(
        `update colortags set tag = '${text}' where color = '${color}';`
      );
    }

    const newtags = await db.getAllAsync("select * from colortags;");
    setTags(newtags);
    setEdit([false, false, false, false, false]);
    setTextinput("");
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const db = await SQLite.openDatabaseAsync("nativeDB");
      const user = await db.getAllAsync("select * from users where id = 1;");
      console.log(user);
      if (user.length > 0) {
        setUsername(user[0].value);
      }
    };
    fetchUsername();
    const getAllTags = async () => {
      const db = await SQLite.openDatabaseAsync("nativeDB");
      await db.execAsync(
        "create table if not exists colortags (id integer primary key, tag text default 'unassigned', color text unique, username text);"
      );
      const tags = await db.getAllAsync("select * from colortags;");
      setTags(tags);
      console.log(tags);
    };
    getAllTags();
  }, []);
  return (
    <SafeAreaView className="#282828">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          backgroundColor: "#282828",
          alignItems: "center",
          padding: 10,
          paddingBottom: 100,
        }}
      >
        {/* main part of profile: Name and photo and signout button */}
        <View className="bg-[#171616] rounded-xl h-[300px] items-center w-full mt-[100px]">
          <Text className=" text-center text-2xl font-black text-white mt-[100px]">
            {username}
          </Text>
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
            onPress={onSignOut}
            underlayColor="#"
          >
            <Text>Sign Out</Text>
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
            top: 10,
            left: "28%",
            borderRadius: 150,
            borderWidth: 5,
          }}
        />
        <View className="bg-[#171616] rounded-xl h-min-[300px] items-center w-full mt-2 pb-3 px-2">
          <Text className=" text-center text-2xl font-black text-white mt-2">
            Tags
          </Text>
          <View className="w-full mb-2">
            {colors.map((color, i) =>
              !edit[i] ? (
                <View
                  key={i}
                  className={`${color} rounded-xl items-center justify-center m-0.5 flex-row px-4`}
                >
                  <Text className="text-center text-2xl font-black text-black mr-auto">
                    {tags[i]
                      ? tags[i].color == color
                        ? tags[i].tag
                        : "unassigned"
                      : "unassigned"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setEdit((prev) => {
                        const newEdit = [...prev];
                        newEdit[i] = true;
                        return newEdit;
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  key={i}
                  className={`${color} rounded-xl items-center justify-center m-0.5 flex-row px-4`}
                >
                  <TextInput
                    className="bg-slate-400 rounded-xl items-center justify-center p-1 m-0.5 w-[70%] font-semibold"
                    onChangeText={(text) => setTextinput(text)}
                    value={textinput}
                  />
                  <TouchableHighlight
                    onPress={() => {
                      console.log(textinput);
                      console.log(color);
                      if (textinput.length > 0) {
                        onSubmit(textinput, color);
                      } else {
                        setEdit((prev) => {
                          const newEdit = [...prev];
                          newEdit[i] = false;
                          return newEdit;
                        });
                      }
                    }}
                    className="bg-slate-400 rounded-xl items-center justify-center p-3"
                  >
                    <Text className="text-center text-2xl font-black text-black">
                      Submit
                    </Text>
                  </TouchableHighlight>
                </View>
              )
            )}
          </View>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
