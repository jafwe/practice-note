import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs, useRouter } from 'expo-router'
import { Pressable, View, useColorScheme } from 'react-native'

import Colors from '@/constants/Colors'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const router = useRouter()
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].tabs}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          title: 'Tab Two',
          tabBarButton: ({ children }) => (
            <Pressable
              onPress={() => router.push('/plus')}
              className={'flex-1 items-center justify-end'}
            >
              <View
                className={'absolute w-20 h-20 rounded-full bg-[#FF2944] border-2 border-transparent'}
              >
                {children}
              </View>
            </Pressable>),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Tab SuRi',
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Tab SuRi',
          //tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
    </Tabs>
  )
}
