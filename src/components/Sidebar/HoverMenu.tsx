/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popper, Grow, Paper } from "@mui/material";
import { renderPopoverItems } from "./NavigationList";

export const HoverMenu = ({ anchorEl, isOpen, items, onEnter, onLeave, onNavigate }: any) => {
  if (!anchorEl) return null;
  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement="right-start"
      transition
      disablePortal
      modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      sx={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} timeout={200}>
          <Paper
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            sx={{
              minWidth: 240,
              maxHeight: 400,
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            {renderPopoverItems(items, onNavigate)}
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};