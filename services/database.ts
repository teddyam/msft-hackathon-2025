export interface Post {
  id: string;
  content: string;
  timestamp: string;
  created_at: number; // Unix timestamp for sorting
  upvotes: number;
  downvotes: number;
  replies: number;
  hashtags: string[]; // Array of hashtag strings
  is_user_post: number; // 0 or 1 (SQLite doesn't have boolean)
}

export interface Comment {
  id: string;
  post_id: string; // The post this comment belongs to
  content: string;
  timestamp: string;
  created_at: number;
  upvotes: number;
  downvotes: number;
  hashtags: string[];
  is_user_comment: number; // 0 or 1 (SQLite doesn't have boolean)
}

export interface UserVote {
  post_id: string;
  vote_type: 'upvote' | 'downvote';
  created_at: number;
}

// Mock data that will work on both web and mobile
const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Anyone else excited about the Microsoft Build conference next week? Really hoping to see some cool Azure updates! 🚀',
    timestamp: '5m ago',
    created_at: Date.now() - 5 * 60 * 1000,
    upvotes: 27,
    downvotes: 3,
    replies: 2,
    hashtags: ['#Build2025', '#Azure', '#Microsoft'],
    is_user_post: 0,
  },
  {
    id: '2',
    content: 'Hot take: Teams is actually getting really good. The new meeting features are a game changer for remote work.',
    timestamp: '12m ago',
    created_at: Date.now() - 12 * 60 * 1000,
    upvotes: 72,
    downvotes: 5,
    replies: 2,
    hashtags: ['#Teams', '#RemoteWork', '#ProductivityTools'],
    is_user_post: 0,
  },
  {
    id: '3',
    content: 'Just shipped my first app using .NET MAUI and I\'m honestly impressed. Cross-platform development has never been smoother.',
    timestamp: '18m ago',
    created_at: Date.now() - 18 * 60 * 1000,
    upvotes: 48,
    downvotes: 3,
    replies: 0,
    hashtags: ['#MAUI', '#DotNet', '#CrossPlatform', '#AppDev'],
    is_user_post: 0,
  },
  {
    id: '4',
    content: 'Does anyone know if there\'s a student discount for Microsoft 365? Starting college next month and need all the help I can get 📚',
    timestamp: '25m ago',
    created_at: Date.now() - 25 * 60 * 1000,
    upvotes: 34,
    downvotes: 3,
    replies: 0,
    hashtags: ['#StudentLife', '#Office365', '#Education'],
    is_user_post: 0,
  },
  {
    id: '5',
    content: 'The new Copilot features in VS Code are absolutely mind-blowing. It\'s like having a senior developer pair programming with you 24/7.',
    timestamp: '32m ago',
    created_at: Date.now() - 32 * 60 * 1000,
    upvotes: 95,
    downvotes: 6,
    replies: 1,
    hashtags: ['#Copilot', '#VSCode', '#AI', '#PairProgramming'],
    is_user_post: 0,
  },
  {
    id: '6',
    content: 'Azure DevOps vs GitHub - which one do you prefer for enterprise projects? Looking for some honest opinions here.',
    timestamp: '45m ago',
    created_at: Date.now() - 45 * 60 * 1000,
    upvotes: 83,
    downvotes: 5,
    replies: 0,
    hashtags: ['#AzureDevOps', '#GitHub', '#Enterprise', '#DevOps'],
    is_user_post: 0,
  },
  {
    id: '7',
    content: 'Microsoft Copilot in VS Code has literally changed my life. I feel like I have a coding buddy who never gets tired of helping. 🤖',
    timestamp: '1h ago',
    created_at: Date.now() - 60 * 60 * 1000,
    upvotes: 245,
    downvotes: 11,
    replies: 0,
    hashtags: ['#Copilot', '#VSCode', '#GameChanger'],
    is_user_post: 0,
  },
  {
    id: '8',
    content: 'Working on a Power Platform solution and I can\'t believe how much you can accomplish without writing a single line of code. Microsoft really nailed this one.',
    timestamp: '1h ago',
    created_at: Date.now() - 65 * 60 * 1000,
    upvotes: 162,
    downvotes: 6,
    replies: 0,
    hashtags: ['#PowerPlatform', '#NoCode', '#LowCode'],
    is_user_post: 0,
  },
];

// Mock comments data
const initialComments: Comment[] = [
  {
    id: 'comment_1',
    post_id: '1',
    content: 'I\'m especially excited about the new AI features they might announce! #AI',
    timestamp: '3m ago',
    created_at: Date.now() - 3 * 60 * 1000,
    upvotes: 5,
    downvotes: 0,
    hashtags: ['#AI'],
    is_user_comment: 0,
  },
  {
    id: 'comment_2',
    post_id: '1',
    content: 'Same here! Azure Container Apps have been a game changer for our deployment pipeline.',
    timestamp: '2m ago',
    created_at: Date.now() - 2 * 60 * 1000,
    upvotes: 8,
    downvotes: 1,
    hashtags: [],
    is_user_comment: 0,
  },
  {
    id: 'comment_3',
    post_id: '2',
    content: 'The new whiteboard features are amazing for brainstorming sessions! 🎨',
    timestamp: '8m ago',
    created_at: Date.now() - 8 * 60 * 1000,
    upvotes: 12,
    downvotes: 0,
    hashtags: [],
    is_user_comment: 0,
  },
  {
    id: 'comment_4',
    post_id: '2',
    content: 'I still prefer Slack though. Teams feels a bit clunky sometimes.',
    timestamp: '5m ago',
    created_at: Date.now() - 5 * 60 * 1000,
    upvotes: 3,
    downvotes: 7,
    hashtags: [],
    is_user_comment: 0,
  },
  {
    id: 'comment_5',
    post_id: '5',
    content: 'Copilot literally wrote 80% of my last React component. It\'s incredible! #ReactJS',
    timestamp: '15m ago',
    created_at: Date.now() - 15 * 60 * 1000,
    upvotes: 25,
    downvotes: 2,
    hashtags: ['#ReactJS'],
    is_user_comment: 0,
  },
];

class DatabaseService {
  private posts: Post[] = [...initialPosts];
  private comments: Comment[] = [...initialComments];
  // Vote tracking for posts
  private postUpvotes: Set<string> = new Set();
  private postDownvotes: Set<string> = new Set();
  // Vote tracking for comments  
  private commentUpvotes: Set<string> = new Set();
  private commentDownvotes: Set<string> = new Set();
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
      const aScore = (a.upvotes - a.downvotes) + a.replies;
      const bScore = (b.upvotes - b.downvotes) + b.replies;
      if (aScore !== bScore) return bScore - aScore;
      return b.created_at - a.created_at;
    });
  }

  async getNewPosts(): Promise<Post[]> {
    return [...this.posts].sort((a, b) => b.created_at - a.created_at);
  }

  async getUserPosts(): Promise<Post[]> {
    const userPosts = this.posts.filter(post => 
      post.is_user_post === 1
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

    // Remove hashtags from content and clean up extra spaces
    const cleanContent = content
      .replace(hashtagRegex, '') // Remove hashtags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing whitespace

    const newPost: Post = {
      id,
      content: cleanContent,
      timestamp,
      created_at,
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      hashtags,
      is_user_post: 1,
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  // Upvote/downvote a post
  async toggleUpvote(postId: string): Promise<{ upvoted: boolean; newUpvoteCount: number; newDownvoteCount: number }> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');

    const wasUpvoted = this.postUpvotes.has(postId);
    const wasDownvoted = this.postDownvotes.has(postId);
    
    if (wasUpvoted) {
      // Remove upvote
      this.postUpvotes.delete(postId);
      post.upvotes--;
      return { upvoted: false, newUpvoteCount: post.upvotes, newDownvoteCount: post.downvotes };
    } else {
      // Add upvote and remove downvote if it exists
      this.postUpvotes.add(postId);
      if (wasDownvoted) {
        this.postDownvotes.delete(postId);
        post.downvotes--;
      }
      post.upvotes++;
      return { upvoted: true, newUpvoteCount: post.upvotes, newDownvoteCount: post.downvotes };
    }
  }

  async toggleDownvote(postId: string): Promise<{ downvoted: boolean; newUpvoteCount: number; newDownvoteCount: number }> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');

    const wasUpvoted = this.postUpvotes.has(postId);
    const wasDownvoted = this.postDownvotes.has(postId);
    
    if (wasDownvoted) {
      // Remove downvote
      this.postDownvotes.delete(postId);
      post.downvotes--;
      return { downvoted: false, newUpvoteCount: post.upvotes, newDownvoteCount: post.downvotes };
    } else {
      // Add downvote and remove upvote if it exists
      this.postDownvotes.add(postId);
      if (wasUpvoted) {
        this.postUpvotes.delete(postId);
        post.upvotes--;
      }
      post.downvotes++;
      return { downvoted: true, newUpvoteCount: post.upvotes, newDownvoteCount: post.downvotes };
    }
  }

  // Check if user has voted on a post
  async isPostUpvoted(postId: string): Promise<boolean> {
    return this.postUpvotes.has(postId);
  }

  async isPostDownvoted(postId: string): Promise<boolean> {
    return this.postDownvotes.has(postId);
  }

  // Get posts with vote status
  async getPostsWithVoteStatus(posts: Post[]): Promise<(Post & { isUpvoted: boolean; isDownvoted: boolean })[]> {
    return posts.map(post => ({
      ...post,
      isUpvoted: this.postUpvotes.has(post.id),
      isDownvoted: this.postDownvotes.has(post.id)
    }));
  }

  // === COMMENT METHODS ===

  // Get comments for a specific post (limit to 10)
  async getCommentsForPost(postId: string): Promise<Comment[]> {
    return this.comments
      .filter(comment => comment.post_id === postId)
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 10); // Limit to 10 comments
  }

  // Create a new comment
  async createComment(postId: string, content: string): Promise<Comment> {
    const id = `comment_${Date.now()}`;
    const created_at = Date.now();
    const timestamp = 'Just now';

    // Extract hashtags from content
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const hashtags = content.match(hashtagRegex) || [];

    // Remove hashtags from content and clean up extra spaces
    const cleanContent = content
      .replace(hashtagRegex, '') // Remove hashtags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim(); // Remove leading/trailing whitespace

    const newComment: Comment = {
      id,
      post_id: postId,
      content: cleanContent,
      timestamp,
      created_at,
      upvotes: 0,
      downvotes: 0,
      hashtags,
      is_user_comment: 1,
    };

    this.comments.unshift(newComment);
    
    // Increment reply count on the post
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.replies++;
    }
    
    return newComment;
  }

  // Upvote/downvote a comment
  async toggleCommentUpvote(commentId: string): Promise<{ upvoted: boolean; newUpvoteCount: number; newDownvoteCount: number }> {
    const comment = this.comments.find(c => c.id === commentId);
    if (!comment) throw new Error('Comment not found');

    const wasUpvoted = this.commentUpvotes.has(commentId);
    const wasDownvoted = this.commentDownvotes.has(commentId);
    
    if (wasUpvoted) {
      // Remove upvote
      this.commentUpvotes.delete(commentId);
      comment.upvotes--;
      return { upvoted: false, newUpvoteCount: comment.upvotes, newDownvoteCount: comment.downvotes };
    } else {
      // Add upvote and remove downvote if it exists
      this.commentUpvotes.add(commentId);
      if (wasDownvoted) {
        this.commentDownvotes.delete(commentId);
        comment.downvotes--;
      }
      comment.upvotes++;
      return { upvoted: true, newUpvoteCount: comment.upvotes, newDownvoteCount: comment.downvotes };
    }
  }

  async toggleCommentDownvote(commentId: string): Promise<{ downvoted: boolean; newUpvoteCount: number; newDownvoteCount: number }> {
    const comment = this.comments.find(c => c.id === commentId);
    if (!comment) throw new Error('Comment not found');

    const wasUpvoted = this.commentUpvotes.has(commentId);
    const wasDownvoted = this.commentDownvotes.has(commentId);
    
    if (wasDownvoted) {
      // Remove downvote
      this.commentDownvotes.delete(commentId);
      comment.downvotes--;
      return { downvoted: false, newUpvoteCount: comment.upvotes, newDownvoteCount: comment.downvotes };
    } else {
      // Add downvote and remove upvote if it exists
      this.commentDownvotes.add(commentId);
      if (wasUpvoted) {
        this.commentUpvotes.delete(commentId);
        comment.upvotes--;
      }
      comment.downvotes++;
      return { downvoted: true, newUpvoteCount: comment.upvotes, newDownvoteCount: comment.downvotes };
    }
  }

  // Get comments with vote status
  async getCommentsWithVoteStatus(comments: Comment[]): Promise<(Comment & { isUpvoted: boolean; isDownvoted: boolean })[]> {
    return comments.map(comment => ({
      ...comment,
      isUpvoted: this.commentUpvotes.has(comment.id),
      isDownvoted: this.commentDownvotes.has(comment.id)
    }));
  }

  // Synchronize post replies count with actual comment count
  async syncPostRepliesCount(postId: string): Promise<number> {
    const actualCommentCount = this.comments.filter(comment => comment.post_id === postId).length;
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.replies = actualCommentCount;
    }
    return actualCommentCount;
  }

  // Synchronize all posts' replies counts
  async syncAllPostRepliesCounts(): Promise<void> {
    for (const post of this.posts) {
      const actualCommentCount = this.comments.filter(comment => comment.post_id === post.id).length;
      post.replies = actualCommentCount;
    }
  }
}

export const databaseService = new DatabaseService();
