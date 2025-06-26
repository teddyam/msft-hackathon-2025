import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MessagePost } from '@/components/MessagePost';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { postUpdateNotifier, toggleLikeGlobally } from '@/hooks/useDatabase';
import { databaseService } from '@/services/database';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Find the post by ID (we'll get this from the database)
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        // Get all posts and find the one with matching ID
        const allPosts = await databaseService.getAllPosts();
        const foundPost = allPosts.find(p => p.id === id);
        
        if (foundPost) {
          const postsWithLikes = await databaseService.getPostsWithLikeStatus([foundPost]);
          setPost(postsWithLikes[0]);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  // Listen for global post updates
  React.useEffect(() => {
    const unsubscribe = postUpdateNotifier.subscribe((postId, updates) => {
      if (postId === id && post) {
        setPost(prev => ({
          ...prev,
          ...updates
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, post]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const result = await toggleLikeGlobally(post.id);
      setPost(prev => ({
        ...prev,
        isLiked: result.liked,
        likes: result.newLikeCount
      }));
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Loading post...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Post not found</ThemedText>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>← Go Back</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
      
      {/* Header with back button */}
      <ThemedView style={[styles.header, { borderBottomColor: colors.text + '20' }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemedText style={[styles.backButtonText, { color: colors.primary }]}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Post</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <MessagePost
          id={post.id}
          content={post.content}
          timestamp={post.timestamp}
          likes={post.likes}
          replies={post.replies}
          hashtags={post.hashtags || []}
          isLiked={post.isLiked}
          onLike={handleLike}
        />
        
        {/* Comments section placeholder */}
        <ThemedView style={styles.commentsSection}>
          <ThemedText style={styles.commentsTitle}>Comments</ThemedText>
          <ThemedView style={styles.commentsPlaceholder}>
            <ThemedText style={styles.commentsPlaceholderText}>
              Comments will be added in a future update
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 60, // Offset for back button
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  commentsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  commentsPlaceholder: {
    padding: 20,
    alignItems: 'center',
    opacity: 0.6,
  },
  commentsPlaceholderText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
