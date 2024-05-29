import React from 'react';
import './profile.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {  useGetSingleUser } from '../../api/users';
import { getUsers } from '../../redux/apiCalls';

const Profile = () => {
    const navigate = useNavigate();

    const {user} = JSON.parse(localStorage.getItem("currentUser"));
 
    const { data } = useGetSingleUser(user._id)


   const handleEditProfileClick = () => {
    // Navigate to the profileUpdate page and pass user data as a parameter
    navigate(`/profileUpdate/${data?.data.user._id}`);
  };


  return (

    <div className="list">
    <Sidebar />
    <div className="listContainer">
        <Navbar />
        <div style={{display: "flex", justifyContent:"center", marginTop:"30px"}}>

    <div className="user-profile">
      <div className="user-avatar">
        <img src={data?.data.user.avatar.url} alt="" />
      </div>
      <div className="user-details">
        <h2>{data?.data.user.name}</h2>
        <p>{data?.data.user.email}</p>
        <button onClick={handleEditProfileClick} className="edit-button" >
          Edit Profile
        </button>
      </div>
    </div>
      </div>
    </div>
    </div>


  );
};

export default Profile;
