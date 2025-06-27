import { databaseService, Post } from '@/services/database';
import { useCallback, useEffect, useState } from 'react';

// Global state to notify all components when a post is updated
class PostUpdateNotifier {
  private listeners: Set<(postId: string, updates: { 
    isUpvoted?: boolean; 
    isDownvoted?: boolean; 
    upvotes?: number; 
    downvotes?: number; 
  }) => void> = new Set();

  subscribe(callback: (postId: string, updates: { 
    isUpvoted?: boolean; 
    isDownvoted?: boolean; 
    upvotes?: number; 
    downvotes?: number; 
  }) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(postId: string, updates: { 
    isUpvoted?: boolean; 
    isDownvoted?: boolean; 
    upvotes?: number; 
    downvotes?: number; 
  }) {
    this.listeners.forEach(callback => callback(postId, updates));
  }
}

export const postUpdateNotifier = new PostUpdateNotifier();

// Global functions to toggle votes and notify all components
export async function toggleUpvoteGlobally(postId: string) {
  try {
    const result = await databaseService.toggleUpvote(postId);
    
    // Notify all components about the update
    postUpdateNotifier.notify(postId, {
      isUpvoted: result.upvoted,
      isDownvoted: false, // Remove downvote if upvoting
      upvotes: result.newUpvoteCount,
      downvotes: result.newDownvoteCount
    });

    return result;
  } catch (error) {
    console.error('Error toggling upvote globally:', error);
    throw error;
  }
}

export async function toggleDownvoteGlobally(postId: string) {
  try {
    const result = await databaseService.toggleDownvote(postId);
    
    // Notify all components about the update
    postUpdateNotifier.notify(postId, {
      isUpvoted: false, // Remove upvote if downvoting
      isDownvoted: result.downvoted,
      upvotes: result.newUpvoteCount,
      downvotes: result.newDownvoteCount
    });

    return result;
  } catch (error) {
    console.error('Error toggling downvote globally:', error);
    throw error;
  }
}

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await databaseService.init();
      setIsInitialized(true);
    } catch (err) {
      console.error('Failed to initialize database:', err);
      setError(err instanceof Error ? err.message : 'Database initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    retry: initializeDatabase,
  };
}

export function usePosts(type: 'hot' | 'new' | 'user' = 'new') {
  const [posts, setPosts] = useState<(Post & { isUpvoted: boolean; isDownvoted: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isInitialized } = useDatabase();

  const loadPosts = useCallback(async (isRefresh = false) => {
    if (!isInitialized) return;

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      let rawPosts: Post[] = [];
      
      switch (type) {
        case 'hot':
          rawPosts = await databaseService.getHotPosts();
          break;
        case 'new':
          rawPosts = await databaseService.getNewPosts();
          break;
        case 'user':
          rawPosts = await databaseService.getUserPosts();
          break;
      }

      const postsWithVotes = await databaseService.getPostsWithVoteStatus(rawPosts);
      setPosts(postsWithVotes);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isInitialized, type]);

  const createPost = async (content: string) => {
    if (!isInitialized) return;

    try {
      const newPost = await databaseService.createPost(content);
      const postWithVotes = await databaseService.getPostsWithVoteStatus([newPost]);
      
      // For user posts tab, we need to refresh the entire list since it has special filtering
      if (type === 'user') {
        await loadPosts(false);
      } else {
        // For other tabs, just add to the beginning
        setPosts(prev => [postWithVotes[0], ...prev]);
      }
      
      return newPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const toggleUpvote = async (postId: string) => {
    if (!isInitialized) return;

    try {
      const result = await databaseService.toggleUpvote(postId);
      
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isUpvoted: result.upvoted,
                isDownvoted: false, // Remove downvote when upvoting
                upvotes: result.newUpvoteCount,
                downvotes: result.newDownvoteCount
              }
            : post
        )
      );

      // Notify other components about the update
      postUpdateNotifier.notify(postId, {
        isUpvoted: result.upvoted,
        isDownvoted: false,
        upvotes: result.newUpvoteCount,
        downvotes: result.newDownvoteCount
      });

      return result;
    } catch (error) {
      console.error('Error toggling upvote:', error);
      throw error;
    }
  };

  const toggleDownvote = async (postId: string) => {
    if (!isInitialized) return;

    try {
      const result = await databaseService.toggleDownvote(postId);
      
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isUpvoted: false, // Remove upvote when downvoting
                isDownvoted: result.downvoted,
                upvotes: result.newUpvoteCount,
                downvotes: result.newDownvoteCount
              }
            : post
        )
      );

      // Notify other components about the update
      postUpdateNotifier.notify(postId, {
        isUpvoted: false,
        isDownvoted: result.downvoted,
        upvotes: result.newUpvoteCount,
        downvotes: result.newDownvoteCount
      });

      return result;
    } catch (error) {
      console.error('Error toggling downvote:', error);
      throw error;
    }
  };

  const refresh = () => loadPosts(true);

  useEffect(() => {
    if (isInitialized) {
      loadPosts();
    }
  }, [isInitialized, loadPosts]);

  // Listen for post updates from other components
  useEffect(() => {
    const unsubscribe = postUpdateNotifier.subscribe((postId, updates) => {
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, ...updates }
            : post
        )
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    posts,
    loading,
    refreshing,
    createPost,
    toggleUpvote,
    toggleDownvote,
    refresh,
  };
}
