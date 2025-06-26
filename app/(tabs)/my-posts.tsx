import React, { useState } from 'react';
import { FlatList, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComposeModal } from '@/components/ComposeModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MessagePost } from '@/components/MessagePost';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Message, mockMessages } from '@/data/mockData';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function MyPostsScreen() {
  // For demo purposes, we'll filter to show posts that user "liked" as their own posts
  // In a real app, you'd track user's actual posts
  const userPosts = mockMessages.filter(msg => msg.isLiked);
  
  const [messages, setMessages] = useState<Message[]>(userPosts);
  const [allMessages, setAllMessages] = useState<Message[]>(mockMessages);
  const [refreshing, setRefreshing] = useState(false);
  const [composeVisible, setComposeVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate loading user's posts
    setTimeout(() => {
      const updatedUserPosts = allMessages.filter(msg => msg.isLiked);
      setMessages(updatedUserPosts);
      setRefreshing(false);
    }, 1000);
  }, [allMessages]);

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
    
    setAllMessages(prev => 
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
      id: `user-${Date.now()}`,
      content,
      timestamp: 'now',
      createdAt: new Date(), // Add current timestamp
      likes: 0,
      replies: 0,
      channel,
      isLiked: true, // Mark as user's own post
    };

    // Add to user's posts and all messages
    setMessages(prev => [newMessage, ...prev]);
    setAllMessages(prev => [newMessage, ...prev]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessagePost
      {...item}
      onLike={() => handleLike(item.id)}
      onReply={() => handleReply(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <ThemedText style={styles.emptyTitle}>No posts yet</ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        Your anonymous posts will appear here. Tap the + button to create your first post!
      </ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>My Posts</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Your anonymous contributions ({messages.length} posts)
        </ThemedText>
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
        ListEmptyComponent={renderEmptyState}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
});
