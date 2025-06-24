import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Url } from '../api.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'


const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const jwt = cookie.get("taskManagerToken")
  if (jwt) {
    return <Navigate to='/dashboard' replace />
  }
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    if (form.email === "" || form.name === "" || form.password === "") {
      setForm(prev => {
        return { ...prev, password: '' }
      })
      setConfirmPassword('')

      return alert("Please fill out all required fields marked with *.");
    }
    if (!(form.password === confirmPassword)) {
      setForm(prev => {
        return { ...prev, password: '' }
      })
      setConfirmPassword('')
      return alert("Passwords not match")
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }
    const url = `${Url}/api/signup`
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      return navigate("/login", { replace: true })

    }
    else {
      alert(data.error)
    }
    setForm({ name: '', email: '', password: '' })
    setConfirmPassword('')
  };

  return (
    <Container maxWidth="sm" className="mt-20 ">
      <Typography variant="h4" gutterBottom className='text-center'>Sign Up</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField label="Name*" value={form.name} name="name" onChange={handleChange} fullWidth />
        <TextField label="Email*" value={form.email} name="email" onChange={handleChange} fullWidth />
        <TextField label="Password*" value={form.password} name="password" type="password" onChange={handleChange} fullWidth />
        <TextField label="Confirm Password*" value={confirmPassword} name="confirm password" type="password" onChange={e => setConfirmPassword(e.target.value)} fullWidth />
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
      <Typography marginTop="10px" className='text-center'>Already have account ? <Link to="/login" className='text-blue-800'>click here</Link></Typography>
    </Container>
  );
}

export default Signup