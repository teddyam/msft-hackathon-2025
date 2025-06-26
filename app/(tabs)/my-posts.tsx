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

export default function MyPostsScreen() {
  const { posts, loading, refreshing, createPost, toggleLike, refresh } = usePosts('user');
  const [composeVisible, setComposeVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLike = async (postId: string) => {
    try {
      await toggleLike(postId);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleCreatePost = async (content: string) => {
    try {
      await createPost(content);
      setComposeVisible(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const renderEmptyComponent = () => (
    <ThemedView style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        No posts yet! Like some posts or create your first post to see them here.
      </ThemedText>
    </ThemedView>
  );

  const handlePostPress = (postId: string) => {
    router.push({
      pathname: '/post/[id]',
      params: { id: postId }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText style={styles.loadingText}>Loading your posts...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      
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
        <ThemedText style={styles.headerSubtitle}>Your posts and liked content</ThemedText>
      </ThemedView>
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessagePost
            id={item.id}
            content={item.content}
            timestamp={item.timestamp}
            likes={item.likes}
            replies={item.replies}
            hashtags={item.hashtags}
            onLike={() => handleLike(item.id)}
            isLiked={item.isLiked}
            onPress={() => handlePostPress(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />

      <FloatingActionButton onPress={() => setComposeVisible(true)} />
      
      <ComposeModal
        visible={composeVisible}
        onClose={() => setComposeVisible(false)}
        onSubmit={handleCreatePost}
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
  listContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'web' ? 20 : 55, // Space for FAB and tab bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
});
