
import React, { useMemo, useState } from "react";
import {
  Box, Typography, Paper, Grid, Card, CardContent, Avatar, Chip,
  Button, TextField, InputAdornment, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Tooltip, Divider,
  ToggleButton, ToggleButtonGroup, TableSortLabel, TablePagination,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const initialLeads = [
  {
    id: 1, name: "Rahul Sharma", company: "NovaTech Solutions",
    email: "rahul@novatech.com", phone: "9876543210",
    source: "Website", status: "New", followUpDate: "2026-11-25",
    assignedTo: "Aamini", nextAction: "Call",
    followUpStatus: "Pending", notes: "Interested in CRM software.",
  },
  {
    id: 2, name: "Priya Patel", company: "Bright Media",
    email: "priya@brightmedia.com", phone: "9876543211",
    source: "LinkedIn", status: "Contacted", followUpDate: "2026-11-24",
    assignedTo: "Aamini", nextAction: "Meeting",
    followUpStatus: "Pending", notes: "Requested product demo.",
  },
  {
    id: 3, name: "Aarav Mehta", company: "CloudSync",
    email: "aarav@cloudsync.com", phone: "9876543212",
    source: "Referral", status: "Qualified", followUpDate: "2026-11-26",
    assignedTo: "Sales Team", nextAction: "Email",
    followUpStatus: "Pending", notes: "Budget discussion pending.",
  },
  {
    id: 4, name: "Neha Desai", company: "Pixel Studio",
    email: "neha@pixelstudio.com", phone: "9876543213",
    source: "Instagram", status: "Won", followUpDate: "",
    assignedTo: "Aamini", nextAction: "Call",
    followUpStatus: "Completed", notes: "Converted successfully.",
  },
  {
    id: 5, name: "Karan Shah", company: "TechBridge",
    email: "karan@techbridge.com", phone: "9876543214",
    source: "Website", status: "Lost", followUpDate: "",
    assignedTo: "Sales Team", nextAction: "Email",
    followUpStatus: "Completed", notes: "Not interested currently.",
  },
];

const emptyLead = {
  name: "", company: "", email: "", phone: "",
  source: "Website", status: "New", followUpDate: "",
  assignedTo: "", nextAction: "Call",
  followUpStatus: "Pending", notes: "",
};

const statusColors = {
  New: "#2563EB",
  Contacted: "#D97706",
  Qualified: "#7C3AED",
  Won: "#16A34A",
  Lost: "#DC2626",
};

const statusOptions = ["New", "Contacted", "Qualified", "Won", "Lost"];
const actionOptions = ["Call", "Meeting", "Email", "WhatsApp", "Demo"];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    transition: "all .25s ease",
    "&:hover": {
      backgroundColor: "#F8FBFF",
      "& fieldset": { borderColor: "#93B4EA" },
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 0 4px rgba(37,99,235,.08)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
      borderWidth: "1.5px",
    },
  },
};

function FieldLabel({ children }) {
  return (
    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#475569", mb: 1 }}>
      {children}
    </Typography>
  );
}

function SectionHeader({ title, subtitle, icon }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 1.5,
      p: 1.8, borderRadius: "14px",
      background: "linear-gradient(135deg,#EFF6FF,#F8FAFF)",
      border: "1px solid #E3ECFA", mb: 2.5,
    }}>
      <Box sx={{
        width: 42, height: 42, display: "flex",
        alignItems: "center", justifyContent: "center",
        borderRadius: "12px", backgroundColor: "#DBEAFE", color: "#2563EB",
      }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 800, color: "#163B70", fontSize: 14.5 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#64748B", mt: 0.3 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function CRM() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [followFilter, setFollowFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);
  const [formData, setFormData] = useState(emptyLead);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const today = new Date().toLocaleDateString("en-CA");

  const getFollowStatus = (lead) => {
    if (
      lead.followUpStatus === "Pending" &&
      lead.followUpDate &&
      lead.followUpDate < today &&
      !["Won", "Lost"].includes(lead.status)
    ) return "Overdue";

    return lead.followUpStatus || "Pending";
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase();

      const matchSearch = [
        lead.name, lead.company, lead.email, lead.phone,
        lead.assignedTo, lead.source,
      ].some((v) => (v || "").toLowerCase().includes(q));

      const matchStatus = statusFilter === "All" || lead.status === statusFilter;
      const matchFollow = followFilter === "All" || getFollowStatus(lead) === followFilter;

      return matchSearch && matchStatus && matchFollow;
    });
  }, [leads, search, statusFilter, followFilter]);

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      const av = (a[sortBy] || "").toString().toLowerCase();
      const bv = (b[sortBy] || "").toString().toLowerCase();

      if (av < bv) return sortDirection === "asc" ? -1 : 1;
      if (av > bv) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredLeads, sortBy, sortDirection]);

  const pageLeads = sortedLeads.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    won: leads.filter((l) => l.status === "Won").length,
    pending: leads.filter((l) => getFollowStatus(l) === "Pending").length,
    overdue: leads.filter((l) => getFollowStatus(l) === "Overdue").length,
  };

  const statCards = [
    { title: "Total Leads", value: counts.total, icon: <GroupsRoundedIcon />, color: "#2563EB", bg: "#EAF2FF" },
    { title: "New Leads", value: counts.new, icon: <PersonAddAlt1RoundedIcon />, color: "#D97706", bg: "#FFF7E6" },
    { title: "Qualified", value: counts.qualified, icon: <CheckCircleRoundedIcon />, color: "#7C3AED", bg: "#F3E8FF" },
    { title: "Converted", value: counts.won, icon: <CheckCircleRoundedIcon />, color: "#16A34A", bg: "#DCFCE7" },
    { title: "Pending Follow-ups", value: counts.pending, icon: <PendingActionsRoundedIcon />, color: "#D97706", bg: "#FFF7E6" },
    { title: "Overdue", value: counts.overdue, icon: <PendingActionsRoundedIcon />, color: "#DC2626", bg: "#FEE2E2" },
  ];

  const openAdd = () => {
    setEditingLead(null);
    setFormData({ ...emptyLead });
    setDialogOpen(true);
  };

  const openEdit = (lead) => {
    setEditingLead(lead);
    setFormData({ ...lead });
    setDialogOpen(true);
  };

  const openView = (lead) => {
    setViewLead(lead);
    setViewOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.company.trim()) {
      alert("Lead Name and Company Name are required.");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) => l.id === editingLead.id ? { ...formData, id: l.id } : l)
      );
    } else {
      setLeads((prev) => [{ ...formData, id: Date.now() }, ...prev]);
    }

    setDialogOpen(false);
    setEditingLead(null);
    setFormData(emptyLead);
    setPage(0);
  };

  const handleDelete = (lead) => {
    if (window.confirm(`Delete ${lead.name}'s lead record?`)) {
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    }
  };

  const markCompleted = (id) => {
    setLeads((prev) =>
      prev.map((l) => l.id === id ? { ...l, followUpStatus: "Completed" } : l)
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setFollowFilter("All");
    setPage(0);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((prev) => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Name", "Company", "Email", "Phone", "Source", "Status",
      "Follow Up Date", "Assigned To", "Next Action", "Follow Up Status", "Notes",
    ];

    const rows = filteredLeads.map((l) => [
      l.name, l.company, l.email, l.phone, l.source, l.status,
      l.followUpDate, l.assignedTo, l.nextAction, getFollowStatus(l), l.notes,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) =>
        `"${String(value ?? "").replace(/"/g, '""')}"`
      ).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Elarion-CRM-Leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const moveLead = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => l.id === leadId ? { ...l, status: newStatus } : l)
    );
  };

  return (
    <Box sx={{
      width: "100%",
      maxWidth: "1600px",
      mx: "auto",
      px: { xs: 1.5, sm: 2.5, lg: 3.5 },
      py: { xs: 2, md: 3 },
      boxSizing: "border-box",
    }}>

      {/* HEADER */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: 2, mb: 3,
      }}>
        <Box>
          <Typography sx={{
            fontSize: { xs: 24, md: 30 },
            fontWeight: 800, color: "#163B70",
          }}>
            CRM Management
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: 13.5, mt: 0.5 }}>
            Manage leads, sales opportunities and customer follow-ups.
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
            boxShadow: "0 4px 14px rgba(37,99,235,0.18)",
            transition: ".25s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(37,99,235,.25)",
              background: "#163B70",
            },
          }}
        >
          Add Lead
        </Button>
      </Box>

      {/* SUMMARY CARDS */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,minmax(0,1fr))",
          md: "repeat(3,minmax(0,1fr))",
          xl: "repeat(6,minmax(0,1fr))",
        },
        gap: 2, mb: 3, width: "100%",
      }}>
        {statCards.map((card) => (
          <Card key={card.title} elevation={0} sx={{
            width: "100%", minWidth: 0, height: 160,
            boxSizing: "border-box",
            border: "1px solid #E8EDF5",
            borderRadius: "18px",
            transition: "all .25s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 25px rgba(22,59,112,.08)",
              borderColor: "#C7D9F5",
            },
          }}>
            <CardContent sx={{
              height: "100%", boxSizing: "border-box",
              p: 2.2, display: "flex",
              flexDirection: "column", justifyContent: "space-between",
              "&:last-child": { pb: 2.2 },
            }}>
              <Box sx={{
                width: 42, height: 42, borderRadius: "13px",
                display: "flex", alignItems: "center",
                justifyContent: "center", color: card.color,
                backgroundColor: card.bg,
              }}>
                {card.icon}
              </Box>
              <Box>
                <Typography sx={{
                  fontSize: 12, fontWeight: 600, color: "#64748B",
                  minHeight: 36, display: "flex", alignItems: "center",
                }}>
                  {card.title}
                </Typography>
                <Typography sx={{ fontSize: 28, fontWeight: 800, color: "#1E293B" }}>
                  {card.value}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* MAIN CRM */}
      <Paper elevation={0} sx={{
        width: "100%", minWidth: 0,
        border: "1px solid #E8EDF5",
        borderRadius: "20px", overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}>

        {/* TITLE + VIEW SWITCH */}
        <Box sx={{
          px: { xs: 1.5, md: 2.5 }, pt: 2.5,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 1.5,
        }}>
          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 800, color: "#163B70" }}>
              Leads Overview
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#64748B", mt: 0.4 }}>
              Manage and track your sales pipeline
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<DownloadRoundedIcon />}
              onClick={exportCSV}
              sx={{
                textTransform: "none", borderRadius: "11px",
                fontWeight: 700, borderColor: "#DCE5F1",
                color: "#475569", transition: ".2s",
                "&:hover": {
                  backgroundColor: "#EAF2FF",
                  borderColor: "#93B4EA",
                  color: "#2563EB",
                },
              }}
            >
              Export CSV
            </Button>

            <ToggleButtonGroup
              exclusive
              value={viewMode}
              onChange={(e, value) => value && setViewMode(value)}
              size="small"
              sx={{
                backgroundColor: "#F4F7FB",
                borderRadius: "12px", p: 0.5,
                border: "1px solid #E2E8F0",
                "& .MuiToggleButton-root": {
                  border: "none", borderRadius: "9px !important",
                  px: 1.5, py: 1, textTransform: "none",
                  fontWeight: 700, color: "#64748B",
                },
                "& .Mui-selected": {
                  backgroundColor: "#FFFFFF !important",
                  color: "#2563EB !important",
                  boxShadow: "0 2px 6px rgba(0,0,0,.06)",
                },
              }}
            >
              <ToggleButton value="table">
                <TableRowsRoundedIcon sx={{ mr: 0.8, fontSize: 18 }} />
                Table
              </ToggleButton>
              <ToggleButton value="pipeline">
                <ViewKanbanRoundedIcon sx={{ mr: 0.8, fontSize: 18 }} />
                Pipeline
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* FILTERS */}
        <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth size="small"
                placeholder="Search name, company, email, phone..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
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
                fullWidth select size="small" label="Lead Status"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
                sx={inputSx}
              >
                {["All", ...statusOptions].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth select size="small" label="Follow-up Status"
                value={followFilter}
                onChange={(e) => { setFollowFilter(e.target.value); setPage(0); }}
                sx={inputSx}
              >
                {["All", "Pending", "Completed", "Overdue"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={1}>
              <Tooltip title="Reset filters">
                <Button fullWidth onClick={resetFilters} sx={{
                  minWidth: 0, height: 40, borderRadius: "12px",
                  color: "#64748B", border: "1px solid #E2E8F0",
                  "&:hover": { backgroundColor: "#EAF2FF", color: "#2563EB" },
                }}>
                  <FilterAltOffRoundedIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: "#EDF1F7" }} />

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <>
            <TableContainer sx={{
              width: "100%", overflowX: "auto",
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#CBD5E1", borderRadius: 10 },
            }}>
              <Table sx={{
                minWidth: 1250,
                "& .MuiTableCell-root": { borderBottom: "1px solid #EDF1F7", py: 1.8 },
              }}>
                <TableHead>
                  <TableRow sx={{
                    backgroundColor: "#F4F7FB",
                    "& .MuiTableCell-root": {
                      fontWeight: 700, color: "#475569",
                      fontSize: 12, whiteSpace: "nowrap", py: 1.8,
                    },
                  }}>
                    {[
                      ["name", "Lead"],
                      ["company", "Company"],
                      ["email", "Contact"],
                      ["source", "Source"],
                      ["status", "Status"],
                      ["followUpDate", "Follow-up Date"],
                      ["assignedTo", "Assigned To"],
                      ["nextAction", "Next Action"],
                    ].map(([field, label]) => (
                      <TableCell key={field}>
                        <TableSortLabel
                          active={sortBy === field}
                          direction={sortBy === field ? sortDirection : "asc"}
                          onClick={() => handleSort(field)}
                        >
                          {label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell>Follow-up</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pageLeads.map((lead) => {
                    const fs = getFollowStatus(lead);

                    return (
                      <TableRow hover key={lead.id} sx={{
                        transition: ".2s",
                        "&:hover": { backgroundColor: "#F8FAFC" },
                      }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 160 }}>
                            <Avatar sx={{
                              width: 38, height: 38, fontSize: 13, fontWeight: 700,
                              backgroundColor: "#EAF2FF", color: "#163B70",
                            }}>
                              {getInitials(lead.name)}
                            </Avatar>
                            <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#1E293B" }}>
                              {lead.name}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography sx={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                            {lead.company}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box sx={{ minWidth: 170 }}>
                            <Typography sx={{ fontSize: 12.5 }}>{lead.email || "—"}</Typography>
                            <Typography sx={{ fontSize: 12, color: "#64748B", mt: 0.4 }}>
                              {lead.phone || "—"}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Chip label={lead.source || "—"} size="small" sx={{
                            backgroundColor: "#F1F5F9", color: "#475569",
                            fontSize: 11, fontWeight: 600,
                          }} />
                        </TableCell>

                        <TableCell>
                          <Chip label={lead.status} size="small" sx={{
                            backgroundColor: `${statusColors[lead.status]}15`,
                            color: statusColors[lead.status], fontSize: 11, fontWeight: 700,
                          }} />
                        </TableCell>

                        <TableCell>
                          <Typography sx={{ fontSize: 12.5, whiteSpace: "nowrap" }}>
                            {lead.followUpDate || "—"}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography sx={{ fontSize: 12.5, whiteSpace: "nowrap" }}>
                            {lead.assignedTo || "Unassigned"}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip label={lead.nextAction || "—"} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                        </TableCell>

                        <TableCell>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-start" }}>
                            <Chip label={fs} size="small" sx={{
                              backgroundColor: `${fs === "Completed" ? "#16A34A" : fs === "Overdue" ? "#DC2626" : "#D97706"}15`,
                              color: fs === "Completed" ? "#16A34A" : fs === "Overdue" ? "#DC2626" : "#D97706",
                              fontWeight: 700, fontSize: 11,
                            }} />
                            {fs !== "Completed" && (
                              <Button size="small" onClick={() => markCompleted(lead.id)} sx={{
                                fontSize: 10.5, textTransform: "none", px: 0.5,
                              }}>
                                Complete
                              </Button>
                            )}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box sx={{ display: "flex", gap: 0.6 }}>
                            <Tooltip title="View lead">
                              <IconButton size="small" onClick={() => openView(lead)} sx={{
                                color: "#64748B", backgroundColor: "#F1F5F9",
                                "&:hover": { backgroundColor: "#E0E7FF", color: "#2563EB", transform: "translateY(-2px)" },
                              }}>
                                <VisibilityRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit lead">
                              <IconButton size="small" onClick={() => openEdit(lead)} sx={{
                                color: "#2563EB", backgroundColor: "#EAF2FF",
                                "&:hover": { backgroundColor: "#BFDBFE", transform: "translateY(-2px)" },
                              }}>
                                <EditRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete lead">
                              <IconButton size="small" onClick={() => handleDelete(lead)} sx={{
                                color: "#DC2626", backgroundColor: "#FEE2E2",
                                "&:hover": { backgroundColor: "#FECACA", transform: "translateY(-2px)" },
                              }}>
                                <DeleteOutlineRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {sortedLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 6 }}>
                        <Typography sx={{ color: "#64748B" }}>
                          No leads found. Try changing your filters.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={sortedLeads.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: "1px solid #EDF1F7",
                "& .MuiTablePagination-toolbar": { flexWrap: "wrap" },
              }}
            />
          </>
        )}

        {/* PIPELINE VIEW */}
        {viewMode === "pipeline" && (
          <Box sx={{ p: { xs: 1.5, md: 2.5 }, overflowX: "auto" }}>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5,minmax(250px,1fr))",
              gap: 2, alignItems: "start",
              minWidth: 1280,
            }}>
              {statusOptions.map((status) => {
                const stageLeads = filteredLeads.filter((l) => l.status === status);

                return (
                  <Box key={status} sx={{
                    border: "1px solid #E8EDF5",
                    borderRadius: "18px", backgroundColor: "#F8FAFC",
                    p: 1.5, minHeight: 300,
                  }}>
                    <Box sx={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between", mb: 2,
                      pb: 1.5, borderBottom: "1px solid #E2E8F0",
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{
                          width: 9, height: 9, borderRadius: "50%",
                          backgroundColor: statusColors[status],
                        }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 800, color: "#334155" }}>
                          {status}
                        </Typography>
                      </Box>
                      <Chip label={stageLeads.length} size="small" sx={{
                        fontWeight: 700, backgroundColor: `${statusColors[status]}15`,
                        color: statusColors[status],
                      }} />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {stageLeads.map((lead) => (
                        <Card key={lead.id} elevation={0} sx={{
                          border: "1px solid #E8EDF5", borderRadius: "15px",
                          backgroundColor: "#FFFFFF", transition: ".25s",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 8px 20px rgba(22,59,112,.08)",
                            borderColor: "#C7D9F5",
                          },
                        }}>
                          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                            <Box sx={{ display: "flex", gap: 1.2, alignItems: "center", mb: 1.5 }}>
                              <Avatar sx={{
                                width: 38, height: 38, fontSize: 12, fontWeight: 700,
                                bgcolor: "#EAF2FF", color: "#163B70",
                              }}>
                                {getInitials(lead.name)}
                              </Avatar>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontWeight: 800, fontSize: 13, color: "#1E293B" }}>
                                  {lead.name}
                                </Typography>
                                <Typography sx={{ fontSize: 11.5, color: "#64748B" }}>
                                  {lead.company}
                                </Typography>
                              </Box>
                            </Box>

                            <Divider sx={{ mb: 1.5 }} />

                            <Typography sx={{ fontSize: 11.5, color: "#64748B", mb: 0.5 }}>
                              {lead.email || "No email"}
                            </Typography>
                            <Typography sx={{ fontSize: 11.5, color: "#64748B", mb: 1.5 }}>
                              <strong>Source:</strong> {lead.source}
                            </Typography>

                            {lead.followUpDate && (
                              <Box sx={{
                                p: 1, mb: 1.5, backgroundColor: "#F8FAFC",
                                borderRadius: "10px",
                              }}>
                                <Typography sx={{ fontSize: 11, color: "#64748B" }}>
                                  Follow-up
                                </Typography>
                                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                                  {lead.followUpDate}
                                </Typography>
                              </Box>
                            )}

                            <TextField
                              select fullWidth size="small" label="Move to stage"
                              value={lead.status}
                              onChange={(e) => moveLead(lead.id, e.target.value)}
                              sx={{ ...inputSx, mb: 1.5, "& .MuiInputBase-root": { fontSize: 12 } }}
                            >
                              {statusOptions.map((s) => (
                                <MenuItem key={s} value={s}>{s}</MenuItem>
                              ))}
                            </TextField>

                            <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                              <Tooltip title="View">
                                <IconButton size="small" onClick={() => openView(lead)}>
                                  <VisibilityRoundedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" onClick={() => openEdit(lead)} sx={{ color: "#2563EB" }}>
                                  <EditRoundedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => handleDelete(lead)} sx={{ color: "#DC2626" }}>
                                  <DeleteOutlineRoundedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}

                      {stageLeads.length === 0 && (
                        <Box sx={{
                          py: 5, textAlign: "center",
                          border: "1px dashed #CBD5E1", borderRadius: "14px",
                        }}>
                          <Typography sx={{ fontSize: 12, color: "#94A3B8" }}>
                            No leads in this stage
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        <Box sx={{ px: 2.5, py: 2, borderTop: "1px solid #EDF1F7" }}>
          <Typography sx={{ fontSize: 12.5, color: "#64748B" }}>
            Showing {filteredLeads.length} of {leads.length} leads
          </Typography>
        </Box>
      </Paper>

      {/* CREATE / EDIT DIALOG */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth maxWidth="md"
        TransitionProps={{ timeout: 350 }}
        PaperProps={{
          sx: {
            borderRadius: "22px", overflow: "hidden",
            boxShadow: "0 25px 80px rgba(15,23,42,.18)",
            border: "1px solid #E8EDF5",
            animation: "dialogEnter .3s ease",
            "@keyframes dialogEnter": {
              from: { opacity: 0, transform: "translateY(18px) scale(.98)" },
              to: { opacity: 1, transform: "translateY(0) scale(1)" },
            },
          },
        }}
      >
        <DialogTitle sx={{
          px: 3, py: 2.3, display: "flex",
          alignItems: "center", justifyContent: "space-between",
          background: "linear-gradient(135deg,#FFFFFF,#F8FBFF)",
          borderBottom: "1px solid #E8EDF5",
        }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#163B70" }}>
              {editingLead ? "Edit Lead" : "Create New Lead"}
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: 12.5, mt: 0.4 }}>
              {editingLead ? "Update lead information and follow-up details." : "Add a new business opportunity to your pipeline."}
            </Typography>
          </Box>

          <IconButton onClick={() => setDialogOpen(false)} sx={{
            color: "#64748B",
            "&:hover": { backgroundColor: "#FEE2E2", color: "#DC2626", transform: "rotate(90deg)" },
          }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#FAFCFF" }}>
          <SectionHeader
            title="Contact Information"
            subtitle="Basic details about your lead and company"
            icon={<GroupsRoundedIcon />}
          />

          <Grid container spacing={2.2}>
            {[
              { label: "Lead Name *", name: "name", placeholder: "Enter full name" },
              { label: "Company Name *", name: "company", placeholder: "Enter company name" },
              { label: "Email Address", name: "email", placeholder: "name@example.com" },
              { label: "Phone Number", name: "phone", placeholder: "Enter phone number" },
            ].map((f) => (
              <Grid item xs={12} sm={6} key={f.name}>
                <FieldLabel>{f.label}</FieldLabel>
                <TextField
                  fullWidth size="small" name={f.name}
                  value={formData[f.name]} onChange={handleChange}
                  placeholder={f.placeholder} sx={inputSx}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <FieldLabel>Lead Source</FieldLabel>
              <TextField select fullWidth size="small" name="source"
                value={formData.source} onChange={handleChange} sx={inputSx}>
                {["Website", "LinkedIn", "Instagram", "Referral", "Facebook", "Google Ads", "Cold Call", "Other"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel>Assigned Employee</FieldLabel>
              <TextField fullWidth size="small" name="assignedTo"
                value={formData.assignedTo} onChange={handleChange}
                placeholder="Employee name" sx={inputSx} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "#E2E8F0" }} />

          <SectionHeader
            title="Sales & Follow-up Information"
            subtitle="Manage the lead pipeline and future actions"
            icon={<PendingActionsRoundedIcon />}
          />

          <Grid container spacing={2.2}>
            <Grid item xs={12} sm={6}>
              <FieldLabel>Lead Status</FieldLabel>
              <TextField select fullWidth size="small" name="status"
                value={formData.status} onChange={handleChange} sx={inputSx}>
                {statusOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel>Follow-up Date</FieldLabel>
              <TextField fullWidth type="date" size="small" name="followUpDate"
                value={formData.followUpDate} onChange={handleChange} sx={inputSx} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel>Next Action</FieldLabel>
              <TextField select fullWidth size="small" name="nextAction"
                value={formData.nextAction} onChange={handleChange} sx={inputSx}>
                {actionOptions.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel>Follow-up Status</FieldLabel>
              <TextField select fullWidth size="small" name="followUpStatus"
                value={formData.followUpStatus} onChange={handleChange} sx={inputSx}>
                {["Pending", "Completed"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FieldLabel>Notes</FieldLabel>
              <TextField fullWidth multiline minRows={3} size="small"
                name="notes" value={formData.notes} onChange={handleChange}
                placeholder="Add lead requirements, conversations or notes..."
                sx={inputSx} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{
          p: 2.5, borderTop: "1px solid #E8EDF5", backgroundColor: "#FFFFFF", gap: 1,
        }}>
          <Button onClick={() => setDialogOpen(false)} sx={{
            textTransform: "none", color: "#64748B", fontWeight: 600,
            borderRadius: "11px", px: 2,
            "&:hover": { backgroundColor: "#F1F5F9", color: "#334155" },
          }}>
            Cancel
          </Button>

          <Button onClick={handleSave} variant="contained" sx={{
            textTransform: "none", fontWeight: 700, borderRadius: "11px", px: 3,
            background: "linear-gradient(135deg,#163B70,#2563EB)",
            boxShadow: "0 4px 14px rgba(37,99,235,.18)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(37,99,235,.25)",
              background: "#163B70",
            },
          }}>
            {editingLead ? "Save Changes" : "Create Lead"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW DETAILS */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        fullWidth maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "22px", overflow: "hidden",
            boxShadow: "0 25px 80px rgba(15,23,42,.18)",
            border: "1px solid #E8EDF5",
            animation: "dialogEnter .3s ease",
            "@keyframes dialogEnter": {
              from: { opacity: 0, transform: "translateY(18px) scale(.98)" },
              to: { opacity: 1, transform: "translateY(0) scale(1)" },
            },
          },
        }}
      >
        <DialogTitle sx={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", background: "linear-gradient(135deg,#FFFFFF,#F8FBFF)",
          borderBottom: "1px solid #E8EDF5",
        }}>
          <Typography sx={{ fontWeight: 800, color: "#163B70", fontSize: 21 }}>
            Lead Details
          </Typography>
          <IconButton onClick={() => setViewOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, backgroundColor: "#FAFCFF" }}>
          {viewLead && (
            <Box>
              <Box sx={{
                display: "flex", alignItems: "center", gap: 2, mb: 3,
                p: 2, borderRadius: "16px",
                background: "linear-gradient(135deg,#EFF6FF,#FFFFFF)",
                border: "1px solid #E3ECFA",
              }}>
                <Avatar sx={{
                  width: 60, height: 60, bgcolor: "#DBEAFE",
                  color: "#163B70", fontWeight: 800, fontSize: 18,
                }}>
                  {getInitials(viewLead.name)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#1E293B" }}>
                    {viewLead.name}
                  </Typography>
                  <Typography sx={{ color: "#64748B", fontSize: 13 }}>
                    {viewLead.company}
                  </Typography>
                  <Chip label={viewLead.status} size="small" sx={{
                    mt: 1, color: statusColors[viewLead.status],
                    backgroundColor: `${statusColors[viewLead.status]}15`, fontWeight: 700,
                  }} />
                </Box>
              </Box>

              <Grid container spacing={1.5}>
                {[
                  ["Email", viewLead.email],
                  ["Phone", viewLead.phone],
                  ["Source", viewLead.source],
                  ["Assigned To", viewLead.assignedTo],
                  ["Lead Status", viewLead.status],
                  ["Follow-up Date", viewLead.followUpDate],
                  ["Next Action", viewLead.nextAction],
                  ["Follow-up Status", getFollowStatus(viewLead)],
                ].map(([label, value]) => (
                  <Grid item xs={12} sm={6} key={label}>
                    <Box sx={{
                      p: 1.8, bgcolor: "#FFFFFF", borderRadius: "13px",
                      border: "1px solid #E8EDF5", transition: ".2s",
                      "&:hover": {
                        borderColor: "#93B4EA", backgroundColor: "#F8FBFF",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(37,99,235,.05)",
                      },
                    }}>
                      <Typography sx={{ fontSize: 11.5, color: "#64748B", fontWeight: 700, mb: 0.6 }}>
                        {label}
                      </Typography>
                      <Typography sx={{
                        fontSize: 13.5, color: "#1E293B",
                        fontWeight: 600, overflowWrap: "anywhere",
                      }}>
                        {value || "—"}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#64748B", mb: 1 }}>
                  NOTES
                </Typography>
                <Paper elevation={0} sx={{
                  p: 2, bgcolor: "#FFFFFF", borderRadius: "13px",
                  border: "1px solid #E8EDF5",
                }}>
                  <Typography sx={{ fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
                    {viewLead.notes || "No notes added."}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{
          p: 2.5, borderTop: "1px solid #E8EDF5", backgroundColor: "#FFFFFF",
        }}>
          {viewLead && (
            <Button onClick={() => {
              setViewOpen(false);
              openEdit(viewLead);
            }} startIcon={<EditRoundedIcon />} sx={{
              textTransform: "none", fontWeight: 700, borderRadius: "10px",
              "&:hover": { backgroundColor: "#EAF2FF", transform: "translateY(-1px)" },
            }}>
              Edit Lead
            </Button>
          )}

          <Button onClick={() => setViewOpen(false)} sx={{
            textTransform: "none", color: "#64748B", borderRadius: "10px",
            "&:hover": { backgroundColor: "#F1F5F9" },
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
