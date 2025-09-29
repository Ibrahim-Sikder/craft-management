/* eslint-disable @typescript-eslint/no-unused-vars */
import { alpha, AppBar, Card, Chip, Fab, styled, Table } from "@mui/material"

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}))

export const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: 64,
  height: 64,
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  },
}))

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: 16,
  margin: '0 16px',
  marginTop: 16,
}))

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  height: 28,
  borderRadius: 14,
  '& .MuiChip-label': {
    px: 1.5,
  },
}))

export const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderColor: alpha(theme.palette.divider, 0.5),
    padding: '12px 16px',
  },
  '& .MuiTableHead-root': {
    background: alpha(theme.palette.primary.main, 0.05),
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
}))

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B']

