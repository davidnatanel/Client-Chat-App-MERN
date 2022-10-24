import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logomp.svg"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRouter } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


      useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
          navigate("/");
        }
      },[]);

    const [values, setValues] = useState({
        username: "",
        password: "",
      });
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
       if( handleValidation()){
        const { password, username } = values;
        console.log(password,username)
        const {data}= await axios.post(loginRouter,{
            username,
            password
        })

        console.log(data)
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
        const { password, username } = values;
        if (password === "") {
          toast.error(
            "Email and Password is required.",
            toastOptions
          );
          return false;
        } else if (username.length === "") {
          toast.error(
            "Email and Password is required.",
            toastOptions
          );
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
            min="3"
          />
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
         
          <button type="submit">Login In</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
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

export default Login;