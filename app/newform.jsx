import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { SelectList } from "react-native-dropdown-select-list";
import DateField from "react-native-datefield";
import { StatusBar } from "expo-status-bar";

const Newform = () => {
  const navigation = useRouter();

  const [tags, setTags] = useState([]);
  const onSubmit = async (data) => {
    console.log(tags.map((tag) => tag.tag));
    const temp = tags.map((tag) => tag.tag);
    let flag = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] != "unassigned") {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      alert("Please assign tags to the colors");
      navigation.push("profile");
    } else {
      try {
        const { descreption, type, amount, timeofpayment } = data;
        if (!(!descreption || !type || !amount || !timeofpayment)) {
          const db = await SQLite.openDatabaseAsync("nativeDB");
          const user = await db.getFirstAsync("select * from users;");
          const username = user.value;
          await db.execAsync(
            "create table if not exists payments (id integer primary key autoincrement, descreption text, type text, amount integer, timeofpayment date, username text);"
          );
          await db.execAsync(
            `insert into payments (descreption, type, amount, timeofpayment, username) values ("${descreption}", "${type}", "${amount}", "${timeofpayment}", "${username}");`
          );
          navigation.push("index1");
        } else {
          ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };
  const [descreption, setDescreption] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [timeofpayment, setTimeofpayment] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
  const onChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  useEffect(() => {
    const fetchTags = async () => {
      const db = await SQLite.openDatabaseAsync("nativeDB", {
        useNewConnection: true,
      });
      const tags = await db.getAllAsync("select * from colortags;");
      setTags(tags);
    };
    fetchTags();
  }, []);
  return (
    <SafeAreaView className="">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          backgroundColor: "#282828",
          height: "100%",
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          className="w-full h-10 border-2 bg-white border-gray-300 rounded-lg px-2 m-2 text-black"
          placeholder="Description"
          placeholderTextColor="#000"
          onChangeText={setDescreption}
          value={descreption}
        />
        <View className="w-full">
          <SelectList
            search={false}
            style={{
              width: "100%",
              height: 40,
              borderWidth: 2,
              borderColor: "lightgray",
              borderRadius: 8,
              paddingHorizontal: 8,
              marginVertical: 8,
            }}
            placeholder="Type"
            placeholderTextColor="white"
            boxStyles={{
              backgroundColor: "white",
            }}
            disabledTextStyles={{
              color: "white",
              backgroundColor: "black",
            }}
            dropdownItemStyles={{ color: "white" }}
            dropdownTextStyles={{ color: "white" }}
            data={tags.map(
              (tag) =>
                tag.tag != "unassigned" && { key: tag.id, value: tag.tag }
            )}
            setSelected={(key, value) => setType(key)}
            value={type}
          />
        </View>
        {/* <TextInput
          className="w-full h-10 border-2 border-gray-300 rounded-lg px-2 m-2"
          placeholder="Type"
          onChangeText={(text) => onChange("type", text)}
          value={data.type}
        /> */}
        <TextInput
          className="w-full h-10 border-2 bg-white border-gray-300 rounded-lg px-2 m-2"
          placeholder="Amount"
          onChangeText={setAmount}
          value={amount}
          keyboardType="numeric"
        />
        <DateField
          labelDate="Input date"
          labelMonth="Input month"
          labelYear="Input year"
          labelHour="Input hour"
          labelMinute="Input minute"
          labelSecond="Input second"
          defaultValue={new Date()}
          onSubmit={(value) => {
            console.log(value);
            const date1 = `${value.getFullYear()}-${
              value.getMonth() + 1
            }-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
            console.log(date1);
            setTimeofpayment(date1);
          }}
          styleInput={{
            height: 40,
            borderWidth: 2,
            borderColor: "lightgray",
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: "white",
            marginHorizontal: 8,
          }}
          containerStyle={{
            height: 50,
            padding: 3,
            borderRadius: 8,
            paddingHorizontal: 8,
            justifyContent: "center",
          }}
        />
        <TouchableHighlight
          className=" bg-[#00C2FF] p-3 rounded-full mt-2 px-12"
          onPress={() => {
            onSubmit({ descreption, type, amount, timeofpayment });
          }}
        >
          <Text className="font-black">Submit</Text>
        </TouchableHighlight>
        <StatusBar style="light" backgroundColor="#171616" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Newform;
