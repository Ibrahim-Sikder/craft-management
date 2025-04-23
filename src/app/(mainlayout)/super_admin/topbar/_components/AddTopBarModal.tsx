/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback } from "react";
import { Box, Button, IconButton } from "@mui/material";
import GarageModal from "@/components/Shared/Modal";
import Image from "next/image";
import CraftForm from "@/components/Forms/Form";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CraftSelect from "@/components/Forms/Select";
import { Upload, CheckCircle } from "@mui/icons-material"; // Import CheckCircle for the tick mark
import topimg from "../../../../../assets/img/topBar/bg-3.jpg";

export type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FileWithPreview {
  file: File;
  preview: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AddTopBarModal = ({ open, setOpen }: TProps) => {
  const [selectedFiles, setSelectedFiles] = React.useState<FileWithPreview[]>([]);
  const [selectedImageIndices, setSelectedImageIndices] = React.useState<number[]>([]);
  const [value, setValue] = React.useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: any) => {

  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Deselect if already selected
        : [...prev, index] // Select if not already selected
    );
  };

  return (
    <GarageModal
      sx={{ width: "800px", margin: " auto" }}
      open={open}
      setOpen={setOpen}
      title="Add Top Bar"
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Recent" {...a11yProps(0)} />
            <Tab label="New Upload" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="grid grid-cols-2 gap-4">
            {[topimg, topimg, topimg].map((img, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
               
                <Image
                  src={img}
                  alt="img"
                  className="w-full h-[130px]" 
                  width={150} 
                  height={150} 
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0  transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-2 right-2 bg-white rounded-full">
                    <CheckCircle className="text-green-200" />
                  </div>
                </div>

                {/* Tick Mark (Visible if selected) */}
                {selectedImageIndices.includes(index) && (
                  <div className="absolute top-2 right-2 bg-white rounded-full">
                    <CheckCircle className="text-green-500" />
                  </div>
                )}
              </div>
            ))}
            
          </div>
          <div className="mt-4 flex justify-end ">
                <Button type="submit" variant="contained">
                  Upload
                </Button>
              </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box padding="5px 10px 10px 10px">
            <CraftForm onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="flex gap-4 justify-end items-center text-center">
                  <div className="lg:flex gap-4 items-center text-center">
                    <Button variant="contained">+ Create Folder</Button>
                    <h1>OR</h1>
                  </div>
                  <div className="w-[200px]">
                    <CraftSelect
                      name="folder"
                      items={["Top Bar", "About", "Contact"]}
                      label="Select from Folder"
                    />
                  </div>
                </div>
                <h1>Upload Images</h1>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 p-6 h-[150px] text-center cursor-pointer space-y-3"
                >
                  <input {...getInputProps()} />
                  <Upload className="h-10 w-10" />
                  <p>Drag & Drop files or click to browse</p>
                  <p className="text-gray-400 ">Accepted formats: image/*</p>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedFiles.map((fileWithPreview, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={fileWithPreview.preview}
                        alt="img"
                        className="w-full h-auto"
                        width={300}
                        height={100}
                      />
                      <IconButton
                        className="absolute top-0 right-0 bg-white hover:bg-gray-200"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end ">
                <Button type="submit" variant="contained">
                  Upload
                </Button>
              </div>
            </CraftForm>
          </Box>
        </CustomTabPanel>
      </Box>
    </GarageModal>
  );
};

export default AddTopBarModal;