/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material";
import { Add, Delete as DeleteIcon, Image as ImageIcon, InsertDriveFile } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";
import uploadFile from "@/helpers/uploadFile";

type SingleFileUploadControllerProps = {
  name: string;
  label: string;
};

const SingleFileUploadController: React.FC<SingleFileUploadControllerProps> = ({ name, label }) => {
  const { control, setValue, watch } = useFormContext();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUrl: string = watch(name) || "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: string) => void) => {
    const files = e.target.files;
    if (!files?.length) return;

    setLoading(true);

    try {
      const uploaded = await uploadFile(files[0]);
      if (uploaded?.secure_url) {
        onChange(uploaded.secure_url);
        setValue(name, uploaded.secure_url, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }

    setLoading(false);
    e.target.value = "";
  };

  const handleRemoveFile = (onChange: (file: string) => void) => {
    onChange("");
    setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {label}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ borderRadius: 8 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={16} /> : fileUrl ? "Change File" : "Upload File"}
            </Button>
          </Box>

          {!fileUrl ? (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                height: 200,
                border: "1px dashed",
                borderColor: "primary.main",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ImageIcon sx={{ fontSize: 48, color: "primary.main", opacity: 0.7, mb: 1 }} />
              <Typography variant="body1" fontWeight={500} color="primary.main">
                Click to upload
              </Typography>
              <Typography variant="caption" color="text.secondary" mt={0.5}>
                JPG, JPEG, PNG, PDF (Max. 5MB)
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              {fileUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    overflow: "hidden",
                    mr: 2,
                    flexShrink: 0,
                    backgroundImage: `url(${fileUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <InsertDriveFile sx={{ fontSize: 40, color: "primary.main", mr: 2, flexShrink: 0 }} />
              )}

              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Typography variant="body2" fontWeight={500} noWrap>
                  {fileUrl.split("/").pop()}
                </Typography>
              </Box>

              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveFile(onChange)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e, onChange)}
            style={{ display: "none" }}
          />
        </>
      )}
    />
  );
};

export default SingleFileUploadController;
