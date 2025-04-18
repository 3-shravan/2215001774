import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box className="app-container">
      <Header onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: "flex" }}>
        <Navigation mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <Box component="main" className="content-container">
          <Routes>
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/" element={<Navigate to="/feed" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
