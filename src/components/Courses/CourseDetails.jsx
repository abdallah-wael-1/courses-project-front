import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Star,
  AccessTime,
  People,
  School,
} from "@mui/icons-material";

import { getImageUrl } from "../../utility/image";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CourseDetails({ open, onClose, course }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  if (!course) return null;

  const handleEnroll = () => {
    if (!user) {
      setSnackbar({
        open: true,
        message: 'Please login to enroll in this course',
        severity: 'warning'
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    try {
      const thumbnail = localStorage.getItem(`course_preview_${course._id}`) || getImageUrl(course.thumbnail);
      
      const courseData = {
        _id: course._id,
        title: course.title,
        instructor: course.instructor,
        price: course.price,
        thumbnail: thumbnail,
        category: course.category,
        level: course.level,
        duration: course.duration,
        rating: course.rating,
        studentsCount: course.studentsCount,
        description: course.description
      };
      
      localStorage.setItem(`checkout_course_${course._id}`, JSON.stringify(courseData));
    } catch (error) {
      console.error('Failed to store course data:', error);
    }

    onClose();
    navigate(`/checkout/${course._id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" component="div" fontWeight={700}>
            {course.title}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Image */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={(() => {
                  try {
                    const local = localStorage.getItem(`course_preview_${course._id}`);
                    return local || getImageUrl(course.thumbnail);
                  } catch (e) {
                    console.error(e);
                    return getImageUrl(course.thumbnail);
                  }
                })()}
                alt={course.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  objectFit: "cover",
                  boxShadow: 2,
                }}
              />
            </Grid>

            {/* Details / Price Card */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight={700}>
                  ${course.price}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  One-time payment
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Info */}
            <Grid item xs={12} md={7}>
              {/* Category & Level */}
              <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 2 }}>
                <Chip
                  label={course.category}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label={course.level}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>

              {/* Description */}
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {course.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Stats */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Star sx={{ color: "#f59e0b", fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {course.rating?.toFixed(1) || "N/A"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <People sx={{ color: "primary.main", fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {course.studentsCount || 0}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Students
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTime sx={{ color: "secondary.main", fontSize: 20 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {course.duration}h
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <School sx={{ color: "success.main", fontSize: 20 }} />
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {course.instructor}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Instructor
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* What You'll Learn */}
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                What you'll learn:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Master {course.category} fundamentals
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Build real-world projects
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  Get lifetime access to course materials
                </Typography>
                <Typography component="li" variant="body2">
                  Earn a certificate of completion
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} size="large">
            Close
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleEnroll}
            sx={{
              background: "linear-gradient(45deg, #6366f1, #f59e0b)",
              px: 4,
              fontWeight: 600,
              minWidth: 140,
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #d97706)",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar*/}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%', fontSize: '1rem' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CourseDetails;