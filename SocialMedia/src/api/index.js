import axios from 'axios';
const authHeaders = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU4MjEzLCJpYXQiOjE3NDQ5NTc5MTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBiZTI5MzA0LTRkOTAtNGY5Ni05MzE0LTQwMmJhZDA0NmNiOCIsInN1YiI6InNyYXZhbi5rdW1hcl9jczIyQGdsYS5hYy5pbiJ9LCJlbWFpbCI6InNyYXZhbi5rdW1hcl9jczIyQGdsYS5hYy5pbiIsIm5hbWUiOiJzcmF2YW4ga3VtYXIiLCJyb2xsTm8iOiIyMjE1MDAxNzc0IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiMGJlMjkzMDQtNGQ5MC00Zjk2LTkzMTQtNDAyYmFkMDQ2Y2I4IiwiY2xpZW50U2VjcmV0IjoiRXRXWlJNTldhSE1VbVJ4WiJ9.iEpZsvlFKhVb4kakKVpuljTBPclf8z08Y-L4ZH7EdOw`,
};

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...authHeaders,
  },
});

export const apiEndpoints = {
  // Users
  getUsers: () => api.get('/users'),
  getUserPosts: (userId) => api.get(`/users/${userId}/posts`),

  // Posts
  getPosts: (type = 'latest') => api.get(`/posts?type=${type}`),
  getPostComments: (postId) => api.get(`/posts/${postId}/comments`),
};

export const simulateBackendService = {
  getUsers: async () => {
    // Simulated response based on sample data
    return {
      data: {
        users: {
          "1": "John Doe",
          "10": "Helen Moore",
          "11": "Ivy Taylor",
          "12": "Jack Anderson",
          "13": "Kathy Thomas",
          "14": "Liam Jackson",
          "8": "Fiona Miller",
          "9": "George Wilson"
        }
      }
    };
  },

  getUserPosts: async (userId) => {
    return {
      data: {
        posts: [
          {
            id: 246,
            userid: userId,
            content: "Post about ant"
          },
          {
            id: 161,
            userid: userId,
            content: "Another post with useful content"
          }
        ]
      }
    };
  },

  getPosts: async (type) => {
    const posts = [
      {
        id: 123,
        userid: 1,
        content: "Latest trending post about technology",
        commentCount: 15
      },
      {
        id: 124,
        userid: 10,
        content: "Interesting facts about science",
        commentCount: 8
      },
      {
        id: 125,
        userid: 11,
        content: "Food recipes that are easy to make",
        commentCount: 12
      },
      {
        id: 126,
        userid: 12,
        content: "Travel destinations for summer",
        commentCount: 20
      },
      {
        id: 127,
        userid: 13,
        content: "Tips for better productivity",
        commentCount: 5
      }
    ];

    if (type === 'popular') {
      posts.sort((a, b) => b.commentCount - a.commentCount);
    } else {
      posts.sort((a, b) => b.id - a.id);
    }

    return { data: { posts } };
  },

  getPostComments: async (postId) => {
    return {
      data: {
        comments: [
          {
            id: 3893,
            postid: postId,
            content: "This is an interesting post!"
          },
          {
            id: 4791,
            postid: postId,
            content: "I learned something new today."
          }
        ]
      }
    };
  }
};

// Export a function that decides whether to use the real API or the simulation
export const apiService = {
  getUsers: async () => {
    try {
      // Use simulation for development
      return await simulateBackendService.getUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserPosts: async (userId) => {
    try {
      return await simulateBackendService.getUserPosts(userId);
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }
  },

  getPosts: async (type = 'latest') => {
    try {
      return await simulateBackendService.getPosts(type);
    } catch (error) {
      console.error(`Error fetching ${type} posts:`, error);
      throw error;
    }
  },

  getPostComments: async (postId) => {
    try {
      return await simulateBackendService.getPostComments(postId);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      throw error;
    }
  }
};

export default apiService;