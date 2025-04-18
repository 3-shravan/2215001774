import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingState({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        py: 8,
      }}
      className="fade-in"
    >
      <CircularProgress color="primary" size={48} />
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingState;