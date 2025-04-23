import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";
// import Image from "next/image";
// import uploadFile from "@/helpers/uploadFile";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
  imageUrl: string;
  setImageUrl: (image: string) => void;
};

export default function CraftFileUploadButton({
  name,
  label,
  sx,
  // setImageUrl
}: TProps) {
  const { control } = useFormContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setLoading(true);

    try {
      // const uploadPhoto = await uploadFile(file);
      // setImageUrl(uploadPhoto?.secure_url); 
    // } catch () {
    //   setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange,  ...field } }) => {
        return (
          <>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {loading ? (
                <>{label || "Uploading..."}</>
              ) : (
                <>{label || "Upload File"}</>
              )}

              <Input
                {...field}
                type="file"
                onChange={(e) => {
                  const file =
                    (e.target as HTMLInputElement).files?.[0] || null;
                  onChange(file);
                  handleFileChange(file);
                }}
                style={{ display: "none" }}
              />
            </Button>
          </>
        );
      }}
    />
  );
}
