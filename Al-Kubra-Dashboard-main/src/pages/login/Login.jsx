import './login.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userRedux';
import React, { useState } from 'react';

function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  // const { mutate } = useLogin();
// console.log("ddds", data?.data.user);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    dispatch(loginStart())
    console.log("pppppp");
    try{
        const res = await axios.post("http://localhost:5000/api/v1/login", formData);
        console.log(res.data);
        dispatch(loginSuccess(res.data))
        window.location.replace("/");
    }catch(err){
        dispatch(loginFailure(err))
    }
  }

 

  return ( 
    <div className='login-container'>
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
    </div>

  );
}

export default Login;
