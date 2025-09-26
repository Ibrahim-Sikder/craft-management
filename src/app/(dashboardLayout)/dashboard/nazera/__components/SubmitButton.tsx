import { Box, Button } from "@mui/material"

interface SubmitButtonProps {
  isLoading: boolean
}

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', '@media print': { display: 'none' } }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={isLoading}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}
      >
        {isLoading ? 'Submitting...' : 'Submit Report'}
      </Button>
    </Box>
  )
}

export default SubmitButton