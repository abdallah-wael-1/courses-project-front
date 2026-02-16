// src/components/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { IconButton, Box, alpha, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop({ showAfter = 300 }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;

      setVisible(scrolled > showAfter);
      setScrollPercent(percent);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle math
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercent / 100) * circumference;

  // ────────────────────────────────────────────────
  // Theme-aware colors (no hex hardcodes)
  // ────────────────────────────────────────────────
  const circleBgStroke = isDark
    ? alpha(theme.palette.common.white, 0.18)   // slightly softer than 0.2 in dark mode
    : theme.palette.divider;

  const progressStroke = theme.palette.primary.main;

  const buttonBg = theme.palette.background.paper;

  const hoverShadowColor = alpha(theme.palette.primary.main, 0.20);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 36 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Box
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              right: { xs: 16, sm: 24, md: 32 },
              bottom: { xs: 16, sm: 24, md: 32 },
              zIndex: theme.zIndex.speedDial, // usually 1300–1400 range
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "50%",
            }}
          >
            {/* Background + Progress Ring */}
            <svg
              width={64}
              height={64}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke={circleBgStroke}
                strokeWidth="4"
                fill="none"
              />

              {/* Progress circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke={progressStroke}
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
                style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
              />
            </svg>

            {/* Floating button */}
            <IconButton
              size="large"
              aria-label="Scroll to top"
              onClick={scrollToTop} // optional — Box already has it
              sx={{
                width: 56,
                height: 56,
                bgcolor: buttonBg,
                color: "text.primary",           // better contrast than contrastText in many cases
                boxShadow: theme.shadows[4],
                backdropFilter: "blur(8px)",     // nice modern touch (optional)
                transition: "all 0.22s ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px ${hoverShadowColor}`,
                },
                "&:active": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}