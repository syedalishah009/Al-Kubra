import "./products.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  // getProducts
} from "../../redux/apiCalls";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  useDeleteProduct,
  getProducts,
  useGetProducts,
} from "../../api/products";
import { toast } from "react-toastify";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const categories = [
  { key: "Select Category", value: "" },
  { key: "Abaya", value: "abaya" },
  { key: "Ladies Shirts", value: "ladies shirts" },
  { key: "Ladies Kurta", value: "ladies kurta" },
  { key: "Shawl", value: "shawl" },
  { key: "Sweater", value: "sweater" },
  { key: "Uniforms", value: "uniforms" },
  { key: "Socks", value: "socks" },
  { key: "Kids Pents and Shirts", value: "kids pents and shirts" },
];

const Products = () => {
  const dispatch = useDispatch();
  // const {products} = useSelector((state)=> state.products)

  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState();
  const [category, setCategory] = useState();

  // useGetProducts({ keyword, category });
  const { mutate } = useDeleteProduct();

  let current = 1;

  const {
    data,
    refetch,
    hasNextPage,
    isRefetchError,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useGetProducts({
    pageParam: current,
    keyword,
    category: selectedCategory,
  });

  useEffect(() => {
    refetch();
  }, [keyword, category]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <p>{error}</p>;
  }

  const current1 = data.pages.flatMap((page) => page.page);

  const products = data.pages.flatMap((page) => page.products);

  const handleClick = () => {
    current = current1[current1.length - 1];
    current += 1;
    fetchNextPage();
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteProductId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) {
      mutate(deleteProductId, {
        onSuccess: () => {
          setTimeout(() => {
            toast("Product deleted successfully", {
              type: "success",
            });
          }, 3000);
        },
      });
      setOpenDialog(false);
    }
  };

  // const handleDelete = (id)=>{
  //   deleteProduct(id,dispatch)
  // }
  // console.log("data: ", data);
  // console.log("products: ", products);

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="datatable">
            <div className="datatableTitle">
              <form className="search" onSubmit={handleSubmit}>
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="Searh..."
                />
                <SearchOutlinedIcon
                  type="submit"
                  className="cursor-pointer"
                  onClick={handleSubmit}
                />
              </form>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  refetch();
                }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.key}
                  </option>
                ))}
              </select>
              <Link to="/AddProductCard" className="link">
                Add Product
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">ID</TableCell>
                    <TableCell className="tableCell">Product</TableCell>
                    <TableCell className="tableCell">Price</TableCell>
                    <TableCell className="tableCell">In Stock</TableCell>
                    <TableCell className="tableCell">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isRefetching || isLoading ? (
                    <p
                      style={{
                        width: "100%",
                        height: "'100%",
                        textAlign: "center",
                      }}
                    >
                      Loading
                    </p>
                  ) : (
                    products?.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="tableCell">
                          {product._id}
                        </TableCell>
                        <TableCell className="tableCell">
                          <div className="cellWrapper">
                            <img
                              src={product.images[0].url}
                              alt=""
                              className="image"
                            />
                            {product.name}
                          </div>
                        </TableCell>
                        <TableCell className="tableCell">
                          {product.price}
                        </TableCell>
                        <TableCell className="tableCell">
                          {product.Stock}
                        </TableCell>

                        <TableCell className="tableCell">
                          <div className="cellAction">
                            <Link
                              to={`/EditeProduct/${product._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div className="viewButton">Edit</div>
                            </Link>
                            <div
                              className="deleteButton"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}{" "}
                  {hasNextPage && (
                    <p
                      className="w-full text-center text-[#e94560] cursor-pointer"
                      onClick={handleClick}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? "Loading..." : "Load More"}
                    </p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="confirm-dialog"
        >
          <DialogTitle className="confirm-dialog-title">
            Confirm Delete
          </DialogTitle>
          <DialogContent className="confirm-dialog-message">
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions className="confirm-dialog-buttons">
            <Button
              onClick={handleCloseDialog}
              className="confirm-dialog-button cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="confirm-dialog-button delete"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Products;
