
"use client";

import {
  Button,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import award from "../../../../../assets/img/topBar/bg-3.jpg";
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import CraftForm from "@/components/Forms/Form";
import AddTopBarModal from "../_components/AddTopBarModal";

const events = [
  {
    id: 1,
    img: award,
    // sname: "Kamal",
    // roll: 1,
  },
];

const Page = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  

  const handleSubmit = () => {

  };

  return (
    <>
      <Box padding="0px 0px">
        <Card
          sx={{
            marginBottom: 4,
            padding: 2,
            borderRadius: "8px",
            boxShadow: 0.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 className=" text-3xl">Top Bar</h1>
          <CraftForm onSubmit={handleSubmit}>
            <FormControl sx={{}} variant="outlined">
              <InputLabel htmlFor="search" size="small">
                Search Here
              </InputLabel>
              <OutlinedInput
                endAdornment={<Search />}
                label="Search"
                className="w-[260px] lg:w-[250px] h-10"
              />
            </FormControl>
          </CraftForm>

          <Button
            sx={{ color: "" }}
          
            variant="contained"
            onClick={handleOpen}
          >
            <Add className="h-5 w-5 mr-2" /> New Top Bar
          </Button>
        </Card>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>SL. No.</TableCell>
                <TableCell>Image</TableCell>
                {/* <TableCell>Page Name</TableCell>
                <TableCell>Page Link</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      className="w-[200px] h-14 rounded-md"
                      src={row.img}
                      alt="hero"
                    />
                  </TableCell>
                  {/* <TableCell align="left">{row.sname}</TableCell>
                  <TableCell align="left">{row.roll}</TableCell> */}

                  <TableCell align="right">
                    <div className="flex justify-center items-center content-center">
                      {/* <Link href={`/dashboard/student/my-profile/${row.id}`}>
                      <IconButton title="See Profile">
                        <Visibility className="text-green-600" />
                      </IconButton>
                    </Link> */}
                      <Link href={`/dashboard/super_admin/admission/${row.id}`}>
                        <IconButton title="Edit">
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton title="Delete">
                        <Delete className="text-red-600" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
            {open && <AddTopBarModal open={open} setOpen={handleClose} />}
    </>
  );
};

export default Page;
