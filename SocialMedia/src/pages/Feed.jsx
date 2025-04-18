import { useEffect, useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Fade, 
  CircularProgress,
  Button,
  Fab,
  useTheme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import usePosts from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

function Feed() {
  const theme = useTheme();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isFetching 
  } = usePosts('latest');

  // logicrefresh 
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        refetch();
        setLastRefresh(Date.now());
      }, 15000); // Refresh after every 1 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  const handleManualRefresh = () => {
    refetch();
    setLastRefresh(Date.now());
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const getTimeSinceRefresh = () => {
    const seconds = Math.floor((Date.now() - lastRefresh) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    return `${Math.floor(seconds / 60)} minutes ago`;
  };

  if (isLoading) {
    return <LoadingState message="Loading your feed..." />;
  }

  if (isError) {
    return (
      <ErrorState 
        message={`Error loading feed: ${error?.message || 'Unknown error'}`}
        onRetry={refetch}
      />
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            fontWeight="700"
            color="text.primary"
          >
            Latest Feed
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
            >
              Showing the most recent posts from all users
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Last updated: {getTimeSinceRefresh()}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                color={autoRefresh ? "success" : "primary"}
                onClick={toggleAutoRefresh}
                startIcon={<AutorenewIcon />}
              >
                {autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
              </Button>
            </Box>
          </Box>
        </Box>

        {isFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress size={24} color="primary" />
          </Box>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts in your feed yet
            </Typography>
          </Box>
        )}

        <Fab
          color="primary"
          aria-label="refresh"
          onClick={handleManualRefresh}
          sx={{
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
          }}
        >
          <RefreshIcon />
        </Fab>
      </Container>
    </Fade>
  );
}

export default Feed;