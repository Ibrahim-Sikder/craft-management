"use client";

import uploadFile from "@/helpers/uploadFile";
import BackupIcon from "@mui/icons-material/Backup";
import { Box, SxProps, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type INTFileUploaderProps = {
  name: string;
  sx: SxProps;
  uploadedFile: string;
  setUploadedFile: (file: string) => void;
  upload_file?: string;
};

const DocUploader = ({
  name,
  sx,
  setUploadedFile,
  uploadedFile,
  upload_file,
}: INTFileUploaderProps) => {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file);
      const uploadResponse = await uploadFile(file);
      setUploadedFile(uploadResponse?.secure_url);
      setLoading(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({  }) => (
        <Box
          sx={{
            padding: "20px",
            borderRadius: "8px",
            border: "1px dashed #ddd",
            width: {
              lg: "300px",
              xs: "200px",
            },
            textAlign: "center",
            margin: "0 auto",
            marginTop: {
              lg: "25px",
              sm: "0px",
            },
          }}
        >
          <Box sx={sx}>
            <input
              type="file"
              id="files"
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf"
            />
            <label
              htmlFor="files"
              className="cursor-pointer py-2 rounded-md shadow-[rgba(0, 0, 0, 0.1) 0px 1px 2px 0px]"
              style={{ display: uploadedFile ? "none" : "block" }}
            >
              {!upload_file && !loading && (
                <>
                  <BackupIcon
                    sx={{
                      mr: 2,
                      color: "#111",
                      fontSize: 60,
                      background: "#E8EDFF",
                      padding: "10px",
                      borderRadius: "100%",
                    }}
                  />

                  <Typography component="h2">
                    Drag & Drop or Choose File to Upload Your Documents
                  </Typography>
                </>
              )}
            </label>
            {loading ? (
              <Typography
                component="h2"
                width={300}
                height={200}
                className="flex items-center justify-center"
              >
                Uploading...
              </Typography>
            ) : (
              <>
                {(uploadedFile || upload_file) && (
                  <Box mt={2}>
                    <Box mt={2}>
                      <iframe
                        src={uploadedFile || upload_file}
                        width="100%"
                        height="100%"
                        title="Uploaded Document"
                        className=" overflow-hidden"
                      />
                    </Box>
                  </Box>
                )}
              </>
            )}
            {(uploadedFile || upload_file) && (
              <Box mt={2}>
                <label
                  htmlFor="files"
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    background: "#059065",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Upload Another
                </label>
              </Box>
            )}
          </Box>
        </Box>
      )}
    />
  );
};

export default DocUploader;
