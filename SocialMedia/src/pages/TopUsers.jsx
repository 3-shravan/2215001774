import { useState } from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Box, 
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import useUsers from '../hooks/useUsers';
import UserCard from '../components/users/UserCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

function TopUsers() {
  const [sortBy, setSortBy] = useState('comments');
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  if (isLoading) {
    return <LoadingState message="Loading top users..." />;
  }

  if (isError) {
    return (
      <ErrorState 
        message={`Error loading users: ${error?.message || 'Unknown error'}`}
        onRetry={refetch}
      />
    );
  }

  // Sort users based on selected criteria
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'comments') {
      return b.commentCount - a.commentCount;
    } else if (sortBy === 'posts') {
      return b.postCount - a.postCount;
    }
    return 0;
  });

  // Get top 5 users
  const topUsers = sortedUsers.slice(0, 5);

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
            Top Users
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
          >
            Discover the most active and engaged users in our community
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="comments">Most Comments</MenuItem>
              <MenuItem value="posts">Most Posts</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {topUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <UserCard user={user} rank={index + 1} />
            </Grid>
          ))}
        </Grid>

        {topUsers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No users found
            </Typography>
          </Box>
        )}
      </Container>
    </Fade>
  );
}

export default TopUsers;