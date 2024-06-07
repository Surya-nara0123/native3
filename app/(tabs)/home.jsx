import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const getColor = (type, tags) => {
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].tag.trim() === type.trim()) {
      return tags[i].color;
    }
  }
  return "bg-gray-200"; // Default color if no match found
};

const listProcessing = (list1, tags) => {
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
          id: list1[i].id,
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
        id: list1[i].id,
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

const Home = () => {
  const navigation = useRouter();
  const onPress = () => {
    navigation.push("index1");
  };
  const [paymentLog, setPaymentLog] = useState([]);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);

  const clearTable = async () => {
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
        if (allRows.length > 0) {
          setData(allRows);
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

  const getHead = (paymentLog) => {
    let j = 0;
    list4 = [];
    for (let i = 0; i < paymentLog.length; i++) {
      for (let k = 0; k < paymentLog[i].data.length; k++) {
        if (j < 4) {
          list4.push(paymentLog[i].data[k]);
          j++;
        }
      }
    }
    return list4;
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 10,
          backgroundColor: "#282828",
        }}
      >
        {/* graph of recent payments */}
        <TouchableHighlight
          onPress={() => {}}
          className="bg-[#171616] rounded-xl items-center justify-center w-full p-2"
        >
          <View className="bg-[#171616] rounded-xl items-center justify-center w-full ">
            <Text className="text-center text-2xl font-black text-white bg-[#070606] p-3 rounded-2xl mt-2 w-[100%]">
              Graph of Recent Payments
            </Text>
            <View className="bg-[#171616] h-[300px] w-full rounded-xl items-center justify-center">
              <Text className="text-center text-2xl font-black text-black">
                Graph
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* list of recent payments */}
        <TouchableHighlight
          className="bg-[#171616] rounded-xl items-center justify-center w-full mt-2 p-2"
          onPress={onPress}
        >
          <View className="bg-[#171616] rounded-xl items-center justify-center w-full">
            <Text className="text-center text-2xl font-black text-white bg-[#070606] p-3 rounded-2xl mt-2 w-[100%]">
              Recent Payments
            </Text>
            <View className="bg-[#171616] h-[200px] w-full rounded-xl items-center">
              {paymentLog &&
                paymentLog.length > 0 &&
                getHead(paymentLog).map((item1, index1) => {
                  const color = getColor(item1.type, tags);
                  return (
                    <View
                      key={index1}
                      className={`${
                        tags[item1.type - 1].color
                      } flex-row text-left text-2xl font-black text-normal mt-2 rounded-lg px-3 justify-center w-full`}
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
          </View>
        </TouchableHighlight>
        {/* statistics of the all payments in the current period */}
        <TouchableHighlight
          className="bg-[#171616] rounded-xl items-center justify-center w-full mt-2 p-2"
          onPress={() => {}}
        >
          <View className="bg-[#171616] rounded-xl items-center justify-center w-full">
            <Text className="text-center text-2xl font-black text-white bg-[#070606] p-3 rounded-2xl mt-2 w-[100%]">
              Statistics
            </Text>
            <View className="bg-[#171616] h-[230px] w-full rounded-xl items-center justify-center">
              <Text className="text-center text-2xl font-black text-black">
                Graph
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <StatusBar style="light" backgroundColor="#171616" />
      </ScrollView>
      <View
        className=" bg-blue-300 rounded-full mt-2 shadow-[#00C2FF] shadow-2xl"
        style={{
          position: "absolute",
          right: 15,
          bottom: 30,
          backgroundColor: "#00a0FF",
          shadowColor: "#00C2FF",
          shadowOffset: {
            width: -32,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 64,
        }}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="plus"
          size={40}
          color="black"
          onPress={() => {
            navigation.push("/newform");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
