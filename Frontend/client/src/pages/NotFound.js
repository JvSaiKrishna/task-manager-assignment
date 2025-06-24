import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
  <>
  <Box component="div" className='h-screen flex flex-col justify-center items-center'>
    
    <Typography fontSize="30px">
        Page Not Found <Box component="span" className='text-red-600'>404</Box>
    </Typography>
    <Link to="/Dashboard" className='text-blue-800 text-xl'>Home Page</Link>
  </Box>
    </>
  )
}

export default NotFound