
import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Projects from "./pages/Projects";

// Reusable placeholder for upcoming modules
function PlaceholderPage({ title, description }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: { xs: 24, sm: 28 },
          fontWeight: 800,
          color: "#163B70",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#64748B",
          fontSize: 14,
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        {description}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8EDF5",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          minHeight: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#163B70",
              mb: 1,
            }}
          >
            {title} Module
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: 13.5,
              maxWidth: 400,
              lineHeight: 1.7,
              mx: "auto",
            }}
          >
            {description}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#2563EB",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Coming Soon
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

// Main Application Layout
function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={closeMobileMenu}
      />

      {/* Navbar */}
      <Navbar onMenuClick={openMobileMenu} />

      {/* Main Content Area */}
      <Box
        sx={{
          ml: { xs: 0, md: "260px" },
          pt: { xs: "68px", md: "80px" },
          width: { xs: "100%", md: "calc(100% - 260px)" },
          minHeight: "100vh",
          backgroundColor: "#F4F7FB",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5, md: 3.5 },
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* CRM */}
            <Route
              path="/crm"
              element={<CRM />}
            />

            {/* Projects */}
            <Route path="/projects" element={<Projects />} />c

            {/* Tasks */}
            <Route
              path="/tasks"
              element={
                <PlaceholderPage
                  title="Tasks"
                  description="Create, assign, prioritize and track business tasks."
                />
              }
            />

            {/* HR & Employees */}
            <Route
              path="/hr"
              element={
                <PlaceholderPage
                  title="HR & Employees"
                  description="Manage employee information, attendance, departments and HR operations."
                />
              }
            />

            {/* Finance */}
            <Route
              path="/finance"
              element={
                <PlaceholderPage
                  title="Finance"
                  description="Manage expenses, invoices, payments and financial records."
                />
              }
            />

            {/* Calendar */}
            <Route
              path="/calendar"
              element={
                <PlaceholderPage
                  title="Calendar"
                  description="Plan meetings, events, deadlines and important business schedules."
                />
              }
            />

            {/* Reports & Analytics */}
            <Route
              path="/reports"
              element={
                <PlaceholderPage
                  title="Reports & Analytics"
                  description="Analyze business performance, team activity and operational insights."
                />
              }
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={
                <PlaceholderPage
                  title="Settings"
                  description="Manage workspace preferences, account settings and configurations."
                />
              }
            />

            {/* Help & Support */}
            <Route
              path="/help"
              element={
                <PlaceholderPage
                  title="Help & Support"
                  description="Find assistance, support and information about Elarion."
                />
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="404 - Page Not Found"
                  description="The page you are looking for does not exist."
                />
              }
            />

          </Routes>
        </Box>
      </Box>
    </>
  );
}

// App Root
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
