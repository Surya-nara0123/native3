import { ScrollView, View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Text>
            Yoooo
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile