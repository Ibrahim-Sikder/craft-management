/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import { toast } from "react-hot-toast";
import {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/Input";
import CraftSelect from "@/components/Forms/Select";

import type { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function UserForm({ id }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: singleUser, isLoading: singleUserLoading } =
    useGetSingleUserQuery({ id });

  const defaultValues = {
    name: singleUser?.data?.name || "",
    email: singleUser?.data?.email || "",
    role: singleUser?.data?.role || "user",
    status: singleUser?.data?.status || "active",
    password: "",
  };

  const handleSubmit = async (data: FieldValues) => {
    try {
      if (!id) {
        await createUser({ ...data }).unwrap();
        toast.success("User created successfully!");
        router.push("/dashboard/user-management");
      } else {
        const updateData = { ...data };
        if (!updateData.password) {
          delete updateData.password;
        }
        await updateUser({ id, data: updateData }).unwrap();
        toast.success("User updated successfully!");
        router.push("/dashboard/user-management");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to process user!",
      );
    }
  };

  if (singleUserLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const isEditMode = !!id;

  return (
    <CraftForm onSubmit={handleSubmit} defaultValues={defaultValues}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Name */}
              <Grid item xs={12}>
                <CraftInput
                  name="name"
                  label="Full Name"
                  placeholder="Enter user's full name"
                  required
                  fullWidth
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <CraftInput
                  name="email"
                  label="Email Address"
                  placeholder="Enter user's email address"
                  required
                  fullWidth
                />
              </Grid>

              {/* Role */}
              <Grid item xs={12}>
                <CraftSelect
                  name="role"
                  label="User Role"
                  items={[
                    "super_admin",
                    "admin",
                    "teacher",
                    "student",
                    "super_visor",
                    "class_teacher",
                    "accountant",
                    "user",
                  ]}
                  fullWidth
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <CraftSelect
                  name="status"
                  label="Account Status"
                  items={["active", "inactive"]}
                  fullWidth
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <CraftInput
                  name="password"
                  label={isEditMode ? "New Password (Optional)" : "Password"}
                  placeholder={
                    isEditMode
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading && <CircularProgress size={20} />}
              >
                {isLoading
                  ? "Processing..."
                  : isEditMode
                    ? "Update User"
                    : "Create User"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </CraftForm>
  );
}
