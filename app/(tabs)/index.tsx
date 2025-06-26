import React, { useState } from 'react';
import { FlatList, RefreshControl, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComposeModal } from '@/components/ComposeModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MessagePost } from '@/components/MessagePost';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Message, mockMessages } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FeedScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [refreshing, setRefreshing] = useState(false);
  const [composeVisible, setComposeVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate loading new messages
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLike = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              isLiked: !msg.isLiked,
              likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1
            }
          : msg
      )
    );
  };

  const handleReply = (messageId: string) => {
    // Placeholder for reply functionality
    console.log('Reply to message:', messageId);
  };

  const handleCompose = () => {
    setComposeVisible(true);
  };

  const handleSubmitPost = (content: string, channel: string) => {
    // Create new message
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      content,
      timestamp: 'now',
      likes: 0,
      replies: 0,
      channel,
      isLiked: false,
    };

    // Add to beginning of messages list
    setMessages(prev => [newMessage, ...prev]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessagePost
      {...item}
      onLike={() => handleLike(item.id)}
      onReply={() => handleReply(item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Microsoft Chat</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Anonymous discussions about Microsoft</ThemedText>
      </ThemedView>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
      />
      
      <FloatingActionButton onPress={handleCompose} />
      
      <ComposeModal
        visible={composeVisible}
        onClose={() => setComposeVisible(false)}
        onSubmit={handleSubmitPost}
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
});
