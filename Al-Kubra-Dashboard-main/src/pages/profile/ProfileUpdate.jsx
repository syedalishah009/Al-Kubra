import React, { useEffect, useRef, useState } from 'react';
import './profile.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiInstance } from '../../api/apiInstance';
import { useGetSingleUser, useUpdateUser } from '../../api/users';
import { ToastContainer, toast } from "react-toastify";


const ProfileUpdate = () => {
    const navigate = useNavigate();
  
    const {user} = JSON.parse(localStorage.getItem("currentUser"));
 
    const { data } = useGetSingleUser(user._id)
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar:'',
      });

  useEffect(() => {
    if (data) {
      setFormData(data?.data.user);
    }
  }, []);
   

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({...formData, avatar: reader.result});
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const fileInput = useRef(null);

  const handleClickFile = () => {
    fileInput.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { mutate } = useUpdateUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setTimeout(() => {
          toast("Profile updated Successfully", {
            type: "success",
          });
        }, 500);
      }},)
  };

  return (
    <div className="list">
      <ToastContainer />
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className="form-container ">
          <h1>Admin Information</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="profile-pic">Profile Picture:</label>
              <input
                type="file"
                id="profile-pic"
                name="profile-pic"
                ref={fileInput}
                onChange={updateProfileDataChange}
                onClick={handleClickFile}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="edit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
