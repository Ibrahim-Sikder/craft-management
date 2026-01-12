import { Paper, Typography, useTheme } from '@mui/material'
import React from 'react'


type TitleProps = {
    title: string
}
export const HeaderSection = ({ title }: TitleProps) => {
    const theme = useTheme()
    return (
        <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff" }}>
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: theme.palette.primary.main,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
            >
                ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                sx={{
                    mb: 3,
                    color: theme.palette.text.secondary,
                    fontStyle: "italic",
                }}
            >
                {title}
            </Typography>
        </Paper>

    )
}

export default HeaderSection