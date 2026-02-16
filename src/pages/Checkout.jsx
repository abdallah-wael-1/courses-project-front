import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import { CreditCard, Lock, ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import { getCourseById } from "../api/coursesApi";
import { enrollInCourse } from "../api/enrollmentsApi";
import { getImageUrl } from "../utility/image";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCourse = async () => {
      const result = await getCourseById(courseId);
      if (result.success) {
        setCourse(result.data);
      } else {
        setError("Course not found");
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId, user, navigate]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .substring(0, 19);
    }

    if (name === "expiryDate") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }

    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !paymentData.cardNumber ||
      !paymentData.cardName ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      setErrorMessage("Please fill in all payment fields to continue");
      setErrorModalOpen(true);
      return;
    }

    if (paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      setErrorMessage("Please enter a valid 16-digit card number");
      setErrorModalOpen(true);
      return;
    }

    if (paymentData.expiryDate.length < 5) {
      setErrorMessage("Please enter a valid expiry date (MM/YY)");
      setErrorModalOpen(true);
      return;
    }

    if (paymentData.cvv.length < 3) {
      setErrorMessage("Please enter a valid CVV (3-4 digits)");
      setErrorModalOpen(true);
      return;
    }

    setProcessing(true);
    setError("");

    setTimeout(async () => {
      const result = await enrollInCourse(courseId);

      if (result.success) {
        setProcessing(false);
        setSuccessModalOpen(true);
      } else {
        setErrorMessage(result.message || "Payment processing failed. Please try again.");
        setErrorModalOpen(true);
        setProcessing(false);
      }
    }, 2000);
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    navigate("/dashboard/user", { replace: true });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Course not found</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isDark ? "background.default" : "#fafafa",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
          align="center"
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Checkout
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                mx: "auto",
                width: { xs: "100%", md: "90%", lg: "85%" },
                maxWidth: 420,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 48px rgba(99,102,241,0.22)",
                },
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Order Summary
                </Typography>

                <Divider sx={{ my: 2.5 }} />

                <Box sx={{ mb: 3 }}>
                  <Box
                    component="img"
                    src={getImageUrl(course.thumbnail)}
                    alt={course.title}
                    sx={{
                      width: "100%",
                      height: 280,
                      objectFit: "cover",
                      borderRadius: 2.5,
                      mb: 2.5,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    lineHeight={1.3}
                  >
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    by {course.instructor}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Stack spacing={1.8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Course Price
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ${course.price}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Tax
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      $0.00
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      Total
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      color="primary.main"
                    >
                      ${course.price}
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    mt: 4,
                    p: 2.5,
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(99,102,241,0.08)",
                    borderRadius: 3,
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.15)"}`,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Lock sx={{ fontSize: 22, color: "success.main" }} />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.secondary"
                    >
                      Secure payment • Powered by Stripe
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ borderRadius: 3, p: 4 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <CreditCard sx={{ fontSize: 28, color: "primary.main" }} />
                <Typography variant="h5" fontWeight={700}>
                  Payment Details
                </Typography>
              </Stack>

              <form onSubmit={handlePayment}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      disabled={processing}
                      inputProps={{ maxLength: 19 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      name="cardName"
                      placeholder="John Doe"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      disabled={processing}
                      inputProps={{ maxLength: 5 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      placeholder="123"
                      type="password"
                      value={paymentData.cvv}
                      onChange={handleInputChange}
                      disabled={processing}
                      inputProps={{ maxLength: 4 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={processing}
                      sx={{
                        py: 1.8,
                        borderRadius: 3,
                        background: isDark
                          ? "linear-gradient(45deg, #8b5cf6, #6366f1)"
                          : "linear-gradient(45deg, #6366f1, #a855f7)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        transition: "0.3s",
                        boxShadow: "0 10px 30px rgba(99,102,241,0.3)",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 15px 35px rgba(99,102,241,0.4)",
                        },
                      }}
                    >
                      {processing ? (
                        <>
                          <CircularProgress
                            size={24}
                            sx={{ mr: 2 }}
                            color="inherit"
                          />
                          Processing Payment...
                        </>
                      ) : (
                        `Pay $${course.price}`
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  This is a demo payment. No real charges will be made.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Error Modal */}
      <Dialog
        open={errorModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setErrorModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "error.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ErrorOutline sx={{ fontSize: 48, color: "error.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="error.main">
            Payment Error
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check your information and try again.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={() => setErrorModalOpen(false)}
            variant="contained"
            color="error"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={successModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleSuccessClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "success.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <CheckCircleOutline sx={{ fontSize: 48, color: "success.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Payment Successful!
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Congratulations! You've successfully enrolled in
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You will be redirected to your dashboard to start learning.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={handleSuccessClose}
            variant="contained"
            color="success"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Checkout;  