
"use client";

import INTSelect from "@/components/Forms/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {  Grid } from "@mui/material";
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


import award from "../../../assets/img/topBar/bg-3.jpg";

import CraftForm from "@/components/Forms/Form";

const events = [
  {
    id: 1,
    img: award,
    sname: "Kamal",
    roll: 1,
    class: "Class 10",
    phone: "+880124639787",
    parent: "Abul Kalam",
    pPhone: "+880124639787",
    email: "abcd@mail.com",
  },
];

const Page = () => {
  const handleSubmit = () => {

  };

  return (
    <Box padding="20px 0px">
      {/* <div className="flex justify-between">
        <h1>Admission</h1>
        <div className="flex justify-end gap-2">
          <Button
            sx={{ color: "white" }}
            component={Link}
            href="/dashboard/admission/newadmission"
          >
          
            <PersonAddAltIcon className="h-5 w-5 mr-2" /> New Admission{" "}
          </Button>
        </div>
      </div> */}
      <div className="my-5  bg-white p-2 rounded-lg border shadow-sm ">
        <CraftForm onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item lg={2}>
              <INTSelect
                items={["one", "two"]}
                fullWidth
                name="branch"
                label="Branch"
              />
            </Grid>
            <Grid item lg={2}>
              <INTSelect
                items={["one", "two"]}
                fullWidth
                name="shift"
                label="Shift"
              />
            </Grid>
          </Grid>
        </CraftForm>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Roll</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Parents Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">
                  <Image
                    className="w-10 h-10 rounded-lg"
                    src={row.img}
                    alt="hero"
                  />
                </TableCell>
                <TableCell align="left">{row.sname}</TableCell>
                <TableCell align="left">{row.roll}</TableCell>
                <TableCell align="left">{row.class}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.parent}</TableCell>
                <TableCell align="left">{row.pPhone}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">
                  <div className="flex justify-end">
                    <Link href={`/dashboard/student/my-profile/${row.id}`}>
                      <IconButton title="See Profile">
                        <VisibilityIcon className="text-green-600" />
                      </IconButton>
                    </Link>
                    <Link href={`/dashboard/admission/${row.id}`}>
                      <IconButton title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton title="Delete">
                      <DeleteIcon className="text-red-600" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Page;
