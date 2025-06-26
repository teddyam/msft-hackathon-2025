export interface Post {
  id: string;
  content: string;
  timestamp: string;
  created_at: number; // Unix timestamp for sorting
  likes: number;
  replies: number;
  hashtags: string[]; // Array of hashtag strings
  is_user_post: number; // 0 or 1 (SQLite doesn't have boolean)
}

export interface UserLike {
  post_id: string;
  created_at: number;
}

// Mock data that will work on both web and mobile
const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Anyone else excited about the Microsoft Build conference next week? Really hoping to see some cool Azure updates! 🚀',
    timestamp: '5m ago',
    created_at: Date.now() - 5 * 60 * 1000,
    likes: 24,
    replies: 8,
    hashtags: ['#Build2025', '#Azure', '#Microsoft'],
    is_user_post: 0,
  },
  {
    id: '2',
    content: 'Hot take: Teams is actually getting really good. The new meeting features are a game changer for remote work.',
    timestamp: '12m ago',
    created_at: Date.now() - 12 * 60 * 1000,
    likes: 67,
    replies: 23,
    hashtags: ['#Teams', '#RemoteWork', '#ProductivityTools'],
    is_user_post: 0,
  },
  {
    id: '3',
    content: 'Just shipped my first app using .NET MAUI and I\'m honestly impressed. Cross-platform development has never been smoother.',
    timestamp: '18m ago',
    created_at: Date.now() - 18 * 60 * 1000,
    likes: 45,
    replies: 12,
    hashtags: ['#MAUI', '#DotNet', '#CrossPlatform', '#AppDev'],
    is_user_post: 0,
  },
  {
    id: '4',
    content: 'Does anyone know if there\'s a student discount for Microsoft 365? Starting college next month and need all the help I can get 📚',
    timestamp: '25m ago',
    created_at: Date.now() - 25 * 60 * 1000,
    likes: 31,
    replies: 15,
    hashtags: ['#StudentLife', '#Office365', '#Education'],
    is_user_post: 0,
  },
  {
    id: '5',
    content: 'The new Copilot features in VS Code are absolutely mind-blowing. It\'s like having a senior developer pair programming with you 24/7.',
    timestamp: '32m ago',
    created_at: Date.now() - 32 * 60 * 1000,
    likes: 89,
    replies: 34,
    hashtags: ['#Copilot', '#VSCode', '#AI', '#PairProgramming'],
    is_user_post: 0,
  },
  {
    id: '6',
    content: 'Azure DevOps vs GitHub - which one do you prefer for enterprise projects? Looking for some honest opinions here.',
    timestamp: '45m ago',
    created_at: Date.now() - 45 * 60 * 1000,
    likes: 78,
    replies: 45,
    hashtags: ['#AzureDevOps', '#GitHub', '#Enterprise', '#DevOps'],
    is_user_post: 0,
  },
  {
    id: '7',
    content: 'Microsoft Copilot in VS Code has literally changed my life. I feel like I have a coding buddy who never gets tired of helping. 🤖',
    timestamp: '1h ago',
    created_at: Date.now() - 60 * 60 * 1000,
    likes: 234,
    replies: 89,
    hashtags: ['#Copilot', '#VSCode', '#GameChanger'],
    is_user_post: 0,
  },
  {
    id: '8',
    content: 'Working on a Power Platform solution and I can\'t believe how much you can accomplish without writing a single line of code. Microsoft really nailed this one.',
    timestamp: '1h ago',
    created_at: Date.now() - 65 * 60 * 1000,
    likes: 156,
    replies: 67,
    hashtags: ['#PowerPlatform', '#NoCode', '#LowCode'],
    is_user_post: 0,
  },
];

class DatabaseService {
  private posts: Post[] = [...initialPosts];
  private likes: Set<string> = new Set();
  private initialized = false;

  async init() {
    // Simulate async initialization
    await new Promise(resolve => setTimeout(resolve, 100));
    this.initialized = true;
    console.log('Database initialized successfully with mock data');
  }

  // Get all posts sorted by different criteria
  async getAllPosts(): Promise<Post[]> {
    return [...this.posts].sort((a, b) => b.created_at - a.created_at);
  }

  async getHotPosts(): Promise<Post[]> {
    return [...this.posts].sort((a, b) => {
      const aScore = a.likes + a.replies;
      const bScore = b.likes + b.replies;
      if (aScore !== bScore) return bScore - aScore;
      return b.created_at - a.created_at;
    });
  }

  async getNewPosts(): Promise<Post[]> {
    return [...this.posts].sort((a, b) => b.created_at - a.created_at);
  }

  async getUserPosts(): Promise<Post[]> {
    const userPosts = this.posts.filter(post => 
      post.is_user_post === 1 || this.likes.has(post.id)
    ).sort((a, b) => b.created_at - a.created_at);
    
    return userPosts;
  }

  // Create a new post
  async createPost(content: string): Promise<Post> {
    const id = `post_${Date.now()}`;
    const created_at = Date.now();
    const timestamp = 'now';

    // Extract hashtags from content
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const hashtags = content.match(hashtagRegex) || [];

    const newPost: Post = {
      id,
      content,
      timestamp,
      created_at,
      likes: 0,
      replies: 0,
      hashtags,
      is_user_post: 1,
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  // Like/unlike a post
  async toggleLike(postId: string): Promise<{ liked: boolean; newLikeCount: number }> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');

    const wasLiked = this.likes.has(postId);
    
    if (wasLiked) {
      this.likes.delete(postId);
      post.likes--;
      return { liked: false, newLikeCount: post.likes };
    } else {
      this.likes.add(postId);
      post.likes++;
      return { liked: true, newLikeCount: post.likes };
    }
  }

  // Check if user has liked a post
  async isPostLiked(postId: string): Promise<boolean> {
    return this.likes.has(postId);
  }

  // Get posts with like status
  async getPostsWithLikeStatus(posts: Post[]): Promise<(Post & { isLiked: boolean })[]> {
    return posts.map(post => ({
      ...post,
      isLiked: this.likes.has(post.id)
    }));
  }
}

export const databaseService = new DatabaseService();
