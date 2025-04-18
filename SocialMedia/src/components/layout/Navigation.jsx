import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const drawerWidth = 240;

function Navigation({ mobileOpen, onClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('top-users')) {
      setSelectedItem('top-users');
    } else if (path.includes('trending')) {
      setSelectedItem('trending');
    } else if (path.includes('feed')) {
      setSelectedItem('feed');
    }
  }, [location.pathname]);

  const handleNavigation = (route) => {
    navigate(route);
    if (isMobile) {
      onClose();
    }
  };

  const navItems = [
    { 
      id: 'top-users', 
      text: 'Top Users', 
      icon: <PeopleAltIcon color={selectedItem === 'top-users' ? 'primary' : 'inherit'} />, 
      route: '/top-users' 
    },
    { 
      id: 'trending', 
      text: 'Trending Posts', 
      icon: <TrendingUpIcon color={selectedItem === 'trending' ? 'primary' : 'inherit'} />, 
      route: '/trending' 
    },
    { 
      id: 'feed', 
      text: 'Feed', 
      icon: <DynamicFeedIcon color={selectedItem === 'feed' ? 'primary' : 'inherit'} />, 
      route: '/feed' 
    },
  ];

  const drawer = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Box sx={{ ml: 2, fontWeight: 600, fontSize: '1.25rem' }}>
          SocialPulse
        </Box>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedItem === item.id}
              onClick={() => handleNavigation(item.route)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  borderRight: '3px solid',
                  borderColor: 'primary.main',
                },
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.04)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: selectedItem === item.id ? 600 : 400,
                  color: selectedItem === item.id ? 'primary.main' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ 
        width: { md: drawerWidth }, 
        flexShrink: { md: 0 } 
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navigation;