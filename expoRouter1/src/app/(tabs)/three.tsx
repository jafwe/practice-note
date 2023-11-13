import EditScreenInfo from '@/components/EditScreenInfo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Text, View } from '@/components/Themed'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'

export default function TabTwoScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ headerShown: true, headerRight: () => <FontAwesome name="info-circle" size={25} color={'#359A6BBA'}/> })
  })
  return (
    <View className={'flex-1 items-center justify-center'}>
      <Text className={'text-3xl text-green-600'}>Tab SuRiiiiiii</Text>
      <View className={'my-[30px] h-[1] w-[80%] bg-white dark:bg-white/10'} />
      <EditScreenInfo path="app/(tabs)/three.tsx" />
    </View>
  )
}
