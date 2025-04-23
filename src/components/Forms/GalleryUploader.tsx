import uploadFile from "@/helpers/uploadFile";
import { PermMedia } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type INTFileUploaderProps = {
  name: string;
  imageUrls: string[]; 
  setImageUrls: (images: string[]) => void;
  label: string;
  onClick?: () => void;
};

const GalleryUploader = ({ name, setImageUrls, imageUrls = [], label, onClick }: INTFileUploaderProps) => {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const uploadedUrls: string[] = [...imageUrls];

    try {
      for (let i = 0; i < files.length; i++) {
        const uploadPhoto = await uploadFile(files[i]);
        if (uploadPhoto?.secure_url) {
          uploadedUrls.push(uploadPhoto.secure_url);
        }
      }
      setImageUrls(uploadedUrls); 
      setValue(name, uploadedUrls); 
    } catch (error) {
      console.error("File upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            height: 'auto',
            borderRadius: "10px",
            textAlign: "center",
            margin: '0 auto',
            border: '2px dashed #ddd',
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              background: "#F9FAFB",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
              width: "250px",
              height: '150px',
              borderRadius: "15px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              flexDirection: 'column',
              margin: '15px auto',
            }}
            onClick={onClick}
          >
            <input
              type="file"
              accept="image/*"
              multiple 
              style={{ display: "none" }}
              onChange={handleFileChange} 
            />
            {!imageUrls.length ? (
              <>
                <PermMedia
                  sx={{
                    color: "#111",
                    fontSize: 70,
                    background: "#E8EDFF",
                    borderRadius: "100%",
                  }}
                />
                <Typography component="p" fontSize="11px">
                  {loading ? "Loading..." : label}
                </Typography>
              </>
            ) : null}
          </Box>

       
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: 'center' }}>
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Uploaded Image ${index + 1}`}
                width={110}
                height={110}
                style={{ borderRadius: "100%", objectFit: "cover" }}
              />
            ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default GalleryUploader;
