import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  CardHeader, 
  CardActions,
  Avatar, 
  Typography, 
  IconButton, 
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PostCard({ post, featured = false }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Card 
      sx={{
        mb: 3,
        ...(featured && {
          boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}20`,
          border: (theme) => `1px solid ${theme.palette.primary.light}30`,
        })
      }}
      className="fade-in"
    >
      {featured && (
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 0.5, 
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle2">🔥 Trending Post</Typography>
        </Box>
      )}
      
      <CardHeader
        avatar={
          <Avatar 
            src={post.userAvatar} 
            alt={post.userName}
            sx={{ 
              width: 48, 
              height: 48,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
        }
        title={post.userName}
        subheader={`Post #${post.id}`}
      />

      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        alt="Post image"
        sx={{ 
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
      />

      <CardContent>
        <Typography variant="body1">
          {post.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to favorites"
          onClick={handleLikeClick}
          color={liked ? 'error' : 'default'}
          sx={{
            transition: 'transform 0.2s ease-in-out',
            ...(liked && {
              transform: 'scale(1.1)',
            })
          }}
        >
          <FavoriteIcon />
        </IconButton>
        
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
          <CommentIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {post.commentCount} comments
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Comments ({post.comments.length})
          </Typography>
          {post.comments.length > 0 ? (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {post.comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar 
                      src={`https://i.pravatar.cc/150?img=${comment.id % 70}`} 
                      alt="User Avatar" 
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">
                        Anonymous User
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostCard;