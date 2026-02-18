import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import {
  Star,
  AccessTime,
  Edit,
  Delete,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { getImageUrl } from "../../utility/image";

function CourseCard({ course, onDelete, onEdit, onView }) {
  const { user } = useAuth();
  const isManagerOrAdmin =
    user?.role === "MANAGER" || user?.role === "ADMIN";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: "100%",
          width: "320px",
          marginLeft: "20px",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(99,102,241,0.2)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="180"
            image={(() => {
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
              objectFit: "cover",
            }}
          />
          <Chip
            label={course.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "white",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />

          <Chip
            label={course.level}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />

          {isManagerOrAdmin && (
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                display: "flex",
                gap: 0.5,
              }}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.(course);
                }}
                sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
              >
                <Edit fontSize="small" color="primary" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.(course._id);
                }}
                sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
              >
                <Delete fontSize="small" color="error" />
              </IconButton>
            </Box>
          )}
        </Box>

        <CardContent
          sx={{
            p: 2.5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography 
            variant="h6" 
            fontWeight={700} 
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "3.2em",
            }}
          >
            {course.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 2 }}
          >
            {course.instructor}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: "#f59e0b" }} />
              <Typography variant="body2" fontWeight={600}>
                {course.rating?.toFixed(1) || "0.0"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {course.duration}h
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Typography variant="h6" fontWeight={700} color="primary">
              ${course.price}
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={() => onView?.(course)}
              sx={{
                background: "linear-gradient(45deg, #6366f1, #f59e0b)",
                fontWeight: 600,
                px: 2,
                "&:hover": {
                  background: "linear-gradient(45deg, #4f46e5, #d97706)",
                },
              }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CourseCard;