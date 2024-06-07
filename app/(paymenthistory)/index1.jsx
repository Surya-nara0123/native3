import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SectionList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { set } from "firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const getColor = (type, tags) => {
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].tag.trim() === type.trim()) {
      return tags[i].color;
    }
  }
  return "bg-gray-200"; // Default color if no match found
};

const listProcessing = (list1, tags) => {
  console.log(tags);
  const list2 = [];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (let i = 0; i < list1.length; i++) {
    const date = list1[i].timeofpayment;
    const dateSplit = date.split("-");
    const month1 = dateSplit[1];
    const year1 = dateSplit[0];
    const monthYear = `${month1} ${year1}`;
    let found = false;
    for (let j = 0; j < list2.length; j++) {
      if (list2[j].title === monthYear) {
        const tempObj = {
          date: list1[i].timeofpayment,
          amount: list1[i].amount,
          description: list1[i].descreption,
          type: list1[i].type,
        };
        list2[j].data.push(tempObj);
        found = true;
        break;
      }
    }
    if (!found) {
      const tempObj = {
        date: list1[i].timeofpayment,
        amount: list1[i].amount,
        description: list1[i].descreption,
        type: list1[i].type,
      };
      list2.push({
        title: monthYear,
        data: [tempObj],
      });
    }
  }

  list2.sort((a, b) => {
    return new Date(b.data[0].date) - new Date(a.data[0].date);
  });
  for (let i = 0; i < list2.length; i++) {
    list2[i].data = list2[i].data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
  return list2;
};
const MainPagePaymentHistory = () => {
  const [paymentLog, setPaymentLog] = useState([]);
  const [tags, setTags] = useState([]);
  const navigation = useRouter();

  const clearTable = async () => {
    Alert.alert(
      "Are you sure?",
      "This will delete all the data from the table",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => clearTable1() },
      ]
    );
    console.log("clearTable");
  };
  const clearTable1 = async () => {
    const db = await SQLite.openDatabaseAsync("nativeDB");
    await db.execAsync("delete from payments;");
    setPaymentLog([]);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("nativeDB");
        await db.execAsync(
          "create table if not exists payments (id integer primary key autoincrement, descreption text, type text, amount integer, timeofpayment date, username text);"
        );
        const allRows = await db.getAllAsync("SELECT * FROM payments;");
        console.log(allRows);
        if (allRows.length > 0) {
          setPaymentLog(listProcessing(allRows, tags));
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getColorTags = async () => {
      const db = await SQLite.openDatabaseAsync("nativeDB");
      await db.execAsync(
        "create table if not exists colortags (id integer primary key, tag text default 'unassigned', color text unique, username text);"
      );
      const tags1 = await db.getAllAsync("select * from colortags;");
      setTags(tags1);
      getData();
    };

    getColorTags();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          backgroundColor: "#282828",
          height: "100%",
        }}
      >
        {paymentLog && paymentLog.length > 0
          ? paymentLog.map((item, index) => (
              <View key={index}>
                <Text className="text-left text-2xl font-bold text-white bg-[#070606] mt-2 rounded-lg px-3">
                  {item.title}
                </Text>
                {item.data.map((item1, index1) => {
                  const color = getColor(item1.type, tags);
                  console.log(color);
                  return (
                    <View
                      key={index1}
                      className={`${
                        tags[item1.type - 1].color
                      } flex-row text-left text-2xl font-black text-normal mt-2 rounded-lg p-3 justify-center`}
                    >
                      <View>
                        <Text className="font-semibold">
                          {item1.description}
                        </Text>
                        <Text className="font-extralight text-sm ml-4">
                          {item1.date}
                        </Text>
                      </View>
                      <Text className="ml-auto font-semibold text-center my-auto">
                        ₹{item1.amount}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))
          : null}
      </ScrollView>
      <TouchableHighlight
        className=" bg-blue-300 p-3 rounded-full mt-2 shadow-[#00C2FF] shadow-2xl"
        style={{
          position: "absolute",
          left: 15,
          bottom: 30,
          backgroundColor: "#00a0FF",
          shadowColor: "#00C2FF",
          shadowOffset: {
            width: 64,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 64,
        }}
        activeOpacity={0.8}
        onPress={clearTable}
        underlayColor="#"
      >
        <MaterialCommunityIcons name="delete" size={24} color="black" />
      </TouchableHighlight>
      <TouchableHighlight
        className=" bg-blue-300 p-3 rounded-full mt-2 shadow-[#00C2FF] shadow-2xl"
        style={{
          position: "absolute",
          right: 15,
          bottom: 30,
          backgroundColor: "#00a0FF",
          shadowColor: "#00C2FF",
          shadowOffset: {
            width: 64,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 64,
        }}
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("home");
        }}
        underlayColor="#"
      >
        <MaterialCommunityIcons name="home" size={24} color="black" />
      </TouchableHighlight>
      <StatusBar style="light" backgroundColor="#171616" />
    </SafeAreaView>
  );
};

export default MainPagePaymentHistory;
