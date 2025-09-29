// components/common/SubmitButton.tsx
import { Button, Box } from "@mui/material";

export function SubmitButton() {
  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        Submit Report
      </Button>
    </Box>
  );
}