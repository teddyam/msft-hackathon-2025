import { databaseService, Post } from '@/services/database';
import { createContext, useCallback, useContext, useState } from 'react';

interface PostContextType {
  posts: Map<string, Post & { isLiked: boolean }>;
  updatePost: (postId: string, updates: Partial<Post & { isLiked: boolean }>) => void;
  toggleLike: (postId: string) => Promise<{ liked: boolean; newLikeCount: number }>;
  addPost: (post: Post & { isLiked: boolean }) => void;
  refreshPost: (postId: string) => Promise<void>;
}

export const PostContext = createContext<PostContextType | null>(null);

export function useGlobalPosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('useGlobalPosts must be used within a PostProvider');
  }
  return context;
}

export function usePostProvider() {
  const [posts, setPosts] = useState<Map<string, Post & { isLiked: boolean }>>(new Map());

  const updatePost = useCallback((postId: string, updates: Partial<Post & { isLiked: boolean }>) => {
    setPosts(prev => {
      const newMap = new Map(prev);
      const existingPost = newMap.get(postId);
      if (existingPost) {
        newMap.set(postId, { ...existingPost, ...updates });
      }
      return newMap;
    });
  }, []);

  const addPost = useCallback((post: Post & { isLiked: boolean }) => {
    setPosts(prev => {
      const newMap = new Map(prev);
      newMap.set(post.id, post);
      return newMap;
    });
  }, []);

  const toggleLike = useCallback(async (postId: string) => {
    try {
      const result = await databaseService.toggleLike(postId);
      
      // Update the global state
      updatePost(postId, {
        isLiked: result.liked,
        likes: result.newLikeCount
      });

      return result;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }, [updatePost]);

  const refreshPost = useCallback(async (postId: string) => {
    try {
      const allPosts = await databaseService.getAllPosts();
      const foundPost = allPosts.find(p => p.id === postId);
      
      if (foundPost) {
        const postsWithLikes = await databaseService.getPostsWithLikeStatus([foundPost]);
        addPost(postsWithLikes[0]);
      }
    } catch (error) {
      console.error('Error refreshing post:', error);
    }
  }, [addPost]);

  return {
    posts,
    updatePost,
    toggleLike,
    addPost,
    refreshPost,
  };
}
