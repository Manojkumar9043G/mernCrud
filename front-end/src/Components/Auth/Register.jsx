import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {

    const navigate = useNavigate();

    const [message,setMessage] = useState("");

    const [userInfo,setUserInfo] = useState({
        name : "",
        email : "",
        password : ""
    });


    const handleChanges =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setUserInfo((preValue)=>({
            ...preValue,
            [name] : value
        }))
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch('https://your-api-endpoint.com/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });

            const data = await response.json();
            if(data.success){
                navigate('/');
            }else{
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>

            <input type="text" 
                name="name" 
                placeholder="Full Name" 
                onChange={handleChanges}
                required />
            <input type="email" 
                name="email" 
                placeholder="Email Address" 
                onChange={handleChanges}
                required />
            <input type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChanges}
                required />

            <div className="error">
                {message}
            </div>
            <button type="submit">Register</button>
            <div className="login">
                Already have an account? <a href="/">Login</a>
            </div>
        </form>
        </div>
    );
};
