import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

export default function TabTwoScreen() {
  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text className={'text-3xl text-green-600'}>Tab TWOOOOO</Text>
      <View className={'my-[30px] h-[1] w-[80%] bg-white dark:bg-white/10'} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  )
}
