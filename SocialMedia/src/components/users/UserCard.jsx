import { 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Typography, 
  Box 
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ArticleIcon from '@mui/icons-material/Article';

function UserCard({ user, rank }) {
  // Generate consistent avatar based on user ID
  const avatarId = parseInt(user.id) % 70; // Keep within available avatar range
  const avatarUrl = `https://i.pravatar.cc/150?img=${avatarId}`;

  return (
    <Card 
      sx={{ 
        mb: 2,
        position: 'relative',
        overflow: 'visible',
      }}
      className="fade-in"
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      {rank <= 3 && (
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: rank === 1 ? 'warning.main' : rank === 2 ? 'secondary.light' : 'secondary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            boxShadow: 2,
            zIndex: 1,
          }}
        >
          #{rank}
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar 
            src={avatarUrl} 
            alt={user.name}
            sx={{ 
              width: 56, 
              height: 56,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
        }
        title={
          <Typography variant="h6" component="div">
            {user.name}
          </Typography>
        }
        subheader={`User ID: ${user.id}`}
      />
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            mt: 1
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center'
              }}
            >
              <ArticleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.primary">
                {user.postCount}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Posts
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center'
              }}
            >
              <CommentIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.primary">
                {user.commentCount}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Comments
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCard;