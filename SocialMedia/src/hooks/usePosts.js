import { useQuery } from 'react-query';
import apiService from '../api';

export default function usePosts(type = 'latest') {
  return useQuery(['posts', type], async () => {
    // Get posts
    const response = await apiService.getPosts(type);
    const posts = response.data.posts;
    
    // Get users for associating names with posts
    const usersResponse = await apiService.getUsers();
    const users = usersResponse.data.users;
    
    // Enhance posts with user information and comments
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        // Get comments for this post
        const commentsResponse = await apiService.getPostComments(post.id);
        const comments = commentsResponse.data.comments || [];
        
        // Get random image for the post
        const imageId = Math.floor(Math.random() * 1000);
        const imageUrl = `https://picsum.photos/seed/${imageId}/400/300`;
        
        return {
          ...post,
          userName: users[post.userid] || 'Unknown User',
          comments,
          commentCount: comments.length,
          imageUrl,
          // Random avatar for the user
          userAvatar: `https://i.pravatar.cc/150?img=${post.userid}`,
        };
      })
    );
    
    // Sort posts based on type
    if (type === 'popular') {
      return enhancedPosts.sort((a, b) => b.commentCount - a.commentCount);
    } else {
      // For 'latest', sort by post ID (assuming higher ID = more recent)
      return enhancedPosts.sort((a, b) => b.id - a.id);
    }
  }, {
    staleTime: 30000, // 30 seconds
    refetchInterval: type === 'latest' ? 15000 : 60000, // Refresh more frequently for latest posts
  });
}