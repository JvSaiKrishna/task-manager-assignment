import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import  {Url}  from '../api.js';
import cookie from 'js-cookie'

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

      const navigate = useNavigate()
      const jwt = cookie.get("taskManagerToken")
      if(jwt){
        return <Navigate to='/dashboard' replace/>
      }
    
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.email === "" || form.password === "") {
            setForm(prev => {
                return { ...prev, password: '' }
            })
            return alert("Please fill out all required fields marked with *.");
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }
        const url = `${Url}/api/login`
        const res = await fetch(url, options)
        const data = await res.json()
        if (res.ok) {
            cookie.set("taskManagerToken",data.token,{expires:7})
            navigate("/dashboard" ,{replace:true})

        }
        else{
            alert(data.error)

        }
        setForm({  email: '', password: '' })
    };

    return (
        <Container maxWidth="sm" className="mt-20">
            <Typography variant="h4" gutterBottom className='text-center'>Login</Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextField label="Email*" name="email" value={form.email} onChange={handleChange} fullWidth />
                <TextField label="Password*" name="password" value={form.password} type="password" onChange={handleChange} fullWidth />
                <Button type="submit" variant="contained">Login</Button>
            </form>
            <Typography marginTop="10px" className='text-center'>If you are new from here ? <Link to="/signup" className='text-blue-800'>click here</Link></Typography>

        </Container>
    );
}

export default Login