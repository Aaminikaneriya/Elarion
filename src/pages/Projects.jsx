
import React, { useState } from "react";
import {
    Box, Typography, Paper, Card, CardContent, Grid, Button, TextField,
    MenuItem, Chip, Avatar, IconButton, Tooltip, Dialog, DialogTitle,
    DialogContent, DialogActions, Divider, LinearProgress, InputAdornment,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const initialProjects = [
    {
        id: 1,
        name: "E-Commerce Website",
        client: "NovaTech Solutions",
        description: "Development of a modern e-commerce platform.",
        status: "In Progress",
        priority: "High",
        progress: 75,
        startDate: "2026-11-01",
        deadline: "2026-12-15",
        team: ["AK", "RS", "PM"],
        budget: 85000,
    },
    {
        id: 2,
        name: "Mobile Banking App",
        client: "FinCore Ltd.",
        description: "Design and development of a mobile banking application.",
        status: "Planning",
        priority: "Medium",
        progress: 20,
        startDate: "2026-11-10",
        deadline: "2027-01-20",
        team: ["AK", "JD"],
        budget: 125000,
    },
    {
        id: 3,
        name: "CRM Dashboard",
        client: "Bright Media",
        description: "CRM system with lead management and analytics.",
        status: "In Progress",
        priority: "High",
        progress: 60,
        startDate: "2026-10-20",
        deadline: "2026-12-05",
        team: ["RS", "PM", "AK"],
        budget: 65000,
    },
    {
        id: 4,
        name: "HR Management Portal",
        client: "Pixel Studio",
        description: "Employee management and HR automation portal.",
        status: "Completed",
        priority: "Low",
        progress: 100,
        startDate: "2026-09-01",
        deadline: "2026-11-10",
        team: ["JD", "AK"],
        budget: 45000,
    },
    {
        id: 5,
        name: "Marketing Campaign",
        client: "CloudSync",
        description: "Digital marketing campaign and analytics setup.",
        status: "On Hold",
        priority: "Medium",
        progress: 35,
        startDate: "2026-11-05",
        deadline: "2026-12-25",
        team: ["PM", "RS"],
        budget: 30000,
    },
];

const emptyProject = {
    name: "",
    client: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    progress: 0,
    startDate: "",
    deadline: "",
    team: [],
    budget: "",
};

const statusColors = {
    Planning: "#7C3AED",
    "In Progress": "#2563EB",
    Completed: "#16A34A",
    "On Hold": "#D97706",
};

const priorityColors = {
    Low: "#16A34A",
    Medium: "#D97706",
    High: "#DC2626",
};

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        transition: ".2s",
        "&:hover fieldset": { borderColor: "#93B4EA" },
        "&.Mui-focused": { boxShadow: "0 0 0 4px rgba(37,99,235,.08)" },
        "&.Mui-focused fieldset": { borderColor: "#2563EB" },
    },
};

function initials(name) {
    return name?.split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase();
}

function StatCard({ title, value, icon, color, bg }) {
    return (
        <Card elevation={0} sx={{
            height: 155, borderRadius: "18px",
            border: "1px solid #E8EDF5",
            transition: ".25s",
            "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(22,59,112,.08)",
                borderColor: "#C7D9F5",
            },
        }}>
            <CardContent sx={{
                p: 2.2, height: "100%", boxSizing: "border-box",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                "&:last-child": { pb: 2.2 },
            }}>
                <Box sx={{
                    width: 42, height: 42, borderRadius: "13px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color, backgroundColor: bg,
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography sx={{ fontSize: 12.5, color: "#64748B", fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#1E293B", mt: 0.5 }}>
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState(initialProjects);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [viewProject, setViewProject] = useState(null);
    const [form, setForm] = useState(emptyProject);

    const filtered = projects.filter((p) => {
        const q = search.toLowerCase();

        const matchesSearch = [p.name, p.client, p.description]
            .some((v) => (v || "").toLowerCase().includes(q));

        const matchesStatus = statusFilter === "All" || p.status === statusFilter;
        const matchesPriority = priorityFilter === "All" || p.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const stats = [
        {
            title: "Total Projects",
            value: projects.length,
            icon: <FolderRoundedIcon />,
            color: "#2563EB",
            bg: "#EAF2FF",
        },
        {
            title: "In Progress",
            value: projects.filter((p) => p.status === "In Progress").length,
            icon: <ScheduleRoundedIcon />,
            color: "#7C3AED",
            bg: "#F3E8FF",
        },
        {
            title: "Completed",
            value: projects.filter((p) => p.status === "Completed").length,
            icon: <TaskAltRoundedIcon />,
            color: "#16A34A",
            bg: "#DCFCE7",
        },
        {
            title: "On Hold",
            value: projects.filter((p) => p.status === "On Hold").length,
            icon: <WarningAmberRoundedIcon />,
            color: "#D97706",
            bg: "#FFF7E6",
        },
    ];

    const openAdd = () => {
        setEditing(null);
        setForm({ ...emptyProject });
        setDialogOpen(true);
    };

    const openEdit = (project) => {
        setEditing(project);
        setForm({ ...project, team: [...project.team] });
        setDialogOpen(true);
    };

    const openView = (project) => {
        setViewProject(project);
        setViewOpen(true);
    };

    const change = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const save = () => {
        if (!form.name.trim() || !form.client.trim()) {
            alert("Project Name and Client Name are required.");
            return;
        }

        if (Number(form.progress) < 0 || Number(form.progress) > 100) {
            alert("Progress must be between 0 and 100.");
            return;
        }

        const finalForm = {
            ...form,
            progress: Number(form.progress),
            budget: Number(form.budget) || 0,
            team: Array.isArray(form.team)
                ? form.team
                : String(form.team || "").split(",").map((v) => v.trim()).filter(Boolean),
        };

        if (finalForm.progress === 100) finalForm.status = "Completed";

        if (editing) {
            setProjects((prev) =>
                prev.map((p) => p.id === editing.id ? { ...finalForm, id: p.id } : p)
            );
        } else {
            setProjects((prev) => [{ ...finalForm, id: Date.now() }, ...prev]);
        }

        setDialogOpen(false);
        setEditing(null);
        setForm(emptyProject);
    };

    const deleteProject = (project) => {
        if (window.confirm(`Delete project "${project.name}"?`)) {
            setProjects((prev) => prev.filter((p) => p.id !== project.id));
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("All");
        setPriorityFilter("All");
    };

    const money = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency", currency: "INR", maximumFractionDigits: 0,
        }).format(amount || 0);

    return (
        <Box sx={{
            width: "100%", maxWidth: 1600, mx: "auto",
            px: { xs: 1.5, sm: 2.5, lg: 3.5 },
            py: { xs: 2, md: 3 }, boxSizing: "border-box",
        }}>

            {/* HEADER */}
            <Box sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2, mb: 3,
            }}>
                <Box>
                    <Typography sx={{
                        fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: "#163B70",
                    }}>
                        Project Management
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: "#64748B", mt: 0.5 }}>
                        Organize projects, track progress and manage your team.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={openAdd}
                    sx={{
                        borderRadius: "12px", px: 2.5, py: 1.2,
                        textTransform: "none", fontWeight: 700,
                        background: "linear-gradient(135deg,#163B70,#2563EB)",
                        transition: ".25s",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(37,99,235,.25)",
                            background: "#163B70",
                        },
                    }}
                >
                    Create Project
                </Button>
            </Box>

            {/* STATS */}
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(4,1fr)",
                },
                gap: 2, mb: 3,
            }}>
                {stats.map((s) => (
                    <StatCard key={s.title} {...s} />
                ))}
            </Box>

            {/* PROJECT CONTENT */}
            <Paper elevation={0} sx={{
                border: "1px solid #E8EDF5", borderRadius: "20px",
                overflow: "hidden", width: "100%",
            }}>
                <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
                    <Box sx={{ mb: 2.5 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#163B70" }}>
                            All Projects
                        </Typography>
                        <Typography sx={{ fontSize: 12.5, color: "#64748B", mt: 0.4 }}>
                            Monitor project performance and deadlines
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth size="small"
                                placeholder="Search project or client..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRoundedIcon sx={{ color: "#94A3B8" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                select fullWidth size="small" label="Status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                sx={inputSx}
                            >
                                {["All", "Planning", "In Progress", "Completed", "On Hold"].map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                select fullWidth size="small" label="Priority"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                sx={inputSx}
                            >
                                {["All", "Low", "Medium", "High"].map((p) => (
                                    <MenuItem key={p} value={p}>{p}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={1}>
                            <Button
                                fullWidth onClick={clearFilters}
                                sx={{
                                    height: 40, border: "1px solid #E2E8F0",
                                    borderRadius: "12px", color: "#64748B",
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: "#EAF2FF", color: "#2563EB" },
                                }}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ borderColor: "#EDF1F7" }} />

                {/* PROJECT CARDS */}
                <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr", md: "repeat(2,minmax(0,1fr))",
                            xl: "repeat(3,minmax(0,1fr))",
                        },
                        gap: 2.5,
                    }}>
                        {filtered.map((project) => (
                            <Card key={project.id} elevation={0} sx={{
                                border: "1px solid #E8EDF5", borderRadius: "18px",
                                display: "flex", flexDirection: "column",
                                transition: ".25s", minWidth: 0,
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 28px rgba(22,59,112,.08)",
                                    borderColor: "#C7D9F5",
                                },
                            }}>
                                <CardContent sx={{
                                    p: 2.3, flex: 1,
                                    "&:last-child": { pb: 2.3 },
                                }}>
                                    <Box sx={{
                                        display: "flex", justifyContent: "space-between",
                                        alignItems: "flex-start", gap: 1, mb: 2,
                                    }}>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography sx={{
                                                fontWeight: 800, fontSize: 16, color: "#1E293B",
                                                overflowWrap: "anywhere",
                                            }}>
                                                {project.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: 12.5, color: "#64748B", mt: 0.5 }}>
                                                {project.client}
                                            </Typography>
                                        </Box>

                                        <Chip label={project.status} size="small" sx={{
                                            fontWeight: 700, fontSize: 10.5, flexShrink: 0,
                                            color: statusColors[project.status],
                                            backgroundColor: `${statusColors[project.status]}15`,
                                        }} />
                                    </Box>

                                    <Typography sx={{
                                        fontSize: 12.5, color: "#64748B",
                                        lineHeight: 1.7, minHeight: 42, mb: 2,
                                    }}>
                                        {project.description}
                                    </Typography>

                                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                                        <Chip label={`${project.priority} Priority`} size="small" sx={{
                                            fontWeight: 700, fontSize: 11,
                                            color: priorityColors[project.priority],
                                            backgroundColor: `${priorityColors[project.priority]}15`,
                                        }} />
                                        <Chip label={money(project.budget)} size="small" sx={{
                                            backgroundColor: "#F1F5F9", color: "#475569",
                                            fontWeight: 700, fontSize: 11,
                                        }} />
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{
                                            display: "flex", justifyContent: "space-between",
                                            alignItems: "center", mb: 1,
                                        }}>
                                            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748B" }}>
                                                Project Progress
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, fontWeight: 800, color: "#2563EB" }}>
                                                {project.progress}%
                                            </Typography>
                                        </Box>

                                        <LinearProgress variant="determinate" value={project.progress} sx={{
                                            height: 8, borderRadius: 5, backgroundColor: "#EAF2FF",
                                            "& .MuiLinearProgress-bar": {
                                                borderRadius: 5,
                                                background: "linear-gradient(90deg,#163B70,#2563EB)",
                                            },
                                        }} />
                                    </Box>

                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Box sx={{ p: 1.3, borderRadius: "12px", backgroundColor: "#F8FAFC" }}>
                                                <Typography sx={{ fontSize: 10.5, color: "#64748B" }}>
                                                    Start Date
                                                </Typography>
                                                <Typography sx={{ fontSize: 12.5, fontWeight: 700, mt: 0.5 }}>
                                                    {project.startDate || "—"}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ p: 1.3, borderRadius: "12px", backgroundColor: "#F8FAFC" }}>
                                                <Typography sx={{ fontSize: 10.5, color: "#64748B" }}>
                                                    Deadline
                                                </Typography>
                                                <Typography sx={{ fontSize: 12.5, fontWeight: 700, mt: 0.5 }}>
                                                    {project.deadline || "—"}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{
                                        mt: 2, display: "flex", alignItems: "center",
                                        justifyContent: "space-between", gap: 1,
                                    }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                                            {project.team.slice(0, 4).map((member, index) => (
                                                <Tooltip key={index} title={member}>
                                                    <Avatar sx={{
                                                        width: 30, height: 30, fontSize: 10.5,
                                                        fontWeight: 700, backgroundColor: "#EAF2FF",
                                                        color: "#163B70", border: "2px solid white",
                                                    }}>
                                                        {initials(member)}
                                                    </Avatar>
                                                </Tooltip>
                                            ))}
                                            <Typography sx={{ fontSize: 11.5, color: "#64748B" }}>
                                                {project.team.length} members
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 0.5 }}>
                                            <Tooltip title="View project">
                                                <IconButton size="small" onClick={() => openView(project)} sx={{
                                                    color: "#64748B", backgroundColor: "#F1F5F9",
                                                    "&:hover": { color: "#2563EB", backgroundColor: "#E0E7FF", transform: "translateY(-2px)" },
                                                }}>
                                                    <VisibilityRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Edit project">
                                                <IconButton size="small" onClick={() => openEdit(project)} sx={{
                                                    color: "#2563EB", backgroundColor: "#EAF2FF",
                                                    "&:hover": { backgroundColor: "#BFDBFE", transform: "translateY(-2px)" },
                                                }}>
                                                    <EditRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete project">
                                                <IconButton size="small" onClick={() => deleteProject(project)} sx={{
                                                    color: "#DC2626", backgroundColor: "#FEE2E2",
                                                    "&:hover": { backgroundColor: "#FECACA", transform: "translateY(-2px)" },
                                                }}>
                                                    <DeleteOutlineRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}

                        {filtered.length === 0 && (
                            <Box sx={{ gridColumn: "1/-1", py: 6, textAlign: "center" }}>
                                <Typography sx={{ fontWeight: 700, color: "#64748B" }}>
                                    No projects found
                                </Typography>
                                <Typography sx={{ fontSize: 12.5, color: "#94A3B8", mt: 1 }}>
                                    Try changing your search or filters.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box sx={{
                    px: 2.5, py: 2, borderTop: "1px solid #EDF1F7",
                }}>
                    <Typography sx={{ fontSize: 12.5, color: "#64748B" }}>
                        Showing {filtered.length} of {projects.length} projects
                    </Typography>
                </Box>
            </Paper>

            {/* ADD / EDIT DIALOG */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
                fullWidth maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: "22px", overflow: "hidden",
                        border: "1px solid #E8EDF5",
                        boxShadow: "0 25px 80px rgba(15,23,42,.18)",
                        animation: "enter .3s ease",
                        "@keyframes enter": {
                            from: { opacity: 0, transform: "translateY(18px) scale(.98)" },
                            to: { opacity: 1, transform: "translateY(0) scale(1)" },
                        },
                    }
                }}
            >
                <DialogTitle sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", borderBottom: "1px solid #E8EDF5",
                    background: "linear-gradient(135deg,#FFFFFF,#F8FBFF)",
                }}>
                    <Box>
                        <Typography sx={{ fontSize: 21, fontWeight: 800, color: "#163B70" }}>
                            {editing ? "Edit Project" : "Create Project"}
                        </Typography>
                        <Typography sx={{ fontSize: 12.5, color: "#64748B", mt: 0.4 }}>
                            Manage project details, timeline and team.
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setDialogOpen(false)}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#FAFCFF" }}>
                    <Box sx={{
                        p: 2, borderRadius: "14px",
                        background: "linear-gradient(135deg,#EFF6FF,#F8FAFF)",
                        border: "1px solid #E3ECFA", mb: 2.5,
                    }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#163B70" }}>
                            Basic Project Information
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: "#64748B", mt: 0.4 }}>
                            Enter project name, client and description.
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Project Name *
                            </Typography>
                            <TextField fullWidth size="small" name="name"
                                value={form.name} onChange={change}
                                placeholder="Project name" sx={inputSx} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Client Name *
                            </Typography>
                            <TextField fullWidth size="small" name="client"
                                value={form.client} onChange={change}
                                placeholder="Client name" sx={inputSx} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Description
                            </Typography>
                            <TextField fullWidth multiline minRows={3} size="small"
                                name="description" value={form.description} onChange={change}
                                placeholder="Describe project goals..." sx={inputSx} />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{
                        p: 2, borderRadius: "14px",
                        background: "linear-gradient(135deg,#EFF6FF,#F8FAFF)",
                        border: "1px solid #E3ECFA", mb: 2.5,
                    }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#163B70" }}>
                            Project Planning
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: "#64748B", mt: 0.4 }}>
                            Set priority, status, progress and timeline.
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Status
                            </Typography>
                            <TextField select fullWidth size="small" name="status"
                                value={form.status} onChange={change} sx={inputSx}>
                                {["Planning", "In Progress", "Completed", "On Hold"].map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Priority
                            </Typography>
                            <TextField select fullWidth size="small" name="priority"
                                value={form.priority} onChange={change} sx={inputSx}>
                                {["Low", "Medium", "High"].map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Progress (%)
                            </Typography>
                            <TextField fullWidth size="small" type="number" name="progress"
                                value={form.progress} onChange={change}
                                inputProps={{ min: 0, max: 100 }} sx={inputSx} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Project Budget (₹)
                            </Typography>
                            <TextField fullWidth size="small" type="number" name="budget"
                                value={form.budget} onChange={change}
                                placeholder="0" sx={inputSx} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Start Date
                            </Typography>
                            <TextField fullWidth size="small" type="date" name="startDate"
                                value={form.startDate} onChange={change} sx={inputSx} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Deadline
                            </Typography>
                            <TextField fullWidth size="small" type="date" name="deadline"
                                value={form.deadline} onChange={change} sx={inputSx} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mb: 1, color: "#475569" }}>
                                Team Members (comma separated)
                            </Typography>
                            <TextField fullWidth size="small" name="team"
                                value={Array.isArray(form.team) ? form.team.join(", ") : form.team}
                                onChange={(e) => setForm({ ...form, team: e.target.value })}
                                placeholder="Aamini, Rahul, Priya" sx={inputSx} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{
                    p: 2.5, borderTop: "1px solid #E8EDF5",
                }}>
                    <Button onClick={() => setDialogOpen(false)} sx={{
                        textTransform: "none", color: "#64748B",
                        "&:hover": { backgroundColor: "#F1F5F9" },
                    }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={save} sx={{
                        px: 3, borderRadius: "11px", fontWeight: 700,
                        textTransform: "none",
                        background: "linear-gradient(135deg,#163B70,#2563EB)",
                        transition: ".25s",
                        "&:hover": { transform: "translateY(-2px)", background: "#163B70" },
                    }}>
                        {editing ? "Save Changes" : "Create Project"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* VIEW PROJECT DIALOG */}
            <Dialog open={viewOpen} onClose={() => setViewOpen(false)}
                fullWidth maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: "22px", overflow: "hidden",
                        border: "1px solid #E8EDF5",
                        boxShadow: "0 25px 80px rgba(15,23,42,.18)",
                        animation: "enter .3s ease",
                        "@keyframes enter": {
                            from: { opacity: 0, transform: "translateY(18px) scale(.98)" },
                            to: { opacity: 1, transform: "translateY(0) scale(1)" },
                        },
                    }
                }}
            >
                <DialogTitle sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", borderBottom: "1px solid #E8EDF5",
                }}>
                    <Typography sx={{ fontWeight: 800, color: "#163B70", fontSize: 21 }}>
                        Project Details
                    </Typography>
                    <IconButton onClick={() => setViewOpen(false)}>
                        <CloseRoundedIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3, backgroundColor: "#FAFCFF" }}>
                    {viewProject && (
                        <>
                            <Box sx={{
                                p: 2, borderRadius: "16px",
                                background: "linear-gradient(135deg,#EFF6FF,#FFFFFF)",
                                border: "1px solid #E3ECFA", mb: 2,
                            }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#1E293B" }}>
                                    {viewProject.name}
                                </Typography>
                                <Typography sx={{ fontSize: 13, color: "#64748B", mt: 0.5 }}>
                                    {viewProject.client}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
                                    <Chip size="small" label={viewProject.status} sx={{
                                        color: statusColors[viewProject.status],
                                        backgroundColor: `${statusColors[viewProject.status]}15`,
                                        fontWeight: 700,
                                    }} />
                                    <Chip size="small" label={`${viewProject.priority} Priority`} sx={{
                                        color: priorityColors[viewProject.priority],
                                        backgroundColor: `${priorityColors[viewProject.priority]}15`,
                                        fontWeight: 700,
                                    }} />
                                </Box>
                            </Box>

                            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748B", mb: 1 }}>
                                DESCRIPTION
                            </Typography>
                            <Paper elevation={0} sx={{
                                p: 2, borderRadius: "13px",
                                border: "1px solid #E8EDF5", backgroundColor: "#FFFFFF", mb: 2,
                            }}>
                                <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: "#334155" }}>
                                    {viewProject.description || "No description"}
                                </Typography>
                            </Paper>

                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748B" }}>
                                        Progress
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, color: "#2563EB", fontSize: 13 }}>
                                        {viewProject.progress}%
                                    </Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={viewProject.progress} sx={{
                                    height: 9, borderRadius: 5, backgroundColor: "#EAF2FF",
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 5, background: "linear-gradient(90deg,#163B70,#2563EB)",
                                    },
                                }} />
                            </Box>

                            <Grid container spacing={1.5}>
                                {[
                                    ["Start Date", viewProject.startDate],
                                    ["Deadline", viewProject.deadline],
                                    ["Budget", money(viewProject.budget)],
                                    ["Team Size", `${viewProject.team.length} Members`],
                                ].map(([label, value]) => (
                                    <Grid item xs={6} key={label}>
                                        <Box sx={{
                                            p: 1.8, backgroundColor: "#FFFFFF",
                                            border: "1px solid #E8EDF5", borderRadius: "13px",
                                            transition: ".2s",
                                            "&:hover": { backgroundColor: "#F8FBFF", borderColor: "#93B4EA" },
                                        }}>
                                            <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 700 }}>
                                                {label}
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, color: "#1E293B", fontWeight: 700, mt: 0.5 }}>
                                                {value || "—"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748B", mb: 1 }}>
                                    TEAM MEMBERS
                                </Typography>
                                <Box sx={{
                                    display: "flex", gap: 1, flexWrap: "wrap",
                                    p: 1.5, borderRadius: "13px",
                                    backgroundColor: "#FFFFFF", border: "1px solid #E8EDF5",
                                }}>
                                    {viewProject.team.map((member, i) => (
                                        <Chip key={i} avatar={<Avatar>{initials(member)}</Avatar>}
                                            label={member} sx={{ fontWeight: 600 }} />
                                    ))}
                                    {viewProject.team.length === 0 && "No team assigned"}
                                </Box>
                            </Box>
                        </>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2.5, borderTop: "1px solid #E8EDF5" }}>
                    <Button onClick={() => {
                        setViewOpen(false);
                        openEdit(viewProject);
                    }} startIcon={<EditRoundedIcon />} sx={{
                        textTransform: "none", fontWeight: 700,
                        "&:hover": { backgroundColor: "#EAF2FF" },
                    }}>
                        Edit Project
                    </Button>
                    <Button onClick={() => setViewOpen(false)} sx={{
                        textTransform: "none", color: "#64748B",
                        "&:hover": { backgroundColor: "#F1F5F9" },
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
