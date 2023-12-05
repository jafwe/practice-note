import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

export default function TabOneScreen() {
  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text className={'text-3xl text-red-600'}>New Plus!</Text>
      <View className={'my-[30px] h-[1] w-[80%]'} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}
