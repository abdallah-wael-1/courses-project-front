import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Button,
  Stack,
  InputAdornment,
  Chip,
  useTheme,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import CourseCard from "../components/Courses/CourseCard";
import { getAllCourses, deleteCourse } from "../api/coursesApi";
import CourseDetails from "../components/Courses/CourseDetails";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SectionTitle from '../components/ui/SectionTitle';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    sort: "-createdAt",
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "ADMIN";

  const categories = [
    "All",
    "Development",
    "Design",
    "Business",
    "Marketing",
    "IT & Software",
    "Data Science",
    "Other",
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "price", label: "Price: Low to High" },
    { value: "-price", label: "Price: High to Low" },
    { value: "title", label: "Title: A-Z" },
    { value: "-title", label: "Title: Z-A" },
  ];

  useEffect(() => {
    fetchCourses();
  }, [page, filters]);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");

    const params = {
      page,
      limit: 12,
      ...filters,
      category: filters.category === "All" ? "" : filters.category,
      level: filters.level === "All" ? "" : filters.level,
    };


    const result = await getAllCourses(params);


    if (result.success) {
      const coursesData = result.data?.data?.courses || [];
      const paginationData = result.data?.data?.pagination || {};
      
      
      setCourses(coursesData);
      setTotalPages(paginationData.pages || 1);
    } else {
      setError(result.message || 'Failed to fetch courses');
      setCourses([]);
    }

    setLoading(false);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const result = await deleteCourse(courseId);

    if (result.success) {
      fetchCourses();
    } else {
      alert(result.message);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleView = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: isDark ? 'background.default' : '#fafafa',
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <SectionTitle 
            title="All Courses"
            subtitle={`Discover ${courses.length} courses to boost your skills`}
          />
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Category"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Level */}
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Level"
                value={filters.level}
                onChange={(e) => handleFilterChange("level", e.target.value)}
              >
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Sort */}
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Sort By"
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Add Course Button */}
            {isManagerOrAdmin && (
              <Grid item xs={6} sm={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate("/courses/create")}
                  sx={{
                    background: isDark
                      ? "linear-gradient(45deg, #8b5cf6, #f59e0b)"
                      : "linear-gradient(45deg, #6366f1, #f59e0b)",
                    height: 56,
                    fontWeight: 600,
                    "&:hover": {
                      background: isDark
                        ? "linear-gradient(45deg, #7c3aed, #d97706)"
                        : "linear-gradient(45deg, #4f46e5, #d97706)",
                    },
                  }}
                >
                  Add Course
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Active Filters */}
        {(filters.category || filters.level || filters.search) && (
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
            {filters.search && (
              <Chip
                label={`Search: ${filters.search}`}
                onDelete={() => handleFilterChange("search", "")}
                color="primary"
              />
            )}
            {filters.category && filters.category !== "All" && (
              <Chip
                label={`Category: ${filters.category}`}
                onDelete={() => handleFilterChange("category", "")}
                color="primary"
              />
            )}
            {filters.level && filters.level !== "All" && (
              <Chip
                label={`Level: ${filters.level}`}
                onDelete={() => handleFilterChange("level", "")}
                color="primary"
              />
            )}
          </Stack>
        )}

        {/* Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <>
            {courses.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No courses found. Try adjusting your filters.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course._id}>
                    <CourseCard
                      course={course}
                      onDelete={handleDelete}
                      onEdit={(c) => navigate(`/courses/edit/${c._id}`)}
                      onView={handleView}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Modal */}
            {selectedCourse && (
              <CourseDetails
                open={openModal}
                onClose={handleClose}
                course={selectedCourse}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Courses;