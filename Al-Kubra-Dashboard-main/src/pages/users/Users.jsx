import "./user.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsers } from "../../redux/apiCalls"
import { useDeleteUser, useDeletetUser, useGetUsers } from "../../api/users"
import { ToastContainer, toast } from "react-toastify"


const Users = () => {
  const [query, setQuery] = useState("");
   const {data, status, error, refetch} = useGetUsers(query);
   const { mutate } = useDeleteUser();

   useEffect(() => {
    refetch();
  }, [query]);

  if(status === "loading"){
    <h2>Loading...</h2>
  }
  if(status === "error"){
    <h2>{error}</h2>
  }


  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteUserId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
        mutate(deleteUserId, {
          onSuccess: () => {
            setTimeout(() => {
              toast("Profile updated Successfully", {
                type: "success",
              });
            }, );
          }},)
      // deleteUser(deleteUserId, dispatch);
      setOpenDialog(false);
    }
  };
  



  // const handleDelete = (id)=>{
  //   deleteUser(id,dispatch)
  //   console.log(id);
  // }

  return (
    <>
    <ToastContainer />
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            <div className="search">
              <input type="text" placeholder="Search..." 
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
              <SearchOutlinedIcon />
            </div>
            {/* <Link to="/AddProductCard" className="link">
                Add User
              </Link> */}
          </div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? data?.data?.users?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="tableCell">{user._id}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img src={user.avatar.url} alt="" className="image" />
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">{user.email}</TableCell>

                    <TableCell className="tableCell">
                      <div className="cellAction">
                        {/* <Link to={`/users/${user._id}`} style={{ textDecoration: "none",}}>
                          <div className="viewButton">View</div>
                        </Link> */}
                        <div className="DeliverBtn" onClick={()=> handleDelete(user._id)}>
                          <button>Delete</button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                )) : "no data"}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} className="confirm-dialog">
        <DialogTitle className="confirm-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent className="confirm-dialog-message">
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions className="confirm-dialog-buttons">
          <Button onClick={handleCloseDialog} className="confirm-dialog-button cancel">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className="confirm-dialog-button delete">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
    </>
  )
}

export default Users;