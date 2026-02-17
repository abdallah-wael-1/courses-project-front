import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, Save, ArrowBack } from "@mui/icons-material";
import { createCourse, updateCourse, getCourseById } from "../../api/coursesApi";
import { compressAndConvertToBase64, validateImageFile, getImageUrl }  from "../utility/image";

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Other",
    level: "All Levels",
    duration: "",
    instructor: "",
  });

  const categories = [
    "Development", "Design", "Business",
    "Marketing", "IT & Software", "Data Science", "Other",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  useEffect(() => {
    if (isEditMode) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    setFetchLoading(true);
    const result = await getCourseById(id);
    if (result.success) {
      const course = result.data;
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category,
        level: course.level,
        duration: course.duration,
        instructor: course.instructor,
      });
      if (course.thumbnail) {
        setImagePreview(getImageUrl(course.thumbnail));
      }
    } else {
      setError(result.message);
    }
    setFetchLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { valid, error: validationError } = validateImageFile(file, 5);
    if (!valid) {
      setError(validationError);
      return;
    }

    try {
      const base64 = await compressAndConvertToBase64(file, 800, 0.65);
      setImagePreview(base64);
    } catch {
      setError("Failed to read image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description || !formData.price ||
        !formData.duration || !formData.instructor) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    // بنبعت JSON عادي - الصورة base64 string جوا الـ body
    const payload = {
      ...formData,
      thumbnail: imagePreview || undefined,  // base64 string أو URL موجود
    };

    const result = isEditMode
      ? await updateCourse(id, payload)
      : await createCourse(payload);

    if (result.success) {
      setSuccess(isEditMode ? "Course updated successfully!" : "Course created successfully!");
      setTimeout(() => navigate("/courses"), 1500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/courses")} sx={{ mb: 3 }}>
        Back to Courses
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {isEditMode ? "Edit Course" : "Create New Course"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {isEditMode ? "Update course information" : "Fill in the details to create a new course"}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>

          {/* Image Upload - كل حاجة في الفرونت */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="thumbnail-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="thumbnail-upload">
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  border: "2px dashed",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "all 0.3s",
                  "&:hover": { borderColor: "primary.dark", bgcolor: "action.hover" },
                }}
              >
                {!imagePreview && (
                  <Box sx={{ textAlign: "center" }}>
                    <CloudUpload sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Click to upload course thumbnail
                    </Typography>
                  </Box>
                )}
              </Box>
            </label>

            {imagePreview && (
              <Button
                size="small"
                color="error"
                onClick={() => setImagePreview(null)}
                sx={{ mt: 1 }}
              >
                Remove Image
              </Button>
            )}

            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              Max size: 5MB (JPG, PNG, WebP)
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Course Title" name="title"
                value={formData.title} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description"
                value={formData.description} onChange={handleChange}
                multiline rows={4} required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Price ($)" name="price" type="number"
                value={formData.price} onChange={handleChange} required
                inputProps={{ min: 0, step: 0.01 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration (hours)" name="duration" type="number"
                value={formData.duration} onChange={handleChange} required
                inputProps={{ min: 0 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Category" name="category"
                value={formData.category} onChange={handleChange} required>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Level" name="level"
                value={formData.level} onChange={handleChange} required>
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Instructor Name" name="instructor"
                value={formData.instructor} onChange={handleChange} required />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button variant="outlined" fullWidth onClick={() => navigate("/courses")} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              sx={{
                background: "linear-gradient(45deg, #6366f1, #f59e0b)",
                "&:hover": { background: "linear-gradient(45deg, #4f46e5, #d97706)" },
              }}
            >
              {loading ? "Saving..." : isEditMode ? "Update Course" : "Create Course"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CourseForm;