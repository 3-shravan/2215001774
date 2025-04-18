import { 
  Typography, 
  Container, 
  Box, 
  Fade, 
  CircularProgress,
  Grid,
} from '@mui/material';
import usePosts from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

function TrendingPosts() {
  const { data: posts, isLoading, isError, error, refetch } = usePosts('popular');

  if (isLoading) {
    return <LoadingState message="Finding trending posts..." />;
  }

  if (isError) {
    return (
      <ErrorState 
        message={`Error loading trending posts: ${error?.message || 'Unknown error'}`}
        onRetry={refetch}
      />
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            fontWeight="700"
            color="text.primary"
          >
            Trending Posts
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
          >
            Discover the most popular and commented posts
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} md={index === 0 ? 12 : 6} key={post.id}>
              <PostCard post={post} featured={index === 0} />
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No trending posts found
            </Typography>
          </Box>
        )}
      </Container>
    </Fade>
  );
}

export default TrendingPosts;