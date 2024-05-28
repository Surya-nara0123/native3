import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { Stack } from 'expo-router'

const PaymentHistoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index1" options={{headerShown:false}}/>
    </Stack>
  )
}

export default PaymentHistoryLayout