import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Platform, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComposeModal } from '@/components/ComposeModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MessagePost } from '@/components/MessagePost';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePosts } from '@/hooks/useDatabase';

export default function NewScreen() {
  const { posts, loading, refreshing, createPost, toggleUpvote, toggleDownvote, refresh } = usePosts('new');
  const [composeVisible, setComposeVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Show loading spinner while database initializes
  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <ThemedText style={styles.loadingText}>Loading posts...</ThemedText>
      </SafeAreaView>
    );
  }

  const handleUpvote = async (postId: string) => {
    try {
      await toggleUpvote(postId);
    } catch (error) {
      console.error('Error toggling upvote:', error);
    }
  };

  const handleDownvote = async (postId: string) => {
    try {
      await toggleDownvote(postId);
    } catch (error) {
      console.error('Error toggling downvote:', error);
    }
  };

  const handleReply = (postId: string) => {
    router.push({
      pathname: '/post/[id]',
      params: { id: postId }
    });
  };

  const handleCompose = () => {
    setComposeVisible(true);
  };

  const handleSubmitPost = async (content: string) => {
    try {
      await createPost(content);
      setComposeVisible(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handlePostPress = (postId: string) => {
    router.push({
      pathname: '/post/[id]',
      params: { id: postId }
    });
  };

  const renderMessage = ({ item }: { item: typeof posts[0] }) => (
    <MessagePost
      {...item}
      onUpvote={() => handleUpvote(item.id)}
      onDownvote={() => handleDownvote(item.id)}
      onReply={() => handleReply(item.id)}
      onPress={() => handlePostPress(item.id)}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <ThemedView style={styles.header}>
        <View style={styles.titleRow}>
          <ThemedText type="title" style={styles.headerTitle}>Softserve</ThemedText>
          <View style={styles.iceCreamRow}>
            <View style={[styles.iceCreamContainer, { backgroundColor: '#F25022' }]}>
              <ThemedText style={styles.iceCream}>🍦</ThemedText>
            </View>
            <View style={[styles.iceCreamContainer, { backgroundColor: '#7FBA00' }]}>
              <ThemedText style={styles.iceCream}>🍦</ThemedText>
            </View>
            <View style={[styles.iceCreamContainer, { backgroundColor: '#00A4EF' }]}>
              <ThemedText style={styles.iceCream}>🍦</ThemedText>
            </View>
            <View style={[styles.iceCreamContainer, { backgroundColor: '#FFB900' }]}>
              <ThemedText style={styles.iceCream}>🍦</ThemedText>
            </View>
          </View>
        </View>
        <ThemedText style={styles.headerSubtitle}>Latest anonymous discussions</ThemedText>
      </ThemedView>

      <FlatList
        data={posts}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        style={styles.list}
        contentContainerStyle={styles.listContent}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  iceCreamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iceCreamContainer: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    opacity: 0.9,
  },
  iceCream: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Platform.OS === 'web' ? 20 : 55, // Extra padding on mobile for tab bar
  },
});
