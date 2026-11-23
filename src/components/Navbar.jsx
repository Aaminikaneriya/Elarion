
import React from "react";
import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    IconButton,
    Avatar,
    Typography,
    Badge,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Navbar = ({ onMenuClick }) => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                left: { xs: 0, md: "260px" },
                width: { xs: "100%", md: "calc(100% - 260px)" },
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #E8EDF5",
                color: "#1F2937",
                zIndex: 1100,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: { xs: "68px !important", md: "80px !important" },
                    px: { xs: 1.5, sm: 2, md: 3 },
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                {/* Mobile menu button */}
                <IconButton
                    onClick={onMenuClick}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        color: "#163B70",
                        flexShrink: 0,
                    }}
                >
                    <MenuRoundedIcon />
                </IconButton>

                {/* Search */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F4F7FB",
                        border: "1px solid #E8EDF5",
                        borderRadius: "12px",
                        px: 1.5,
                        width: { xs: "100%", sm: 260, md: 320 },
                        maxWidth: { xs: 240, sm: 300, md: 320 },
                        transition: "0.3s",

                        "&:focus-within": {
                            borderColor: "#2563EB",
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 0 0 3px rgba(37,99,235,0.08)",
                        },
                    }}
                >
                    <SearchRoundedIcon sx={{ color: "#94A3B8", fontSize: 21 }} />

                    <InputBase
                        placeholder="Search..."
                        sx={{
                            ml: 1,
                            flex: 1,
                            minWidth: 0,
                            fontSize: 13.5,
                            "& input": {
                                py: 1.1,
                            },
                        }}
                    />
                </Box>

                {/* Right actions */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 0.2, sm: 0.7, md: 1.2 },
                        flexShrink: 0,
                    }}
                >
                    {/* Help */}
                    <IconButton
                        sx={{
                            color: "#64748B",
                            width: { xs: 36, sm: 40, md: 42 },
                            height: { xs: 36, sm: 40, md: 42 },
                            "&:hover": {
                                backgroundColor: "#EAF2FF",
                                color: "#2563EB",
                            },
                        }}
                    >
                        <HelpOutlineRoundedIcon />
                    </IconButton>

                    {/* Notifications */}
                    <IconButton
                        sx={{
                            color: "#64748B",
                            width: { xs: 36, sm: 40, md: 42 },
                            height: { xs: 36, sm: 40, md: 42 },
                            "&:hover": {
                                backgroundColor: "#EAF2FF",
                                color: "#2563EB",
                            },
                        }}
                    >
                        <Badge badgeContent={3} color="primary">
                            <NotificationsNoneRoundedIcon />
                        </Badge>
                    </IconButton>

                    {/* Profile */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0.5, sm: 1 },
                            ml: { xs: 0.3, sm: 0.8 },
                            pl: { xs: 0.5, sm: 1.5 },
                            borderLeft: "1px solid #E8EDF5",
                            cursor: "pointer",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: { xs: 32, sm: 38, md: 40 },
                                height: { xs: 32, sm: 38, md: 40 },
                                background: "linear-gradient(135deg, #163B70, #2563EB)",
                                fontWeight: 700,
                                fontSize: 14,
                            }}
                        >
                            A
                        </Avatar>

                        <Box
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: "#1F2937",
                                }}
                            >
                                Admin
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: "#94A3B8",
                                }}
                            >
                                Administrator
                            </Typography>
                        </Box>

                        <KeyboardArrowDownRoundedIcon
                            sx={{
                                display: { xs: "none", sm: "block" },
                                color: "#94A3B8",
                                fontSize: 20,
                            }}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
