import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

export default function ModalScreen() {
  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text className={'text-blue-300 dark:text-red-300'}>Modal</Text>
      <View className={'my-[30px] h-[1] w-[80%] bg-white dark:bg-white/10'} />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
