import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Grid, Container, Box } from '@mui/material';
import { Url } from '../api.js';
import cookie from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const jwt = cookie.get("taskManagerToken")
    const navigate = useNavigate()

    useEffect(() => {
        const FetchTasks = async () => {
            const url = `${Url}/api/tasks`
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
            const res = await fetch(url, options)
            const data = await res.json()
            if (res.ok) {
                setTasks(data.tasks)

            }
        }
        FetchTasks()
    }, [jwt]);

    if (!jwt) {
        return <Navigate to='/login' replace />
    }

    const addTask = async () => {
        const url = `${Url}/api/tasks`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ title })
        }
        const res = await fetch(url, options)
        const data = await res.json()
        if (res.ok) {
            setTasks(prev => {
                return [...prev, data.task]
            })

        }
        setTitle('')
    };

    const updateTask = async (id, status) => {
        const url = `${Url}/api/tasks/${id}`
        const options = {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ status })
        }
        const res = await fetch(url, options)
        const data = await res.json()
        if (res.ok) {
            setTasks(prev => {
                return prev.map(t => {
                    if (t.id === id) {
                        return { ...t, status: data.task.status }
                    }
                    return t
                })

            })

        }
    };
    const handleLogout = ()=>{
        cookie.remove("taskManagerToken")
        navigate("/login")
    }

    const groupTasks = (status) => tasks.filter(t => t.status === status);
    const statusFlow = { 'To Do': 'In Progress', 'In Progress': 'Done' };

    return (
        <Container className="mt-10">
            <Box className="text-end">
                <Button onClick={handleLogout} className='' variant='contained'>Logout</Button>
            </Box>
            <Typography variant="h4" gutterBottom>Task Dashboard</Typography>

            <Box className="flex gap-4 mb-6">
                <TextField label="New Task" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                <Button variant="contained" onClick={addTask}>Add</Button>
            </Box>

            <Grid container spacing={4} >

                {['To Do', 'In Progress', 'Done'].map(status => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={status}>
                        <Typography variant="h6" gutterBottom>{status}</Typography>
                        {groupTasks(status).map(task => (
                            <Paper key={task.id} className="p-4 mb-3 flex justify-between items-center">
                                <span>{task.title}</span>
                                {status !== 'Done' && (
                                    <Button size="small" onClick={() => updateTask(task.id, statusFlow[status])}>→</Button>
                                )}
                            </Paper>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard