
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

const drawerWidth = 260;

const menuItems = [
  { title: "Dashboard", path: "/", icon: <DashboardRoundedIcon /> },
  { title: "CRM", path: "/crm", icon: <GroupsRoundedIcon /> },
  { title: "Projects", path: "/projects", icon: <WorkRoundedIcon /> },
  { title: "Tasks", path: "/tasks", icon: <TaskAltRoundedIcon /> },
  { title: "HR & Employees", path: "/hr", icon: <PeopleAltRoundedIcon /> },
  { title: "Finance", path: "/finance", icon: <AccountBalanceWalletRoundedIcon /> },
  { title: "Calendar", path: "/calendar", icon: <CalendarMonthRoundedIcon /> },
  { title: "Reports & Analytics", path: "/reports", icon: <AssessmentRoundedIcon /> },
];

const supportItems = [
  { title: "Help & Support", path: "/help", icon: <SupportAgentRoundedIcon /> },
  { title: "Settings", path: "/settings", icon: <SettingsRoundedIcon /> },
];

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const renderMenuItems = (items) =>
    items.map((item) => {
      const isActive = location.pathname === item.path;

      return (
        <ListItemButton
          key={item.title}
          selected={isActive}
          onClick={() => handleNavigation(item.path)}
          sx={{
            borderRadius: "12px",
            mb: 0.7,
            py: 1.2,
            px: 1.5,
            color: isActive ? "#163B70" : "#64748B",
            transition: "all 0.25s ease",

            "& .MuiListItemIcon-root": {
              color: isActive ? "#2563EB" : "#94A3B8",
              minWidth: 42,
              transition: "all 0.25s ease",
            },

            "&.Mui-selected": {
              backgroundColor: "#EAF2FF",
            },

            "&.Mui-selected:hover": {
              backgroundColor: "#DFEBFF",
            },

            "&:hover": {
              backgroundColor: "#F4F7FB",
              transform: "translateX(3px)",
            },

            "&.Mui-selected .MuiListItemText-primary": {
              fontWeight: 700,
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: 13.5,
              fontWeight: isActive ? 700 : 500,
            }}
          />
        </ListItemButton>
      );
    });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Branding */}
      <Box
        sx={{
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          px: 2.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #163B70, #2563EB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 20,
            mr: 1.5,
            flexShrink: 0,
          }}
        >
          E
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 21,
              letterSpacing: 1.2,
              color: "#163B70",
            }}
          >
            ELARION
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              letterSpacing: 1.3,
              color: "#8A97AA",
            }}
          >
            BUSINESS MANAGEMENT
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#EDF1F7" }} />

      {/* Main navigation */}
      <Box sx={{ px: 2, pt: 3, flex: 1, overflowY: "auto" }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: 1,
            px: 1.5,
            mb: 1.5,
          }}
        >
          WORKSPACE
        </Typography>

        <List disablePadding>
          {renderMenuItems(menuItems)}
        </List>

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: 1,
            px: 1.5,
            mt: 4,
            mb: 1.5,
          }}
        >
          SUPPORT
        </Typography>

        <List disablePadding>
          {renderMenuItems(supportItems)}
        </List>
      </Box>

      {/* Bottom card */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: "16px",
            background: "linear-gradient(135deg, #EAF2FF, #F5F8FF)",
            border: "1px solid #DCE8FA",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#163B70",
              mb: 0.5,
            }}
          >
            Welcome to Elarion
          </Typography>

          <Typography
            sx={{
              fontSize: 11.5,
              color: "#64748B",
              lineHeight: 1.6,
            }}
          >
            Manage your business smarter with one connected workspace.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Sidebar = ({ mobileOpen, onClose }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #E8EDF5",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Mobile / tablet sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #E8EDF5",
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    </>
  );
};

export default Sidebar;
