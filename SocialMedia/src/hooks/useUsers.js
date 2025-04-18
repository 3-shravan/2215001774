import { useQuery } from 'react-query';
import apiService from '../api';

export default function useUsers() {
  return useQuery('users', async () => {
    const response = await apiService.getUsers();
    
    // Transform the user data into an array for easier processing
    const usersObj = response.data.users;
    const usersArray = Object.entries(usersObj).map(([id, name]) => ({
      id,
      name,
      postCount: 0,
      commentCount: 0,
    }));
    
    // For each user, fetch their posts to get comment counts
    const usersWithCounts = await Promise.all(
      usersArray.map(async (user) => {
        try {
          const postsResponse = await apiService.getUserPosts(user.id);
          const posts = postsResponse.data.posts || [];
          
          // Count posts
          const postCount = posts.length;
          
          // For each post, get comments to count them
          let totalComments = 0;
          
          await Promise.all(
            posts.map(async (post) => {
              try {
                const commentsResponse = await apiService.getPostComments(post.id);
                const comments = commentsResponse.data.comments || [];
                totalComments += comments.length;
              } catch (error) {
                console.error(`Error fetching comments for post ${post.id}:`, error);
              }
            })
          );
          
          return {
            ...user,
            postCount,
            commentCount: totalComments,
          };
        } catch (error) {
          console.error(`Error processing user ${user.id}:`, error);
          return user; // Return original user if error
        }
      })
    );
    
    // Sort users by comment count (descending)
    return usersWithCounts.sort((a, b) => b.commentCount - a.commentCount);
  }, {
    staleTime: 60000, // 1 minute
    refetchInterval: 30000, // 30 seconds
  });
}