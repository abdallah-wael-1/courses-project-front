import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  variant = "h2",
  maxWidth = 600,
  showDivider = true,
  gradient = true,
  marginBottom = 8,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getAlignmentStyles = () => {
    if (align === "center") {
      return {
        textAlign: "center",
        mx: "auto",
      };
    }

    if (align === "right") {
      return {
        textAlign: "right",
        ml: "auto",
      };
    }

    return {
      textAlign: "left",
    };
  };

  return (
    <Box
      component={motion.div}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      sx={{
        mb: marginBottom,
        ...getAlignmentStyles(),
      }}
    >
      {/* Title */}
      <Typography
        variant={variant}
        sx={{
          fontWeight: 800,
          mb: 1,
          fontSize: {
            xs: "1.9rem",
            md: variant === "h2" ? "2.75rem" : "2.2rem",
            lg: variant === "h2" ? "3.2rem" : "2.5rem",
          },
          ...(gradient && {
            background: isDark
              ? "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }),
          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
      </Typography>

      {/* Divider */}
      {showDivider && (
        <Box
          sx={{
            width: 250,
            height: 3,
            borderRadius: 2,
            mx: align === "center" ? "auto" : 0,
            mb: 3,
            background: isDark
              ? "linear-gradient(90deg, #a78bfa, #818cf8)"
              : "linear-gradient(90deg, #6366f1, #a855f7)",
            boxShadow: isDark
              ? "0 4px 12px rgba(167,139,250,0.3)"
              : "0 4px 12px rgba(99,102,241,0.3)",
          }}
        />
      )}

      {/* Subtitle */}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            maxWidth: maxWidth,
            mx: align === "center" ? "auto" : 0,
            color: "text.secondary",
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
