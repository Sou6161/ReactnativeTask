import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Cafe', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop' },
  { id: 2, name: 'Restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop' },
  { id: 3, name: 'Disco', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=100&h=100&fit=crop' },
];

const events = [
  { id: 1, title: 'Tamer Ashour: Feen', date: '3 days out • 6 Oct 2025', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop' },
  { id: 2, title: 'Amr Diab: The Tribe Event', date: '7 days out • 10 Oct 2025', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.', img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop' },
];

const offers = [
  { id: 1, discount: '10% OFF', price: 'EGP 355', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=400&fit=crop' },
  { id: 2, discount: '25% OFF', price: 'EGP 355', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop' },
  { id: 3, discount: '5% OFF', price: 'EGP 355', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop' },
  { id: 4, discount: '30% OFF', price: 'EGP 355', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=400&fit=crop' },
];

const users = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', top: 15, left: 45 },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', top: 25, left: 25 },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces', top: 35, left: 35 },
  { id: 4, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces', top: 40, left: 55 },
  { id: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces', top: 50, left: 45 },
  { id: 6, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces', top: 55, left: 65 },
  { id: 7, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces', top: 65, left: 30 },
  { id: 8, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces', top: 70, left: 50 },
  { id: 9, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces', top: 75, left: 70 },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  
  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          style={{ marginTop: insets.top + 10 }}
          contentContainerClassName="px-4 gap-3"
        >
          {categories.map(c => (
            <TouchableOpacity key={c.id} className="bg-white rounded-full py-2 px-4 flex-row items-center mr-3 shadow-sm">
              <Image source={{ uri: c.image }} className="w-8 h-8 rounded-full mr-2" />
              <Text className="text-[15px] font-medium text-gray-800">{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-2xl font-bold text-gray-800">Upcoming Events</Text>
          <Ionicons name="grid-outline" size={24} color="#666" />
        </View>

        <View className="flex-row px-4 gap-2.5 mb-8">
          <View className="flex-1 gap-2.5">
            {events.map(e => (
              <TouchableOpacity key={e.id} className="rounded-2xl h-[130px] overflow-hidden">
                <Image source={{ uri: e.img }} className="absolute w-full h-full" />
                <View className="absolute w-full h-full bg-black/40" />
                <View className="absolute bottom-0 p-3">
                  <Text className="text-[9px] text-white/80 mb-0.5">{e.date}</Text>
                  <Text className="text-base font-bold text-white mb-1">{e.title}</Text>
                  <Text className="text-[10px] text-white/80 leading-3" numberOfLines={2}>{e.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity className="rounded-2xl overflow-hidden justify-center items-center" style={{ width: (width - 48) * 0.35, height: 272 }}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=700&fit=crop' }} className="absolute w-full h-full" />
            <View className="absolute w-full h-full bg-black/40" />
            <Text className="text-xl font-bold text-white text-center leading-7 z-10">JAN{'\n'}30</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-bold text-gray-800 px-4 mb-4">Exclusive Offers</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 gap-3 mb-8"
        >
          {offers.map(o => (
            <TouchableOpacity key={o.id} className="w-[140px] h-[200px] rounded-2xl mr-3 overflow-hidden">
              <Image source={{ uri: o.img }} className="w-full h-full" />
              <View className="absolute top-2 left-2 bg-green-500 px-2.5 py-1 rounded-xl">
                <Text className="text-white text-xs font-bold">{o.discount}</Text>
              </View>
              <View className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-lg">
                <Text className="text-white text-[11px] font-semibold">{o.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-2xl font-bold text-gray-800 px-4 mb-4">Where is Everyone</Text>
        <View className="h-[300px] mx-4 rounded-3xl overflow-hidden relative">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop' }} 
            className="w-full h-full opacity-30 absolute" 
            resizeMode="cover"
          />
          <View className="absolute w-full h-full bg-white/70" style={{ zIndex: 1 }} />
          {users.map(u => (
            <View 
              key={u.id} 
              className="absolute items-center" 
              style={{ 
                top: `${u.top}%`, 
                left: `${u.left}%`,
                zIndex: 100,
                elevation: 100
              }}
            >
              <Image 
                source={{ uri: u.avatar }} 
                className="w-9 h-9 rounded-full border-[3px] border-white bg-white"
                resizeMode="cover"
              />
              <View className="w-2 h-2 rounded-full bg-[#5500ff] -mt-1" />
            </View>
          ))}
        </View>
      </ScrollView>

      <View 
        className="absolute left-5 right-5 h-[70px] bg-[#5500ff] rounded-[35px] flex-row items-center justify-around px-5"
        style={{ 
          bottom: insets.bottom + (isIOS ? 10 : 24),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {['navigate', 'search', 'home', 'heart', 'chatbubble-ellipses'].map((icon, i) => (
          <TouchableOpacity 
            key={i} 
            className={i === 2 ? 'bg-[#4400cc] w-16 h-16 rounded-full justify-center items-center -mt-12' : 'p-2'}
            style={i === 2 ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 10,
            } : undefined}
          >
            <Ionicons name={icon as any} size={28} color={i === 2 ? '#fff' : '#7FFF00'} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
