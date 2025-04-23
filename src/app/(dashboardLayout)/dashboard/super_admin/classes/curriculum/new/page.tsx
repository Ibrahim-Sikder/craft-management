/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Divider,
    Card,
    CardContent,
    IconButton,
    Snackbar,
    Alert,
    Tooltip,
    Zoom,
    Fade,
    Chip,
    Avatar,
    LinearProgress,
    Backdrop,
    CircularProgress,
    useTheme,
    useMediaQuery,
    Collapse,
} from "@mui/material"
import {
    Save as SaveIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    Check as CheckIcon,
    Info as InfoIcon,
    School as SchoolIcon,
    Book as BookIcon,
    EmojiEvents as EmojiEventsIcon,
    Preview as PreviewIcon,
    Lightbulb as LightbulbIcon,
    Help as HelpIcon,
    Bookmark as BookmarkIcon,
    BookmarkBorder as BookmarkBorderIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
} from "@mui/icons-material"
import Link from "next/link"

export default function NewCurriculum() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [activeStep, setActiveStep] = useState(0)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [showTips, setShowTips] = useState(true)
    const [favorite, setFavorite] = useState(false)
    const [importance, setImportance] = useState(3)
    const [progress, setProgress] = useState(0)
    const [curriculumData, setCurriculumData] = useState({
        name: "",
        code: "",
        description: "",
        gradeLevel: "",
        academicYear: "",
        department: "",
        subjects: [{ name: "", hours: "", description: "", color: getRandomColor() }],
        outcomes: [""],
        status: "active",
    })

    // Generate random pastel color for subject cards
    function getRandomColor() {
        const colors = [
            "#FFD3B6", // Peach
            "#DCEDC8", // Light Green
            "#D1C4E9", // Lavender
            "#B3E5FC", // Light Blue
            "#FFECB3", // Light Yellow
            "#F8BBD0", // Light Pink
            "#C8E6C9", // Mint
            "#B2DFDB", // Teal
            "#BBDEFB", // Sky Blue
            "#E1BEE7", // Light Purple
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    useEffect(() => {
        // Calculate progress based on filled fields
        const calculateProgress = () => {
            let filledFields = 0
            let totalFields = 0

            // Basic info fields
            const basicInfoFields = ["name", "code", "description", "gradeLevel", "academicYear", "department"]
            basicInfoFields.forEach((field) => {
                totalFields++
                if (curriculumData[field as keyof typeof curriculumData]) filledFields++
            })

            // Subject fields
            curriculumData.subjects.forEach((subject) => {
                Object.keys(subject).forEach((key) => {
                    if (key !== "color") {
                        totalFields++
                        if (subject[key as keyof typeof subject]) filledFields++
                    }
                })
            })

            // Outcome fields
            curriculumData.outcomes.forEach((outcome) => {
                totalFields++
                if (outcome) filledFields++
            })

            return Math.round((filledFields / totalFields) * 100)
        }

        setProgress(calculateProgress())
    }, [curriculumData])

    const gradeLevels = [
        "Kindergarten",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
    ]

    const departments = ["Science", "Arts", "Commerce", "General Education", "Special Education", "Technical"]

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setCurriculumData({
            ...curriculumData,
            [name]: value,
        })
    }

    const handleSubjectChange = (index: number, field: any, value: any) => {
        const updatedSubjects = [...curriculumData.subjects]
        updatedSubjects[index] = {
            ...updatedSubjects[index],
            [field]: value,
        }
        setCurriculumData({
            ...curriculumData,
            subjects: updatedSubjects,
        })
    }

    const addSubject = () => {
        setCurriculumData({
            ...curriculumData,
            subjects: [...curriculumData.subjects, { name: "", hours: "", description: "", color: getRandomColor() }],
        })
    }

    const removeSubject = (index: number) => {
        const updatedSubjects = [...curriculumData.subjects]
        updatedSubjects.splice(index, 1)
        setCurriculumData({
            ...curriculumData,
            subjects: updatedSubjects,
        })
    }

    const handleOutcomeChange = (index: number, value: any) => {
        const updatedOutcomes = [...curriculumData.outcomes]
        updatedOutcomes[index] = value
        setCurriculumData({
            ...curriculumData,
            outcomes: updatedOutcomes,
        })
    }

    const addOutcome = () => {
        setCurriculumData({
            ...curriculumData,
            outcomes: [...curriculumData.outcomes, ""],
        })
    }

    const removeOutcome = (index: number) => {
        const updatedOutcomes = [...curriculumData.outcomes]
        updatedOutcomes.splice(index, 1)
        setCurriculumData({
            ...curriculumData,
            outcomes: updatedOutcomes,
        })
    }

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1)
        window.scrollTo(0, 0)
    }

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1)
        window.scrollTo(0, 0)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setSaving(true)

        // Simulate API call
        setTimeout(() => {
            setSaving(false)
            setSnackbarOpen(true)
            // Redirect to list page after successful submission
            // router.push('/curriculum/list')
        }, 2000)
    }

    const steps = [
        {
            label: "Basic Information",
            icon: <SchoolIcon />,
            description: "Enter the fundamental details about your curriculum",
        },
        {
            label: "Subjects",
            icon: <BookIcon />,
            description: "Add all subjects that will be taught in this curriculum",
        },
        {
            label: "Learning Outcomes",
            icon: <EmojiEventsIcon />,
            description: "Define what students will achieve through this curriculum",
        },
        {
            label: "Review",
            icon: <PreviewIcon />,
            description: "Review all information before finalizing",
        },
    ]

    const renderStepIcon = (index: number) => {
        return (
            <Avatar
                sx={{
                    bgcolor: activeStep >= index ? "primary.main" : "grey.300",
                    color: activeStep >= index ? "white" : "grey.700",
                    width: 40,
                    height: 40,
                    transition: "all 0.3s ease",
                    transform: activeStep === index ? "scale(1.1)" : "scale(1)",
                    boxShadow: activeStep === index ? "0 4px 10px rgba(0,0,0,0.15)" : "none",
                }}
            >
                {steps[index].icon}
            </Avatar>
        )
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 4,
                    background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)",
                    boxShadow: "0 8px 32px rgba(77, 101, 217, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative elements */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
                        zIndex: 0,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        bottom: -30,
                        left: -30,
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
                        zIndex: 0,
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Link href="/curriculum/list" passHref>
                                <IconButton
                                    color="primary"
                                    sx={{
                                        mr: 2,
                                        bgcolor: "rgba(25,118,210,0.1)",
                                        "&:hover": {
                                            bgcolor: "rgba(25,118,210,0.2)",
                                        },
                                    }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </Link>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Create New Curriculum
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
                                <IconButton onClick={() => setFavorite(!favorite)} color={favorite ? "warning" : "default"}>
                                    {favorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                            </Tooltip>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IconButton
                                        key={star}
                                        size="small"
                                        onClick={() => setImportance(star)}
                                        color={importance >= star ? "warning" : "default"}
                                    >
                                        {importance >= star ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                                    </IconButton>
                                ))}
                            </Box>

                            <Tooltip title={showTips ? "Hide tips" : "Show tips"}>
                                <IconButton onClick={() => setShowTips(!showTips)} color={showTips ? "primary" : "default"}>
                                    <LightbulbIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Collapse in={showTips}>
                        <Card
                            variant="outlined"
                            sx={{
                                mb: 4,
                                bgcolor: "rgba(25,118,210,0.05)",
                                borderColor: "primary.light",
                                borderRadius: 3,
                            }}
                        >
                            <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                <InfoIcon color="primary" sx={{ mt: 0.5 }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="medium" color="primary.dark">
                                        Tips for Creating an Effective Curriculum
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {activeStep === 0 &&
                                            "Start with clear objectives and ensure your curriculum aligns with educational standards. A well-structured curriculum provides a roadmap for both teachers and students."}
                                        {activeStep === 1 &&
                                            "Balance your subjects carefully. Consider the time allocation for each subject based on its complexity and importance. Include both core and supplementary subjects."}
                                        {activeStep === 2 &&
                                            "Learning outcomes should be specific, measurable, achievable, relevant, and time-bound (SMART). They should clearly state what students will know or be able to do."}
                                        {activeStep === 3 &&
                                            "Review all details carefully before submission. Check for consistency across subjects and ensure learning outcomes align with the curriculum's overall goals."}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Collapse>

                    <Box sx={{ mb: 4 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: "rgba(0,0,0,0.05)",
                                "& .MuiLinearProgress-bar": {
                                    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                                },
                            }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Completion Progress
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {progress}%
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                        {steps.map((step, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    position: "relative",
                                    width: { xs: "22%", md: "22%" },
                                }}
                            >
                                <Box
                                    onClick={() => setActiveStep(index)}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                        },
                                    }}
                                >
                                    {renderStepIcon(index)}
                                </Box>

                                <Typography
                                    variant="body2"
                                    align="center"
                                    sx={{
                                        mt: 1,
                                        fontWeight: activeStep === index ? "bold" : "normal",
                                        color: activeStep === index ? "primary.main" : "text.secondary",
                                        display: { xs: "none", sm: "block" },
                                    }}
                                >
                                    {step.label}
                                </Typography>

                                {index < steps.length - 1 && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 20,
                                            right: { xs: "-40%", md: "-40%" },
                                            width: { xs: "80%", md: "80%" },
                                            height: 2,
                                            bgcolor: activeStep > index ? "primary.main" : "grey.300",
                                            zIndex: -1,
                                            display: { xs: "none", sm: "block" },
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <form onSubmit={handleSubmit}>
                        <Fade in={activeStep === 0} timeout={500}>
                            <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        mb: 3,
                                        color: "primary.dark",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <SchoolIcon /> Basic Information
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Curriculum Name"
                                            name="name"
                                            value={curriculumData.name}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                            }}
                                            helperText="Enter a descriptive name for your curriculum"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Curriculum Code"
                                            name="code"
                                            value={curriculumData.code}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                            }}
                                            helperText="A unique identifier for this curriculum (e.g., SCI-2023)"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={curriculumData.description}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            margin="normal"
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                            }}
                                            helperText="Provide a comprehensive overview of this curriculum"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Grade Level</InputLabel>
                                            <Select
                                                name="gradeLevel"
                                                value={curriculumData.gradeLevel}
                                                onChange={handleChange}
                                                label="Grade Level"
                                                required
                                                sx={{ borderRadius: 2 }}
                                            >
                                                {gradeLevels.map((grade) => (
                                                    <MenuItem key={grade} value={grade}>
                                                        {grade}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Academic Year"
                                            name="academicYear"
                                            value={curriculumData.academicYear}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                            }}
                                            helperText="The academic year this curriculum applies to"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Department</InputLabel>
                                            <Select
                                                name="department"
                                                value={curriculumData.department}
                                                onChange={handleChange}
                                                label="Department"
                                                required
                                                sx={{ borderRadius: 2 }}
                                            >
                                                {departments.map((dept) => (
                                                    <MenuItem key={dept} value={dept}>
                                                        {dept}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Fade>

                        <Fade in={activeStep === 1} timeout={500}>
                            <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        mb: 3,
                                        color: "primary.dark",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <BookIcon /> Curriculum Subjects
                                </Typography>

                                <Grid container spacing={3}>
                                    {curriculumData.subjects.map((subject, index) => (
                                        <Zoom key={index} in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                            <Grid item xs={12} md={6}>
                                                <Card
                                                    variant="outlined"
                                                    sx={{
                                                        mb: 2,
                                                        borderRadius: 3,
                                                        position: "relative",
                                                        overflow: "hidden",
                                                        transition: "all 0.3s ease",
                                                        "&:hover": {
                                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                                            transform: "translateY(-5px)",
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: 8,
                                                            bgcolor: subject.color,
                                                        }}
                                                    />
                                                    <CardContent sx={{ pt: 3 }}>
                                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                                            <Typography variant="subtitle1" fontWeight="bold">
                                                                Subject {index + 1}
                                                            </Typography>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => removeSubject(index)}
                                                                disabled={curriculumData.subjects.length === 1}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: "rgba(211,47,47,0.1)",
                                                                    "&:hover": {
                                                                        bgcolor: "rgba(211,47,47,0.2)",
                                                                    },
                                                                }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Subject Name"
                                                                    value={subject.name}
                                                                    onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                                                                    required
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        sx: { borderRadius: 2 },
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Hours"
                                                                    type="number"
                                                                    value={subject.hours}
                                                                    onChange={(e) => handleSubjectChange(index, "hours", e.target.value)}
                                                                    required
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        sx: { borderRadius: 2 },
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={8}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Description"
                                                                    value={subject.description}
                                                                    onChange={(e) => handleSubjectChange(index, "description", e.target.value)}
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        sx: { borderRadius: 2 },
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Zoom>
                                    ))}
                                </Grid>

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={addSubject}
                                    sx={{
                                        mt: 2,
                                        borderRadius: 2,
                                        borderWidth: 2,
                                        "&:hover": {
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    Add Subject
                                </Button>
                            </Box>
                        </Fade>

                        <Fade in={activeStep === 2} timeout={500}>
                            <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        mb: 3,
                                        color: "primary.dark",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <EmojiEventsIcon /> Learning Outcomes
                                </Typography>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        mb: 4,
                                        p: 2,
                                        bgcolor: "rgba(25,118,210,0.05)",
                                        borderColor: "primary.light",
                                        borderRadius: 3,
                                    }}
                                >
                                    <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                        <HelpIcon color="primary" sx={{ mt: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Learning outcomes describe what students should know, understand, and be able to do after
                                            completing this curriculum. Use specific, measurable verbs like "analyze," "evaluate," or "create"
                                            rather than vague terms like "understand" or "know."
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {curriculumData.outcomes.map((outcome, index) => (
                                    <Zoom key={index} in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                mb: 2,
                                                borderRadius: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={11}>
                                                        <TextField
                                                            fullWidth
                                                            label={`Learning Outcome ${index + 1}`}
                                                            value={outcome}
                                                            onChange={(e) => handleOutcomeChange(index, e.target.value)}
                                                            required
                                                            variant="outlined"
                                                            InputProps={{
                                                                sx: { borderRadius: 2 },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => removeOutcome(index)}
                                                            disabled={curriculumData.outcomes.length === 1}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: "rgba(211,47,47,0.1)",
                                                                "&:hover": {
                                                                    bgcolor: "rgba(211,47,47,0.2)",
                                                                },
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                ))}

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={addOutcome}
                                    sx={{
                                        mt: 2,
                                        borderRadius: 2,
                                        borderWidth: 2,
                                        "&:hover": {
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    Add Outcome
                                </Button>
                            </Box>
                        </Fade>

                        <Fade in={activeStep === 3} timeout={500}>
                            <Box sx={{ display: activeStep === 3 ? "block" : "none" }}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        mb: 3,
                                        color: "primary.dark",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <PreviewIcon /> Review Curriculum Details
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                height: "100%",
                                                borderRadius: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                                                    Basic Information
                                                </Typography>

                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                                    <Chip label={curriculumData.gradeLevel} size="small" color="primary" variant="outlined" />
                                                    <Chip label={curriculumData.department} size="small" color="secondary" variant="outlined" />
                                                    <Chip label={curriculumData.academicYear} size="small" color="default" variant="outlined" />
                                                </Box>

                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    <strong>Name:</strong> {curriculumData.name || "Not specified"}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                    <strong>Code:</strong> {curriculumData.code || "Not specified"}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 2 }}>
                                                    <strong>Description:</strong>
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 2, p: 1, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 2 }}>
                                                    {curriculumData.description || "No description provided"}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                height: "100%",
                                                borderRadius: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                                                    Subjects ({curriculumData.subjects.length})
                                                </Typography>

                                                <Box sx={{ maxHeight: 200, overflowY: "auto", pr: 1 }}>
                                                    {curriculumData.subjects.map((subject, index) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                mb: 1,
                                                                p: 1.5,
                                                                borderRadius: 2,
                                                                bgcolor: subject.color,
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {subject.name || `Subject ${index + 1}`}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {subject.hours ? `${subject.hours} hours` : "Hours not specified"}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {subject.description || "No description provided"}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                                                    Learning Outcomes
                                                </Typography>

                                                <Grid container spacing={1} sx={{ mt: 1 }}>
                                                    {curriculumData.outcomes.map((outcome, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    gap: 1.5,
                                                                    p: 1.5,
                                                                    borderRadius: 2,
                                                                    bgcolor: "rgba(0,0,0,0.02)",
                                                                }}
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        fontSize: 14,
                                                                        bgcolor: "primary.main",
                                                                    }}
                                                                >
                                                                    {index + 1}
                                                                </Avatar>
                                                                <Typography variant="body2">{outcome || "Outcome not specified"}</Typography>
                                                            </Box>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 3,
                                                bgcolor: "rgba(25,118,210,0.05)",
                                                borderColor: "primary.light",
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                                                    Curriculum Status
                                                </Typography>

                                                <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        name="status"
                                                        value={curriculumData.status}
                                                        onChange={handleChange}
                                                        label="Status"
                                                        sx={{ borderRadius: 2 }}
                                                    >
                                                        <MenuItem value="active">
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <Chip label="Active" size="small" color="success" sx={{ borderRadius: 1 }} />
                                                                <Typography>Ready for implementation</Typography>
                                                            </Box>
                                                        </MenuItem>
                                                        <MenuItem value="draft">
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <Chip label="Draft" size="small" color="warning" sx={{ borderRadius: 1 }} />
                                                                <Typography>Still in development</Typography>
                                                            </Box>
                                                        </MenuItem>
                                                        <MenuItem value="archived">
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <Chip label="Archived" size="small" color="default" sx={{ borderRadius: 1 }} />
                                                                <Typography>No longer in use</Typography>
                                                            </Box>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Fade>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    borderRadius: 2,
                                    borderWidth: 2,
                                    "&:hover": {
                                        borderWidth: 2,
                                    },
                                }}
                            >
                                Back
                            </Button>

                            <Box>
                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        size="large"
                                        disabled={saving}
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                                            "&:hover": {
                                                boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                                            },
                                        }}
                                    >
                                        {saving ? "Saving..." : "Save Curriculum"}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        color="primary"
                                        endIcon={<CheckIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                                            "&:hover": {
                                                boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
                                            },
                                        }}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Paper>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
                    Curriculum saved successfully!
                </Alert>
            </Snackbar>

            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={saving}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}
