/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Card, Box, Typography, Button, CircularProgress } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";
import uploadFile from "@/helpers/uploadFile"

type FileUploadWithIconProps = {
  name: string;
  label: string;
};

const FileUploadWithIcon: React.FC<FileUploadWithIconProps> = ({ name, label }) => {
  const { control, setValue, watch } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const imageUrl = watch(name);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (fileUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const uploaded = await uploadFile(file);
      if (uploaded?.secure_url) {
        const url = uploaded.secure_url;
        onChange(url);
        setValue(name, url, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <Card
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0.12)",
            bgcolor: "rgba(0,0,0,0.02)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Upload color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">{label}</Typography>
          </Box>

          <input
            accept="image/*"
            id={`image-upload-${name}`}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, onChange)}
          />

          <label htmlFor={`image-upload-${name}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<Upload />}
              sx={{ borderRadius: 100, px: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Choose File"}
            </Button>
            {imageUrl && (
              <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
                Uploaded
              </Typography>
            )}
          </label>

          {imageUrl && (
            <Box sx={{ mt: 2 }}>
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ width: "120px", height: "120px", borderRadius: 8, objectFit: "cover" }}
              />
            </Box>
          )}

          {error && (
            <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
              {error}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Upload a clear photo (JPEG or PNG, max 2MB)
          </Typography>
        </Card>
      )}
    />
  );
};

export default FileUploadWithIcon;
