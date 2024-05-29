import React, { useEffect, useState } from "react";
import "./addproduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/apiCalls";
import { useAdddProduct } from "../../api/products";
// import ProductCard from "./ProductCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader'

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  
    const [product, setProduct] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
      Stock: null
    });
    console.log(product);

  const {productId} = useParams()

 
  const { mutate  } = useAdddProduct();
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    mutate(product, {
      onSuccess: ()=>{
        setTimeout(() => {
          toast("Product Added Successfully",{
            type: "success"
          });
          setLoading(false)

          navigate('/products');
        }, 200);
      }
    })
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setProduct({
        ...product,
        images: [...product.images, base64Image],
      });
    };
    reader.readAsDataURL(file);
  };


    // const { mutate } = useAddProduct()


  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({
      ...product,
      images: updatedImages,
    });
  };

  return (
    <>
    <ToastContainer />
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          {loading ? <Loader /> : 
           <div className="add-product">
           <h2>Add Product</h2>
           <form >
             <div className="product-info">
               <input
                 type="text"
                 name="name"
                 placeholder="Product Name"
                 value={product.name}
                 onChange={(e) => setProduct({ ...product, name: e.target.value })}
               />
               <input
                 type="text"
                 name="description"
                 placeholder="Product Description"
                 value={product.description}
                 onChange={(e) => setProduct({ ...product, description: e.target.value })}
               />
               <input
                 type="number"
                 name="price"
                 placeholder="Product Price"
                 value={product.price}
                 onChange={(e) => setProduct({ ...product, price: e.target.value })}
               />
               <input
                 type="number"
                 name="Stock"
                 placeholder="Stock"
                 value={product.Stock}
                 onChange={(e) => setProduct({ ...product, Stock: e.target.value })}
               />
               <select
                 name="category"
                 value={product.category}
                 onChange={(e) => setProduct({ ...product, category: e.target.value })}
               >
            <option value="electronics">Kurta</option> 
                 <option value="toys">Sweater</option>
                 <option value="toys">Abaya</option>
             <option value="clothing">Socks</option>
                 {/* <option value="toys">Frocks</option> */}
               </select>
             </div>
             <div className="product-images">

               <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
               {product.images.map((image, index) => (

                 <div className="image-container">

                   <img key={index} src={typeof image === 'string' ? image : image.url} alt="Product Image" />
                   <button
                     className="delete-button"
                     onClick={() => handleDeleteImage(index)}
                   >
                     <DeleteForeverIcon />
                   </button>
                 </div>

               ))}
             </div>
             <button type="submit" onClick={handleSubmit}>Add Product</button>
           </form>
           {/* <ProductCard product={product} /> */}
         </div>
        }
         
        </div>
      </div>
    </>
  );
};

export default AddProduct;
