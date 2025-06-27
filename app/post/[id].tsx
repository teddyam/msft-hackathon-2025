import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CommentModal } from '@/components/CommentModal';
import { CommentPost } from '@/components/CommentPost';
import { MessagePost } from '@/components/MessagePost';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { postUpdateNotifier, toggleDownvoteGlobally, toggleUpvoteGlobally } from '@/hooks/useDatabase';
import { databaseService } from '@/services/database';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Find the post by ID (we'll get this from the database)
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState<any[]>([]);
  const [commentModalVisible, setCommentModalVisible] = React.useState(false);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        // Get all posts and find the one with matching ID
        const allPosts = await databaseService.getAllPosts();
        const foundPost = allPosts.find(p => p.id === id);
        
        if (foundPost) {
          // Sync the replies count with actual comments before loading
          await databaseService.syncPostRepliesCount(id);
          
          const postsWithVotes = await databaseService.getPostsWithVoteStatus([foundPost]);
          setPost(postsWithVotes[0]);
          
          // Load comments for this post
          const postComments = await databaseService.getCommentsForPost(id);
          const commentsWithVotes = await databaseService.getCommentsWithVoteStatus(postComments);
          setComments(commentsWithVotes);
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
        setPost((prev: any) => ({
          ...prev,
          ...updates
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, post]);

  const handleUpvote = async () => {
    if (!post) return;
    
    try {
      const result = await toggleUpvoteGlobally(post.id);
      setPost((prev: any) => ({
        ...prev,
        isUpvoted: result.upvoted,
        isDownvoted: false,
        upvotes: result.newUpvoteCount,
        downvotes: result.newDownvoteCount
      }));
    } catch (error) {
      console.error('Failed to toggle upvote:', error);
    }
  };

  const handleDownvote = async () => {
    if (!post) return;
    
    try {
      const result = await toggleDownvoteGlobally(post.id);
      setPost((prev: any) => ({
        ...prev,
        isUpvoted: false,
        isDownvoted: result.downvoted,
        upvotes: result.newUpvoteCount,
        downvotes: result.newDownvoteCount
      }));
    } catch (error) {
      console.error('Failed to toggle downvote:', error);
    }
  };

  const handleCreateComment = async (content: string) => {
    if (!post) return;
    
    // Check if we've reached the comment limit
    if (comments.length >= 10) {
      console.log('Comment limit reached for this post');
      return;
    }
    
    try {
      const newComment = await databaseService.createComment(post.id, content);
      const commentWithVotes = await databaseService.getCommentsWithVoteStatus([newComment]);
      setComments((prev: any[]) => [commentWithVotes[0], ...prev]);
      
      // Sync the replies count with actual comment count
      const actualCount = await databaseService.syncPostRepliesCount(post.id);
      setPost((prev: any) => ({
        ...prev,
        replies: actualCount
      }));
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleCommentUpvote = async (commentId: string) => {
    try {
      const result = await databaseService.toggleCommentUpvote(commentId);
      setComments((prev: any[]) => 
        prev.map(comment => 
          comment.id === commentId 
            ? { 
                ...comment, 
                isUpvoted: result.upvoted,
                isDownvoted: false,
                upvotes: result.newUpvoteCount,
                downvotes: result.newDownvoteCount
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Failed to toggle comment upvote:', error);
    }
  };

  const handleCommentDownvote = async (commentId: string) => {
    try {
      const result = await databaseService.toggleCommentDownvote(commentId);
      setComments((prev: any[]) => 
        prev.map(comment => 
          comment.id === commentId 
            ? { 
                ...comment, 
                isUpvoted: false,
                isDownvoted: result.downvoted,
                upvotes: result.newUpvoteCount,
                downvotes: result.newDownvoteCount
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Failed to toggle comment downvote:', error);
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
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          replies={post.replies}
          hashtags={post.hashtags || []}
          isUpvoted={post.isUpvoted}
          isDownvoted={post.isDownvoted}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
        
        {/* Comments section */}
        <ThemedView style={styles.commentsSection}>
          <View style={styles.commentsSectionHeader}>
            <ThemedText style={styles.commentsTitle}>
              Comments ({comments.length}{comments.length >= 10 ? ' - limit reached' : ''})
            </ThemedText>
            <TouchableOpacity 
              onPress={() => setCommentModalVisible(true)}
              style={[
                styles.addCommentButton, 
                { 
                  backgroundColor: comments.length >= 10 ? colors.text + '40' : colors.tint,
                  opacity: comments.length >= 10 ? 0.5 : 1
                }
              ]}
              disabled={comments.length >= 10}
            >
              <ThemedText style={styles.addCommentButtonText}>
                {comments.length >= 10 ? 'Limit Reached' : '+ Add Comment'}
              </ThemedText>
            </TouchableOpacity>
          </View>
          
          {comments.length > 0 ? (
            <View style={styles.commentsList}>
              {comments.map((comment) => (
                <CommentPost
                  key={comment.id}
                  {...comment}
                  onUpvote={() => handleCommentUpvote(comment.id)}
                  onDownvote={() => handleCommentDownvote(comment.id)}
                />
              ))}
            </View>
          ) : (
            <ThemedView style={styles.commentsPlaceholder}>
              <ThemedText style={styles.commentsPlaceholderText}>
                No comments yet. Be the first to comment!
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
      
      {/* Comment Modal */}
      <CommentModal
        visible={commentModalVisible && comments.length < 10}
        onClose={() => setCommentModalVisible(false)}
        onSubmit={handleCreateComment}
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
  commentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentsList: {
    gap: 8,
  },
  addCommentButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addCommentButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
