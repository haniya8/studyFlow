/**
 * Layout.jsx
 * Persistent app shell rendered around every page (sidebar nav, top bar, etc).
 * Nested routes render inside <Outlet />, so only the page content swaps on
 * navigation — the sidebar/topbar stay mounted instead of re-rendering.
 */

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Box } from '@mui/material';
import Header from './components/Header';
import { titles } from "./constants/LayoutConstants";

export default function Layout() {
  const location = useLocation();
  const currentTitle = titles[location.pathname] || '';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", p: { xs: 2, sm: 3, md: 4 } }}>
          <Header title={currentTitle} />
          <Outlet />
      </Box>
    </Box>
  );
}