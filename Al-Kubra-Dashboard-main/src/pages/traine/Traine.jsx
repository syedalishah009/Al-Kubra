import "./traine.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useState } from "react";
import { useGetTraine } from "../../api/traine";
import { Link } from "react-router-dom";

const Traine = () => {


  const { data, status } = useGetTraine();

  
  return (

    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="table-container">
        <TableContainer component={Paper} className="table">

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Email</TableCell>
                <TableCell className="tableCell">Phone No</TableCell>
                <TableCell className="tableCell">Destrict</TableCell>
                <TableCell className="tableCell">Production Center</TableCell>
                <TableCell className="tableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.forms.map((traini) => (
                <TableRow key={traini.id}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      {/* <img src={traini.img} alt="" className="image" /> */}
                      {traini.name}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{traini.email}</TableCell>
                  <TableCell className="tableCell">{traini.phone}</TableCell>
                  <TableCell className="tableCell">{traini.district}</TableCell>
                  <TableCell className="tableCell">
                    <span className="status">{traini.productionCenter}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                  <Link to={`/singleTraini/${traini._id}`} style={{ textDecoration: "none" }}>
                          <div className="viewButton">View</div>
                        </Link>
                  </TableCell>

                  {/* <TableCell className="tableCell">
                    <div className="dropdown-container">
                      <select className="dropdown" onChange={(e) => handleStatusChange(e.target.value)}>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </div>

  );
};

export default Traine;
