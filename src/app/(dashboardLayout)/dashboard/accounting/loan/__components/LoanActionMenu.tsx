/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoanActionMenu.tsx
import { useState } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material"
import { GridDeleteIcon, GridMoreVertIcon } from "@mui/x-data-grid"
import { EditNotifications, History, Payment, TransferWithinAStation } from "@mui/icons-material"


interface LoanActionMenuProps {
  loan: any
  onEdit: () => void
  onDelete: (id: string) => void
  onAddRepayment: () => void
  onTransfer: () => void
  onViewAmortization: () => void
  onViewHistory: () => void
}

const LoanActionMenu = ({
  loan,
  onEdit,
  onDelete,
  onAddRepayment,
  onTransfer,
  onViewAmortization,
  onViewHistory
}: LoanActionMenuProps) => {
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
        sx={{ color: "#6B7280", "&:hover": { color: "#EC4899" } }}
      >
        <GridMoreVertIcon fontSize="small" />
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
            <EditNotifications fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Loan</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAction(onAddRepayment)}>
          <ListItemIcon>
            <Payment fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Payment</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAction(onTransfer)}>
          <ListItemIcon>
            <TransferWithinAStation fontSize="small" />
          </ListItemIcon>
          <ListItemText>Transfer Loan</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAction(onViewAmortization)}>
          <ListItemIcon>
            {/* <Amortization fontSize="small" /> */}
          </ListItemIcon>
          <ListItemText>View Amortization</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleAction(onViewHistory)}>
          <ListItemIcon>
            <History fontSize="small" />
          </ListItemIcon>
          <ListItemText>Payment History</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => handleAction(() => onDelete(loan._id))} sx={{ color: "#EF4444" }}>
          <ListItemIcon sx={{ color: "#EF4444" }}>
            <GridDeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Loan</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default LoanActionMenu