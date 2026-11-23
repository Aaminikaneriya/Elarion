
import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    Button,
    LinearProgress,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const stats = [
    {
        title: "Total Revenue",
        value: "$24,580",
        change: "+12.8%",
        description: "Compared to last month",
        icon: <TrendingUpRoundedIcon />,
        color: "#2563EB",
        bg: "#EAF2FF",
    },
    {
        title: "Total Clients",
        value: "1,248",
        change: "+8.2%",
        description: "Compared to last month",
        icon: <GroupsRoundedIcon />,
        color: "#0D9488",
        bg: "#E6FFFA",
    },
    {
        title: "Active Projects",
        value: "24",
        change: "+4.5%",
        description: "Compared to last month",
        icon: <WorkOutlineRoundedIcon />,
        color: "#7C3AED",
        bg: "#F3E8FF",
    },
    {
        title: "Tasks Completed",
        value: "186",
        change: "+16.3%",
        description: "Compared to last month",
        icon: <TaskAltRoundedIcon />,
        color: "#EA580C",
        bg: "#FFF7ED",
    },
];

const activities = [
    {
        title: "New client onboarded",
        detail: "NovaTech Solutions was added to CRM",
        time: "10 minutes ago",
        color: "#2563EB",
    },
    {
        title: "Project completed",
        detail: "Website redesign project completed",
        time: "1 hour ago",
        color: "#16A34A",
    },
    {
        title: "Task assigned",
        detail: "UI review assigned to design team",
        time: "2 hours ago",
        color: "#7C3AED",
    },
    {
        title: "Invoice generated",
        detail: "INV-2026-024 generated successfully",
        time: "Yesterday",
        color: "#EA580C",
    },
];

const projects = [
    {
        name: "Website Redesign",
        team: "Design Team",
        progress: 78,
        color: "#2563EB",
    },
    {
        name: "CRM Development",
        team: "Development Team",
        progress: 62,
        color: "#7C3AED",
    },
    {
        name: "Mobile Application",
        team: "Product Team",
        progress: 45,
        color: "#0D9488",
    },
    {
        name: "Marketing Campaign",
        team: "Marketing Team",
        progress: 90,
        color: "#EA580C",
    },
];

const Dashboard = () => {
    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            {/* Welcome section */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: { xs: 22, sm: 26, md: 28 },
                            fontWeight: 800,
                            color: "#163B70",
                        }}
                    >
                        Welcome back, Admin 👋
                    </Typography>

                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: 13.5,
                            mt: 0.7,
                        }}
                    >
                        Here's what's happening with your business today.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#163B70",
                        "&:hover": { backgroundColor: "#2563EB" },
                    }}
                >
                    + Create New
                </Button>
            </Box>

            {/* Statistics cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        xl: "repeat(4, 1fr)",
                    },
                    gap: 2.2,
                    mb: 3,
                }}
            >
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        sx={{
                            backgroundColor: "#FFFFFF",
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 10px 30px rgba(22,59,112,0.08)",
                            },
                        }}
                    >
                        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#64748B",
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                >
                                    {stat.title}
                                </Typography>

                                <Avatar
                                    sx={{
                                        backgroundColor: stat.bg,
                                        color: stat.color,
                                        width: 42,
                                        height: 42,
                                        borderRadius: "12px",
                                    }}
                                >
                                    {stat.icon}
                                </Avatar>
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: { xs: 26, sm: 28 },
                                    fontWeight: 800,
                                    color: "#1F2937",
                                }}
                            >
                                {stat.value}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: 0.8,
                                    mt: 1.5,
                                }}
                            >
                                <Chip
                                    icon={<ArrowUpwardRoundedIcon />}
                                    label={stat.change}
                                    size="small"
                                    sx={{
                                        backgroundColor: "#EAF8F0",
                                        color: "#16A34A",
                                        fontWeight: 700,
                                        borderRadius: "8px",
                                        "& .MuiChip-icon": {
                                            color: "#16A34A",
                                            fontSize: 15,
                                        },
                                    }}
                                />

                                <Typography sx={{ fontSize: 11.5, color: "#94A3B8" }}>
                                    {stat.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Main dashboard sections */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1.6fr 1fr",
                    },
                    gap: 2.2,
                    mb: 3,
                }}
            >
                {/* Revenue chart */}
                <Card sx={{ minWidth: 0 }}>
                    <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 1,
                                mb: 2.5,
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                                    Revenue Overview
                                </Typography>

                                <Typography sx={{ fontSize: 12, color: "#94A3B8", mt: 0.5 }}>
                                    Monthly business performance
                                </Typography>
                            </Box>

                            <Button
                                size="small"
                                sx={{
                                    color: "#64748B",
                                    border: "1px solid #E8EDF5",
                                    borderRadius: "9px",
                                    fontSize: 12,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                This Year
                            </Button>
                        </Box>

                        <Box sx={{ width: "100%", overflow: "hidden" }}>
                            <svg
                                viewBox="0 0 700 280"
                                width="100%"
                                preserveAspectRatio="none"
                                style={{ display: "block" }}
                            >
                                {[50, 100, 150, 200, 250].map((y) => (
                                    <line
                                        key={y}
                                        x1="40"
                                        y1={y}
                                        x2="680"
                                        y2={y}
                                        stroke="#EEF2F7"
                                        strokeWidth="1"
                                    />
                                ))}

                                <path
                                    d="M40 215 L145 185 L250 195 L355 125 L460 150 L565 75 L680 45 L680 250 L40 250 Z"
                                    fill="rgba(37,99,235,0.10)"
                                />

                                <path
                                    d="M40 215 L145 185 L250 195 L355 125 L460 150 L565 75 L680 45"
                                    fill="none"
                                    stroke="#2563EB"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {[
                                    [40, 215],
                                    [145, 185],
                                    [250, 195],
                                    [355, 125],
                                    [460, 150],
                                    [565, 75],
                                    [680, 45],
                                ].map(([x, y]) => (
                                    <circle
                                        key={`${x}-${y}`}
                                        cx={x}
                                        cy={y}
                                        r="5"
                                        fill="#FFFFFF"
                                        stroke="#2563EB"
                                        strokeWidth="3"
                                    />
                                ))}
                            </svg>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                                px: 0.5,
                            }}
                        >
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
                                (month) => (
                                    <Typography
                                        key={month}
                                        sx={{ fontSize: 11, color: "#94A3B8" }}
                                    >
                                        {month}
                                    </Typography>
                                )
                            )}
                        </Box>
                    </CardContent>
                </Card>

                {/* Projects progress */}
                <Card>
                    <CardContent sx={{ p: 2.5 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2.5,
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                                    Project Progress
                                </Typography>

                                <Typography sx={{ fontSize: 12, color: "#94A3B8", mt: 0.5 }}>
                                    Current active projects
                                </Typography>
                            </Box>

                            <IconPlaceholder />
                        </Box>

                        {projects.map((project) => (
                            <Box key={project.name} sx={{ mb: 2.5 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                            {project.name}
                                        </Typography>

                                        <Typography sx={{ fontSize: 11, color: "#94A3B8", mt: 0.3 }}>
                                            {project.team}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: project.color,
                                        }}
                                    >
                                        {project.progress}%
                                    </Typography>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={project.progress}
                                    sx={{
                                        height: 7,
                                        borderRadius: 10,
                                        backgroundColor: "#EEF2F7",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: project.color,
                                            borderRadius: 10,
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Box>

            {/* Bottom sections */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1.3fr 1fr",
                    },
                    gap: 2.2,
                }}
            >
                {/* Recent activity */}
                <Card>
                    <CardContent sx={{ p: 2.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2.5 }}>
                            Recent Activity
                        </Typography>

                        {activities.map((activity, index) => (
                            <Box
                                key={activity.title}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1.5,
                                    pb: 2,
                                    mb: 2,
                                    borderBottom:
                                        index !== activities.length - 1
                                            ? "1px solid #F0F3F8"
                                            : "none",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        mt: 0.7,
                                        borderRadius: "50%",
                                        backgroundColor: activity.color,
                                        boxShadow: `0 0 0 4px ${activity.color}15`,
                                        flexShrink: 0,
                                    }}
                                />

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                        {activity.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            color: "#64748B",
                                            mt: 0.5,
                                        }}
                                    >
                                        {activity.detail}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 11,
                                            color: "#94A3B8",
                                            mt: 0.8,
                                        }}
                                    >
                                        {activity.time}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick summary */}
                <Card>
                    <CardContent sx={{ p: 2.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2.5 }}>
                            Business Summary
                        </Typography>

                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#F5F8FF",
                                borderRadius: 3,
                                mb: 2,
                            }}
                        >
                            <Typography sx={{ fontSize: 12, color: "#64748B" }}>
                                Overall business growth
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    color: "#163B70",
                                    mt: 0.8,
                                }}
                            >
                                +18.6%
                            </Typography>

                            <Typography
                                sx={{ fontSize: 11.5, color: "#16A34A", mt: 0.5 }}
                            >
                                Growing steadily this quarter
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                gap: 1,
                            }}
                        >
                            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
                                Team Members
                            </Typography>

                            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                32
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                gap: 1,
                            }}
                        >
                            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
                                Pending Tasks
                            </Typography>

                            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                18
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                gap: 1,
                            }}
                        >
                            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
                                Upcoming Deadlines
                            </Typography>

                            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                5
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Typography sx={{ fontSize: 13, color: "#64748B" }}>
                                Active Departments
                            </Typography>

                            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                6
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

function IconPlaceholder() {
    return (
        <Box
            sx={{
                width: 35,
                height: 35,
                borderRadius: "10px",
                backgroundColor: "#F4F7FB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748B",
            }}
        >
            <MoreHorizRoundedIcon />
        </Box>
    );
}

export default Dashboard;
