import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const list = [
  {
    date: "January 1, 2022",
    amount: 100,
    description: "Payment for January",
  },
  {
    date: "January 2, 2022",
    amount: 100,
    description: "Payment for January",
  },
  {
    date: "February 1, 2022",
    amount: 100,
    description: "Payment for February",
  },
  {
    date: "February 2, 2022",
    amount: 100,
    description: "Payment for February",
  },
  {
    date: "March 1, 2022",
    amount: 100,
    description: "Payment for March",
  },
  {
    date: "March 2, 2022",
    amount: 100,
    description: "Payment for March",
  },
  {
    date: "April 1, 2022",
    amount: 100,
    description: "Payment for April",
  },
  {
    date: "April 2, 2022",
    amount: 100,
    description: "Payment for April",
  },
  {
    date: "May 1, 2022",
    amount: 100,
    description: "Payment for May",
  },
  {
    date: "May 2, 2022",
    amount: 100,
    description: "Payment for May",
  },
  {
    date: "June 1, 2022",
    amount: 100,
    description: "Payment for June",
  },
  {
    date: "June 2, 2022",
    amount: 100,
    description: "Payment for June",
  },
  {
    date: "July 1, 2022",
    amount: 100,
    description: "Payment for July",
  },
  {
    date: "July 2, 2022",
    amount: 100,
    description: "Payment for July",
  },
  {
    date: "August 1, 2022",
    amount: 100,
    description: "Payment for August",
  },
  {
    date: "August 2, 2022",
    amount: 100,
    description: "Payment for August",
  },
  {
    date: "September 1, 2022",
    amount: 100,
    description: "Payment for September",
  },
  {
    date: "September 2, 2022",
    amount: 100,
    description: "Payment for September",
  },
  {
    date: "October 1, 2022",
    amount: 100,
    description: "Payment for October",
  },
];

const listProcessing = (list1) => {
  // create a list of payments according to the month they were made and make that month,year as the title and all the payents in that month as the value
  // return the list
  const list2 = [];
  let month = "";
  let year = "";
  let amount = 0;
  let description = "";
  for (let i = 0; i < list1.length; i++) {
    const date = list1[i].date;
    const dateSplit = date.split(" ");
    const month1 = dateSplit[0];
    const year1 = dateSplit[2];
    monthYear = month1 + " " + year1;
    let found = false;
    for (let j = 0; j < list2.length; j++) {
      if (list2[j].title === monthYear) {
        let tempObj = {
          date: list1[i].date,
          amount: list1[i].amount,
          description: list1[i].description,
        };
        list2[j].data.push(tempObj);
        found = true;
        break;
      }
    }
    if (!found) {
      let tempObj = {
        date: list1[i].date,
        amount: list1[i].amount,
        description: list1[i].description,
      };
      list2.push({
        title: monthYear,
        data: [tempObj],
      });
    }
  }
  console.log(list2);
  return list2;
};

const MainPagePaymentHistory = () => {
  const [paymentLog, setPaymentLog] = useState([]);
  useEffect(() => {
    setPaymentLog(listProcessing(list));
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 8,
        }}
      >
        {paymentLog && paymentLog.length > 0
          ? paymentLog.map((item, index) => {
              return (
                <View key={index}>
                  <Text className="text-left text-2xl font-bold text-black bg-[#f7f7f7ff] bg-slate-400 mt-2 rounded-lg px-3">
                    {item.title}
                  </Text>
                  {item.data.map((item1, index1) => {
                    return (
                      <View key={index1}>
                        <View className=" flex-row text-left text-2xl font-black text-mormal bg-[#f7f7f7ff] bg-gray-200 mt-2 rounded-lg px-3 justify-center">
                          <View className="">
                            <Text className=" font-semibold">
                              {item1.description}
                            </Text>
                            <Text className=" font-extralight text-sm ml-2">
                              {item1.date}
                            </Text>
                          </View>
                          <Text className="ml-auto font-semibold text-center my-auto">₹{item1.amount}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })
          : //
            null}
        {/* renderItem={({ item }) => (
              <Text className=" flex-row text-lg font-normal text-black rounded-full mb-1 bg-gray-200">
                {item.amount} {item.description}
              </Text>
            )}
            renderSectionHeader={({ section }) => (
              <Text className="text-left text-2xl font-black text-black bg-[#f7f7f7ff] bg-slate-400 mt-2 rounded-lg px-3">
                {section.title}
              </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPagePaymentHistory;
