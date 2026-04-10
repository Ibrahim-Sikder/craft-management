/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/Input";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminPanelSettings,
  Architecture,
  ArrowForward,
  AutoAwesome,
  Celebration,
  Diamond,
  EmojiEvents,
  Grade,
  Handshake,
  Key,
  Login as LoginIcon,
  MenuBook,
  Paid,
  School,
  Security,
  Star,
  TouchApp,
  TrendingUp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import bg from "../assets/img/bg.webp";
import logo from "../assets/img/logo/logo.png";

// Role type definition with superadmin
type UserRole =
  | "superadmin"
  | "admin"
  | "teacher"
  | "accountant"
  | "student"
  | null;

// Demo credentials for each role for Craft International Institute
const demoCredentials = {
  superadmin: {
    email: "",
    password: "",
    displayEmail: "",
    displayPassword: "",
  },
  admin: {
    email: "",
    password: "",
    displayEmail: "",
    displayPassword: "",
  },
  teacher: {
    email: "",
    password: "",
    displayEmail: "",
    displayPassword: "",
  },
  accountant: {
    email: "",
    password: "",
    displayEmail: "",
    displayPassword: "",
  },
  student: {
    email: "",
    password: "",
    displayEmail: "",
    displayPassword: "",
  },
};

// World-class role configuration with DISTINCT VIBRANT COLORS for each role
const roleConfig = {
  superadmin: {
    label: "Super Admin",
    shortLabel: "Super",
    icon: <Diamond sx={{ fontSize: { xs: 36, sm: 44, md: 52, lg: 60 } }} />,
    color: "#FF3366",
    gradient: "linear-gradient(135deg, #FF3366 0%, #FF6B9D 100%)",
    darkGradient: "linear-gradient(135deg, #E91E63 0%, #FF3366 100%)",
    description: "Ultimate System Control",
    badgeColor: "#FF3366",
    glowColor: "rgba(255, 51, 102, 0.5)",
    rank: "💎 Supreme",
    bgImage:
      "radial-gradient(circle at 30% 20%, rgba(255,51,102,0.15), transparent)",
  },
  admin: {
    label: "Admin",
    shortLabel: "Admin",
    icon: (
      <AdminPanelSettings
        sx={{ fontSize: { xs: 36, sm: 44, md: 52, lg: 60 } }}
      />
    ),
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
    darkGradient: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)",
    description: "Full Management Access",
    badgeColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.5)",
    rank: "👑 Leader",
    bgImage:
      "radial-gradient(circle at 70% 30%, rgba(124,58,237,0.12), transparent)",
  },
  teacher: {
    label: "Teacher",
    shortLabel: "Teacher",
    icon: <MenuBook sx={{ fontSize: { xs: 36, sm: 44, md: 52, lg: 60 } }} />,
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)",
    darkGradient: "linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)",
    description: "Education Excellence",
    badgeColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.5)",
    rank: "📖 Mentor",
    bgImage:
      "radial-gradient(circle at 40% 60%, rgba(6,182,212,0.12), transparent)",
  },
  accountant: {
    label: "Accountant",
    shortLabel: "Account",
    icon: <Paid sx={{ fontSize: { xs: 36, sm: 44, md: 52, lg: 60 } }} />,
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    darkGradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
    description: "Financial Management",
    badgeColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
    rank: "💰 Finance",
    bgImage:
      "radial-gradient(circle at 60% 40%, rgba(245,158,11,0.12), transparent)",
  },
  student: {
    label: "Student",
    shortLabel: "Student",
    icon: <Grade sx={{ fontSize: { xs: 36, sm: 44, md: 52, lg: 60 } }} />,
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    darkGradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    description: "Learning Journey",
    badgeColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.5)",
    rank: "🎓 Learner",
    bgImage:
      "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1), transparent)",
  },
};

const loginSchema = z.object({
  credential: z
    .string({
      required_error: "Please enter your email, phone or student ID",
    })
    .min(1, "Credential is required"),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(6, "Password must be at least 6 characters long"),
});

const LoginDashboard = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [hoveredRole, setHoveredRole] = useState<UserRole>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [credentialValue, setCredentialValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      color: string;
    }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const particleColors = [
    "#FF3366",
    "#7C3AED",
    "#06B6D4",
    "#F59E0B",
    "#10B981",
  ];

  useEffect(() => {
    setAnimateCards(true);
    const newParticles = Array.from({ length: isMobile ? 30 : 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 3 : 5) + 2,
      delay: Math.random() * 15,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));
    setParticles(newParticles);
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowLoginForm(true);

    if (role) {
      const creds = demoCredentials[role];
      setCredentialValue(creds.email);
      setPasswordValue(creds.password);
    }

    setTimeout(() => {
      const element = document.getElementById("login-form-section");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: isMobile ? "start" : "center",
        });
      }
    }, 100);
  };

  const handleBackToRoles = () => {
    setShowLoginForm(false);
    setSelectedRole(null);
    setCredentialValue("");
    setPasswordValue("");
    setTimeout(() => {
      const element = document.getElementById("role-section");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleCopyCredentials = (type: "email" | "password") => {
    if (!selectedRole) return;
    const creds = demoCredentials[selectedRole];
    const textToCopy = type === "email" ? creds.email : creds.password;
    navigator.clipboard.writeText(textToCopy);
    toast.success(
      `${type === "email" ? "Email" : "Password"} copied to clipboard!`,
    );
  };

  const handleSubmit = async (data: FieldValues) => {
    if (!selectedRole) {
      toast.error("Please select a role first!");
      return;
    }

    const loginData = {
      ...data,
      role: selectedRole,
    };

    try {
      const res = await login(loginData).unwrap();

      if (res?.success) {
        toast.success(
          res.message ||
            `Welcome to Craft International Institute! Login Successful!`,
        );
        router.push("/dashboard");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "An error occurred during login.";
      toast.error(errorMessage);
    }
  };

  const getCredentialPlaceholder = () => {
    switch (selectedRole) {
      case "superadmin":
        return "superadmin@craft.edu";
      case "admin":
        return "admin@craft.edu or Employee ID";
      case "teacher":
        return "teacher@craft.edu or Teacher ID";
      case "accountant":
        return "accountant@craft.edu or Staff ID";
      case "student":
        return "Student ID, Email or Phone (e.g., student@craft.edu)";
      default:
        return "Email, Phone or Student ID";
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        background: `radial-gradient(ellipse at 20% 30%, #0a0a2a, #000000)`,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Animated Background */}
      <Box>
        <Image
          src={bg}
          alt="Craft International Institute Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.06,
          }}
          quality={100}
          priority
        />
      </Box>

      {/* Animated Grid Pattern */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(79,1,135,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,1,135,0.05) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Floating Particles with different colors */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: "fixed",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            borderRadius: "50%",
            animation: `floatParticle ${15 + particle.delay}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            zIndex: 0,
            opacity: 0.4,
            display: isMobile && particle.size < 3 ? "none" : "block",
          }}
        />
      ))}

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(79,1,135,0.3); }
          50% { box-shadow: 0 0 50px rgba(79,1,135,0.6); }
        }
        @media (max-width: 600px) {
          @keyframes cardFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        }
      `}</style>

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 2, sm: 3, md: 4, lg: 6 },
          px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
        }}
      >
        {!showLoginForm ? (
          <>
            {/* Hero Section - Craft International Institute Branding */}
            <Box
              sx={{
                textAlign: "center",
                mb: { xs: 3, sm: 4, md: 5, lg: 6 },
                perspective: "1000px",
              }}
            >
              <Zoom in timeout={800}>
                <Box
                  sx={{
                    display: "inline-block",
                    transform: isDesktop ? "rotateX(5deg)" : "none",
                    "&:hover": {
                      transform: isDesktop
                        ? "rotateX(0deg) scale(1.02)"
                        : "none",
                      transition: "transform 0.3s",
                    },
                  }}
                >
                  <Image
                    src={logo}
                    alt="Craft International Institute"
                    height={isMobile ? 60 : isTablet ? 80 : 100}
                    width={isMobile ? 180 : isTablet ? 240 : 280}
                    style={{
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Box>
              </Zoom>

              <Fade in timeout={1000}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "4rem",
                    },
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #FFFFFF, #E0D4FF, #4F0187, #9A5AE3, #FFFFFF)",
                    backgroundSize: "300% 300%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mt: { xs: 1, sm: 2 },
                    mb: { xs: 0.5, sm: 1 },
                    animation: "gradientShift 6s ease infinite",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    px: { xs: 1, sm: 0 },
                  }}
                >
                  Craft International Institute
                </Typography>
              </Fade>

              <Fade in timeout={1200}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: {
                      xs: "0.85rem",
                      sm: "1rem",
                      md: "1.2rem",
                      lg: "1.4rem",
                    },
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 500,
                    mb: { xs: 2, sm: 3 },
                    maxWidth: "700px",
                    mx: "auto",
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  Empowering Education Through Innovation & Excellence
                </Typography>
              </Fade>

              <Fade in timeout={1400}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Chip
                    icon={<EmojiEvents sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    label="Best Institute 2025"
                    sx={{
                      bgcolor: "rgba(79,1,135,0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      fontSize: { xs: "0.7rem", sm: "0.85rem" },
                      py: { xs: 1.5, sm: 2.5 },
                      border: "1px solid rgba(79,1,135,0.3)",
                      "&:hover": {
                        bgcolor: "rgba(79,1,135,0.4)",
                        transform: "scale(1.05)",
                        transition: "all 0.3s",
                      },
                    }}
                  />
                  <Chip
                    icon={<TrendingUp sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    label="ISO 21001:2018 Certified"
                    sx={{
                      bgcolor: "rgba(79,1,135,0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      fontSize: { xs: "0.7rem", sm: "0.85rem" },
                      border: "1px solid rgba(79,1,135,0.3)",
                    }}
                  />
                  <Chip
                    icon={<Security sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                    label="ISO 27001 Certified"
                    sx={{
                      bgcolor: "rgba(79,1,135,0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      fontSize: { xs: "0.7rem", sm: "0.85rem" },
                      border: "1px solid rgba(79,1,135,0.3)",
                    }}
                  />
                </Stack>
              </Fade>
            </Box>

            {/* Role Selection Cards - DISTINCT COLORS */}
            <Box id="role-section">
              <Fade in timeout={800}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.8rem",
                      md: "2.2rem",
                      lg: "2.8rem",
                    },
                    textAlign: "center",
                    color: "white",
                    fontWeight: 700,
                    mb: { xs: 3, sm: 4, md: 5 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <AutoAwesome
                    sx={{
                      fontSize: { xs: 20, sm: 28, md: 40 },
                      color: "#4F0187",
                      animation: "glowPulse 2s infinite",
                    }}
                  />
                  Select Your Portal
                  <AutoAwesome
                    sx={{
                      fontSize: { xs: 20, sm: 28, md: 40 },
                      color: "#4F0187",
                      animation: "glowPulse 2s infinite 0.5s",
                    }}
                  />
                </Typography>
              </Fade>

              <Grid
                container
                spacing={{ xs: 1.5, sm: 2, md: 3 }}
                justifyContent="center"
              >
                {(
                  Object.keys(roleConfig) as Array<keyof typeof roleConfig>
                ).map((role, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    lg={2.4}
                    key={role}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Grow in={animateCards} timeout={500 + index * 150}>
                      <Card
                        onClick={() => handleRoleSelect(role)}
                        onMouseEnter={() => setHoveredRole(role)}
                        onMouseLeave={() => setHoveredRole(null)}
                        sx={{
                          cursor: "pointer",
                          width: "100%",
                          maxWidth: { xs: "100%", sm: 280, md: 260, lg: 240 },
                          transition:
                            "all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                          transform:
                            !isMobile && hoveredRole === role
                              ? "translateY(-25px) scale(1.03) rotateY(5deg)"
                              : "translateY(0) scale(1)",
                          background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)`,
                          backdropFilter: "blur(20px)",
                          borderRadius: { xs: 3, sm: 4, md: 5, lg: 6 },
                          border: `2px solid ${alpha(roleConfig[role].color, hoveredRole === role ? 0.8 : 0.4)}`,
                          boxShadow:
                            !isMobile && hoveredRole === role
                              ? `0 30px 50px -20px ${roleConfig[role].glowColor}, inset 0 1px 0 ${alpha(roleConfig[role].color, 0.3)}`
                              : "0 15px 35px -15px rgba(0,0,0,0.3)",
                          position: "relative",
                          overflow: "hidden",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background: roleConfig[role].bgImage,
                            opacity: hoveredRole === role ? 0.5 : 0,
                            transition: "opacity 0.5s",
                          },
                        }}
                      >
                        {/* Animated shine effect */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(90deg, transparent, ${alpha(roleConfig[role].color, 0.2)}, transparent)`,
                            transition: "left 0.6s",
                            "&:hover": { left: "100%" },
                          }}
                        />

                        <CardContent
                          sx={{
                            textAlign: "center",
                            py: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                            px: { xs: 1.5, sm: 2, md: 2.5 },
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {/* Rank Badge with Role Color */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: { xs: 6, sm: 8, md: 12 },
                              right: { xs: 6, sm: 8, md: 12 },
                              background: roleConfig[role].gradient,
                              borderRadius: "25px",
                              px: { xs: 0.8, sm: 1, md: 1.2 },
                              py: { xs: 0.3, sm: 0.4, md: 0.5 },
                              fontSize: {
                                xs: "0.55rem",
                                sm: "0.6rem",
                                md: "0.7rem",
                              },
                              fontWeight: "bold",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Star
                              sx={{ fontSize: { xs: 8, sm: 10, md: 12 } }}
                            />
                            <span
                            // style={{ display: { xs: "none", sm: "inline" } }}
                            >
                              {roleConfig[role].rank}
                            </span>
                            <span
                            // style={{ display: { xs: "inline", sm: "none" } }}
                            >
                              {roleConfig[role].rank.charAt(0)}
                            </span>
                          </Box>

                          {/* Icon with Role Color */}
                          <Box
                            sx={{
                              mb: { xs: 1.5, sm: 2, md: 2.5 },
                              transform:
                                !isMobile && hoveredRole === role
                                  ? "scale(1.15) rotate(8deg)"
                                  : "scale(1)",
                              transition:
                                "transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
                              color: roleConfig[role].color,
                              display: "inline-block",
                              filter: `drop-shadow(0 0 10px ${alpha(roleConfig[role].color, 0.3)})`,
                            }}
                          >
                            {roleConfig[role].icon}
                          </Box>

                          {/* Role Label with Gradient */}
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 800,
                              fontSize: {
                                xs: "0.95rem",
                                sm: "1.1rem",
                                md: "1.3rem",
                                lg: "1.5rem",
                              },
                              background: roleConfig[role].gradient,
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                              mb: 0.5,
                            }}
                          >
                            {roleConfig[role].label}
                          </Typography>

                          {/* Description */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              fontWeight: 500,
                              mb: { xs: 1, sm: 1.5, md: 2 },
                              fontSize: {
                                xs: "0.65rem",
                                sm: "0.7rem",
                                md: "0.8rem",
                              },
                              display: { xs: "none", sm: "block" },
                            }}
                          >
                            {roleConfig[role].description}
                          </Typography>

                          {/* Access Button with Role Color */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5,
                              color: roleConfig[role].color,
                              opacity: hoveredRole === role ? 1 : 0.7,
                              transition: "opacity 0.3s",
                            }}
                          >
                            {isMobile ? (
                              <TouchApp sx={{ fontSize: { xs: 12, sm: 14 } }} />
                            ) : (
                              <Key sx={{ fontSize: { xs: 12, sm: 14 } }} />
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: "0.6rem", sm: "0.65rem" },
                              }}
                            >
                              {isMobile ? "Tap to Access" : "Click to Access"}
                            </Typography>
                            <ArrowForward
                              sx={{ fontSize: { xs: 12, sm: 14 } }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Institute Stats Section */}
            <Box
              sx={{
                mt: { xs: 4, sm: 5, md: 6, lg: 8 },
                pt: { xs: 2, sm: 3, md: 4 },
                borderTop: "1px solid rgba(79,1,135,0.3)",
              }}
            >
              <Fade in timeout={1500}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "rgba(255,255,255,0.6)",
                      mb: { xs: 2, sm: 3, md: 4 },
                      fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" },
                    }}
                  >
                    Craft International Institute By The Numbers
                  </Typography>
                  <Grid
                    container
                    spacing={{ xs: 1.5, sm: 2, md: 3 }}
                    justifyContent="center"
                  >
                    {[
                      {
                        icon: <School />,
                        label: "Students Enrolled",
                        value: "5,000+",
                        color: "#FF3366",
                      },
                      {
                        icon: <MenuBook />,
                        label: "Expert Faculty",
                        value: "250+",
                        color: "#06B6D4",
                      },
                      {
                        icon: <Architecture />,
                        label: "Courses",
                        value: "50+",
                        color: "#7C3AED",
                      },
                      {
                        icon: <Handshake />,
                        label: "Placement Rate",
                        value: "95%",
                        color: "#10B981",
                      },
                      {
                        icon: <Celebration />,
                        label: "Years of Excellence",
                        value: "15+",
                        color: "#F59E0B",
                      },
                    ].map((stat, idx) => (
                      <Grid item xs={6} sm={4} md={2.4} key={idx}>
                        <Box
                          sx={{ textAlign: "center", px: { xs: 0.5, sm: 1 } }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: alpha(stat.color, 0.2),
                              color: stat.color,
                              width: { xs: 45, sm: 55, md: 60 },
                              height: { xs: 45, sm: 55, md: 60 },
                              mx: "auto",
                              mb: { xs: 0.5, sm: 1 },
                            }}
                          >
                            {stat.icon}
                          </Avatar>
                          <Typography
                            variant="h4"
                            sx={{
                              color: "white",
                              fontWeight: 800,
                              fontSize: {
                                xs: "1rem",
                                sm: "1.3rem",
                                md: "1.8rem",
                                lg: "2rem",
                              },
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.6)",
                              fontSize: {
                                xs: "0.65rem",
                                sm: "0.7rem",
                                md: "0.8rem",
                              },
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Box>
          </>
        ) : (
          /* Login Form Section */
          <Fade in={showLoginForm} timeout={600}>
            <Box id="login-form-section">
              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <Button
                  onClick={handleBackToRoles}
                  sx={{
                    color: "white",
                    borderColor: "rgba(79,1,135,0.3)",
                    borderRadius: "30px",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.5, sm: 0.75 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    "&:hover": {
                      borderColor: selectedRole
                        ? roleConfig[selectedRole].color
                        : "#4F0187",
                      bgcolor: selectedRole
                        ? alpha(roleConfig[selectedRole].color, 0.1)
                        : alpha("#4F0187", 0.1),
                      transform: "translateX(-5px)",
                      transition: "all 0.3s",
                    },
                  }}
                  variant="outlined"
                  startIcon={
                    <ArrowForward
                      sx={{
                        transform: "rotate(180deg)",
                        fontSize: { xs: 16, sm: 20 },
                      }}
                    />
                  }
                >
                  Back to Portals
                </Button>
              </Box>

              <Box
                sx={{
                  maxWidth: { xs: "100%", sm: 500, md: 550 },
                  mx: "auto",
                  px: { xs: 0, sm: 1 },
                }}
              >
                <Card
                  sx={{
                    borderRadius: { xs: 3, sm: 4, md: 5, lg: 6 },
                    background: `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)`,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: selectedRole
                      ? `0 30px 60px ${alpha(roleConfig[selectedRole].color, 0.3)}, 0 0 0 2px ${alpha(roleConfig[selectedRole].color, 0.3)}`
                      : "0 30px 60px rgba(0,0,0,0.3)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {/* Animated Gradient Border with Selected Role Color */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: { xs: "4px", sm: "6px", md: "8px" },
                      background: selectedRole
                        ? roleConfig[selectedRole].gradient
                        : "linear-gradient(90deg, #FF3366, #7C3AED, #06B6D4, #F59E0B, #10B981)",
                      backgroundSize: "300% 100%",
                      animation: "gradientShift 3s ease infinite",
                    }}
                  />

                  <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
                    {/* Selected Role Badge */}
                    <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: { xs: 1, sm: 1.5 },
                          px: { xs: 2, sm: 2.5, md: 3 },
                          py: { xs: 0.75, sm: 0.875, md: 1 },
                          borderRadius: "50px",
                          background: selectedRole
                            ? alpha(roleConfig[selectedRole].color, 0.1)
                            : "rgba(0,0,0,0.05)",
                          mb: { xs: 1.5, sm: 2, md: 2.5 },
                          transition: "all 0.3s",
                          border: selectedRole
                            ? `1px solid ${alpha(roleConfig[selectedRole].color, 0.3)}`
                            : "none",
                        }}
                      >
                        {selectedRole && (
                          <Box
                            sx={{
                              color: roleConfig[selectedRole].color,
                              display: "flex",
                            }}
                          >
                            {roleConfig[selectedRole].icon}
                          </Box>
                        )}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: {
                              xs: "0.85rem",
                              sm: "1rem",
                              md: "1.1rem",
                            },
                            color: selectedRole
                              ? roleConfig[selectedRole].color
                              : "text.primary",
                          }}
                        >
                          {selectedRole
                            ? `${roleConfig[selectedRole].label} Portal`
                            : "Select a Portal"}
                        </Typography>
                      </Box>

                      <Image
                        src={logo}
                        alt="Craft International Institute"
                        height={isMobile ? 45 : isTablet ? 55 : 65}
                        width={isMobile ? 140 : isTablet ? 170 : 200}
                        style={{ objectFit: "contain", margin: "0 auto" }}
                      />
                    </Box>

                    <CraftForm
                      onSubmit={handleSubmit}
                      resolver={zodResolver(loginSchema)}
                      defaultValues={{
                        credential: credentialValue,
                        password: passwordValue,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 1.5, sm: 2, md: 2.5 },
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 0.5,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            }}
                          >
                            {selectedRole && roleConfig[selectedRole]?.icon}
                            <span
                              style={{
                                color: selectedRole
                                  ? roleConfig[selectedRole].color
                                  : "#4F0187",
                              }}
                            >
                              Credential (Email / ID / Phone)
                            </span>
                          </Typography>
                          <CraftInput
                            type="text"
                            placeholder={getCredentialPlaceholder()}
                            name="credential"
                            fullWidth
                            size="medium"
                            value={credentialValue}
                            onChange={(e) => setCredentialValue(e.target.value)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                transition: "all 0.3s",
                                "&:hover fieldset": {
                                  borderColor: selectedRole
                                    ? roleConfig[selectedRole].color
                                    : "#4F0187",
                                  borderWidth: 2,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: selectedRole
                                    ? roleConfig[selectedRole].color
                                    : "#4F0187",
                                  borderWidth: 2,
                                  boxShadow: `0 0 0 3px ${alpha(selectedRole ? roleConfig[selectedRole].color : "#4F0187", 0.1)}`,
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 0.5,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            }}
                          >
                            <Security
                              sx={{
                                fontSize: { xs: 14, sm: 16 },
                                color: selectedRole
                                  ? roleConfig[selectedRole].color
                                  : "#4F0187",
                              }}
                            />
                            <span
                              style={{
                                color: selectedRole
                                  ? roleConfig[selectedRole].color
                                  : "#4F0187",
                              }}
                            >
                              Password
                            </span>
                          </Typography>
                          <CraftInput
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            size="medium"
                            placeholder="Enter your password"
                            name="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                    sx={{
                                      color: selectedRole
                                        ? roleConfig[selectedRole].color
                                        : "#4F0187",
                                    }}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff
                                        sx={{ fontSize: { xs: 18, sm: 20 } }}
                                      />
                                    ) : (
                                      <Visibility
                                        sx={{ fontSize: { xs: 18, sm: 20 } }}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                transition: "all 0.3s",
                                "&:hover fieldset": {
                                  borderColor: selectedRole
                                    ? roleConfig[selectedRole].color
                                    : "#4F0187",
                                  borderWidth: 2,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: selectedRole
                                    ? roleConfig[selectedRole].color
                                    : "#4F0187",
                                  borderWidth: 2,
                                  boxShadow: `0 0 0 3px ${alpha(selectedRole ? roleConfig[selectedRole].color : "#4F0187", 0.1)}`,
                                },
                              },
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          <Link
                            href="/forgot-password"
                            style={{
                              fontSize: "0.7rem",
                              color: selectedRole
                                ? roleConfig[selectedRole].color
                                : "#4F0187",
                              textDecoration: "none",
                              fontWeight: 600,
                              transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.textDecoration =
                                "underline";
                              e.currentTarget.style.opacity = "0.8";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.textDecoration = "none";
                              e.currentTarget.style.opacity = "1";
                            }}
                          >
                            Forgot Password?
                          </Link>
                          <Link
                            href="/help"
                            style={{
                              fontSize: "0.7rem",
                              color: "#666",
                              textDecoration: "none",
                              transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = selectedRole
                                ? roleConfig[selectedRole].color
                                : "#4F0187";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#666";
                            }}
                          >
                            Need Help?
                          </Link>
                        </Box>

                        <Button
                          type="submit"
                          disabled={isLoading || !selectedRole}
                          fullWidth
                          sx={{
                            py: { xs: 1.2, sm: 1.4, md: 1.6 },
                            borderRadius: 3,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            fontWeight: 700,
                            textTransform: "none",
                            background: selectedRole
                              ? roleConfig[selectedRole].gradient
                              : "#cccccc",
                            backgroundSize: "200% 100%",
                            color: "white",
                            transition: "all 0.3s",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "0",
                              height: "0",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.3)",
                              transform: "translate(-50%, -50%)",
                              transition: "width 0.6s, height 0.6s",
                            },
                            "&:hover::before": {
                              width: "300px",
                              height: "300px",
                            },
                            "&:hover": {
                              transform: "translateY(-3px)",
                              boxShadow: selectedRole
                                ? `0 8px 25px ${alpha(roleConfig[selectedRole].color, 0.4)}`
                                : "0 8px 25px rgba(0,0,0,0.2)",
                              backgroundSize: "100% 100%",
                            },
                            "&:disabled": {
                              background: "#cccccc",
                            },
                          }}
                        >
                          {isLoading ? (
                            "Authenticating..."
                          ) : (
                            <>
                              <LoginIcon
                                sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }}
                              />
                              Access{" "}
                              {selectedRole
                                ? roleConfig[selectedRole].label
                                : "Your"}{" "}
                              Portal
                              <ArrowForward
                                sx={{ ml: 1, fontSize: { xs: 16, sm: 18 } }}
                              />
                            </>
                          )}
                        </Button>

                        <Typography
                          variant="caption"
                          sx={{
                            textAlign: "center",
                            color: "#4F0187",
                            mt: 1,
                            fontSize: { xs: "0.65rem", sm: "0.7rem" },
                          }}
                        >
                          © {new Date().getFullYear()} Craft International
                          Institute. All rights reserved.
                        </Typography>
                      </Box>
                    </CraftForm>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default LoginDashboard;
