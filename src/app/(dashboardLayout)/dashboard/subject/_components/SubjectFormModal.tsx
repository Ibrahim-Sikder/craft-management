/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MenuBook as MenuBookIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Button, Grid, Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import CraftForm from "@/components/Forms/Form";
import CraftSelect from "@/components/Forms/Select";
import CraftInputWithIcon from "@/components/Forms/inputWithIcon";

import { paper } from "@/options";
import CraftModal from "@/components/Shared/Modal";

type TSubjectFormModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editingSubject: any | null;
  onSubmit: (data: FieldValues) => Promise<void>;
  onClose: () => void;
};

export default function SubjectFormModal({
  open,
  setOpen,
  editingSubject,
  onSubmit,
  onClose,
}: TSubjectFormModalProps) {
  const defaultValues = {
    name: editingSubject?.name || "",
    paper: editingSubject?.paper || "",
  };

  useEffect(() => {
    if (!open) {
    }
  }, [open, editingSubject]);

  return (
    <CraftModal
      open={open}
      setOpen={setOpen}
      title={editingSubject ? "Update Subject" : "Add New Subject"}
      size="md"
      onClose={onClose}
    >
      <CraftForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Card elevation={0} sx={{ boxShadow: "none" }}>
          <CardContent sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CraftInputWithIcon
                  name="name"
                  label="Subject Name"
                  placeholder="Write Subject Name"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <MenuBookIcon sx={{ color: "primary.main", mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CraftSelect
                  size="medium"
                  name="paper"
                  label="Paper"
                  items={paper}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type="submit"
                  sx={{
                    bgcolor: "#6366f1",
                    borderRadius: "12px",
                    boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.25)",
                    px: 4,
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#4f46e5",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 10px 25px rgba(99, 102, 241, 0.35)",
                    },
                  }}
                >
                  {editingSubject ? "Update Subject" : "Save Subject"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CraftForm>
    </CraftModal>
  );
}
