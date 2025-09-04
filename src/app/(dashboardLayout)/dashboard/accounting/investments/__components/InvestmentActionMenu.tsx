/* eslint-disable @typescript-eslint/no-explicit-any */
// components/InvestmentActionMenu.tsx
import { useState } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material"
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon, TrendingUp as TrendingUpIcon, Close as CloseIcon, Analytics as AnalyticsIcon } from "@mui/icons-material"

interface InvestmentActionMenuProps {
  investment: any
  onEdit: () => void
  onDelete: () => void
  onAddReturn: () => void
  onCloseInvestment: () => void
  onViewPerformance: () => void
}

const InvestmentActionMenu = ({  
  onEdit, 
  onDelete, 
  onAddReturn, 
  onCloseInvestment, 
  onViewPerformance 
}: InvestmentActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAction = (action: () => void) => {
    action()
    handleClose()
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: "#6B7280", "&:hover": { color: "#F59E0B" } }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => handleAction(onEdit)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Investment</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => handleAction(onAddReturn)}>
          <ListItemIcon>
            <TrendingUpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Return</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => handleAction(onCloseInvestment)}>
          <ListItemIcon>
            <CloseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Close Investment</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => handleAction(onViewPerformance)}>
          <ListItemIcon>
            <AnalyticsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Performance</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={() => handleAction(onDelete)} sx={{ color: "#EF4444" }}>
          <ListItemIcon sx={{ color: "#EF4444" }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Investment</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default InvestmentActionMenu