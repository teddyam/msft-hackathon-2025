import { FlatList, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChannelCard } from '@/components/ChannelCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Channel, mockChannels } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ChannelsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleChannelPress = (channel: Channel) => {
    // Placeholder for navigation to channel
    console.log('Navigate to channel:', channel.name);
  };

  const renderChannel = ({ item }: { item: Channel }) => (
    <ChannelCard
      {...item}
      onPress={() => handleChannelPress(item)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Channels</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Join conversations about Microsoft products and services
        </ThemedText>
      </ThemedView>

      <FlatList
        data={mockChannels}
        renderItem={renderChannel}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
});
