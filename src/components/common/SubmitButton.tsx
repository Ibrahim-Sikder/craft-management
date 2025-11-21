// components/common/SubmitButton.tsx
import { Button, styled, } from "@mui/material";
const StyledSubmitButton = styled(Button)(({ theme }) => ({
    borderRadius: 30,
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: 600,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
    '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
}))

type IdProps = {
    id?: string | null
}

export function SubmitButton({ id }: IdProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "1rem",
            }}
        >
            <StyledSubmitButton
                variant="contained"
                size="large"
                type="submit"
            >
                {id ? 'Update Report' : ' Submit Report'}
            </StyledSubmitButton>
        </div>
    )
}