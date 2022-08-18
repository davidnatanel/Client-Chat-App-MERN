import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logomp.svg"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRouter } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
       if( handleValidation()){
        const { password, username, email } = values;
        const {data}= await axios.post(registerRouter,{
            username,
            email,
            password
        })
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user",JSON.stringify(data.user));
          navigate("/");
        }

       }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
        return true;
      };

    const handleChange = (e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <>
           <FormContainer>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>message in pocket</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #473204;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}
img{
    height: 5rem;
}
h1{
    color: white;
    text-transform: uppercase;
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #181814;
    border-radius: 2rem;
    padding: 3rem 5rem;
}
    input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #efb810;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus{
        border: 0.1rem solid #ffff94;
        outline: none;
    }}
    button{
        background-color: #b28405;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius:0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #efb810;
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a{
            color: #b28405;
            text-decoration: none;
            font-weight: bold;
        }
    }

`;

export default Register;