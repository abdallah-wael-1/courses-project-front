// src/components/Courses/CourseViewerModal.jsx
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Stack,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { Close, CheckCircle, PlayCircle } from '@mui/icons-material';
import { updateCourseProgress } from '../../api/enrollmentsApi';

function CourseViewerModal({ open, onClose, course, onProgressUpdate }) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async () => {
    setLoading(true);
    setError('');
    
    // ✅ Update progress to 100%
    const result = await updateCourseProgress(course.id, {
      progress: 100,
      completedLessons: course.totalLessons
    });

    if (result.success) {
      setCompleted(true);
      setTimeout(() => {
        onProgressUpdate?.(); // Refresh dashboard
        setCompleted(false); // Reset for next time
        onClose();
      }, 2500);
    } else {
      setError(result.message || 'Failed to update progress');
    }
    
    setLoading(false);
  };

  if (!course) return null;

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxHeight: '95vh',
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
              {course.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                by {course.instructor}
              </Typography>
              <Chip 
                label={course.category} 
                size="small" 
                color="primary"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Stack>
          </Box>
          <IconButton 
            onClick={onClose} 
            disabled={loading}
            sx={{ 
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' }
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Course Image */}
        <Box
          sx={{
            width: '100%',
            height: 380,
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#000',
          }}
        >
          <Box
            component="img"
            src={course.image}
            alt={course.title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop';
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              bgcolor: '#f5f5f5',
            }}
          />
          
          {/* Play Overlay (Optional) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.3)',
              opacity: 0,
              transition: 'opacity 0.3s',
              '&:hover': {
                opacity: 1,
              }
            }}
          >
            <PlayCircle 
              sx={{ 
                fontSize: 80, 
                color: 'white',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }} 
            />
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Course Info Chips */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
            <Chip 
              label={`${course.totalLessons} Lessons`} 
              variant="outlined"
              size="small"
            />
            <Chip 
              label={`${course.duration} Hours`} 
              variant="outlined"
              size="small"
            />
            <Chip 
              label={`⭐ ${course.rating} Rating`} 
              variant="outlined"
              size="small"
            />
          </Stack>

          {/* Progress Section */}
          <Box 
            sx={{ 
              mb: 3, 
              p: 2.5, 
              borderRadius: 2, 
              bgcolor: 'action.hover',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Typography variant="body2" fontWeight={600} color="text.secondary">
                Course Progress
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={800}
                sx={{
                  background: completed 
                    ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
                    : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {completed ? '100%' : `${course.progress || 0}%`}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={completed ? 100 : (course.progress || 0)}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: 'rgba(0,0,0,0.08)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: completed 
                    ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
                    : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  transition: 'all 0.5s ease',
                },
              }}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </Typography>
              {completed && (
                <Typography variant="caption" color="success.main" fontWeight={700}>
                  🎉 Complete!
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Course Description */}
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            About this course
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            This comprehensive course covers all aspects of {course.category}. 
            You'll learn from industry experts and gain practical skills through 
            hands-on projects. By the end of this course, you'll have a deep 
            understanding of {course.category} and be able to apply your knowledge 
            to real-world scenarios. Perfect for {course.level} level learners.
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* What you'll learn */}
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            What you'll learn
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2, '& li': { mb: 1.5 } }}>
            <Typography component="li" variant="body2" color="text.secondary">
              ✓ Master {course.category} fundamentals and advanced concepts
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              ✓ Build {course.totalLessons}+ real-world projects from scratch
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              ✓ Get lifetime access to {course.duration} hours of video content
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              ✓ Earn a certificate of completion to showcase your skills
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              ✓ Join a community of {course.studentsCount || '1000+'} students
            </Typography>
          </Box>

          {/* Completion Message */}
          {completed && (
            <Box
              sx={{
                mt: 3,
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease-in',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'scale(0.95)' },
                  to: { opacity: 1, transform: 'scale(1)' }
                }
              }}
            >
              <CheckCircle sx={{ fontSize: 70, color: 'white', mb: 2 }} />
              <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                🎉 Congratulations!
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.95 }}>
                You've successfully completed this course!
              </Typography>
              <Typography variant="body2" color="white" sx={{ mt: 1, opacity: 0.9 }}>
                Your certificate is now available in "My Certificates"
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: 'action.hover' }}>
        <Button
          onClick={onClose}
          size="large"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {completed ? 'Done' : 'Close'}
        </Button>

        {!completed && (
          <Button
            onClick={handleComplete}
            variant="contained"
            size="large"
            disabled={loading || course.progress >= 100}
            startIcon={loading ? null : <CheckCircle />}
            sx={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              fontWeight: 700,
              px: 4,
              minWidth: 200,
              '&:hover': {
                background: 'linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(67, 233, 123, 0.4)',
              },
              '&:disabled': {
                background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.3) 0%, rgba(56, 249, 215, 0.3) 100%)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Updating...' : course.progress >= 100 ? 'Completed' : 'Mark as Completed'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CourseViewerModal;