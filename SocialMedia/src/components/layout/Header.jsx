import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

function Header({ onMenuClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        

        {!isMobile && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              ml: 2,
              fontWeight: 600,
              background: '-webkit-linear-gradient(45deg, #3B82F6 30%, #8B5CF6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SocialPulse
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="primary" aria-label="search">
          <SearchIcon />
        </IconButton>
        
        <IconButton color="primary" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        
        <IconButton color="primary" aria-label="profile">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;