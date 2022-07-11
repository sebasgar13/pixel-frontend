import { Box } from '@mui/material'
import React from 'react'
import { Searchbox } from './Searchbox'
import { Sidebar } from './Sidebar'

const InboxPeople = () => {
    return (
        <Box 
            height='100vh'
            position="relative"
            paddingTop='50px'
        >
            <Sidebar />
            <Searchbox />
        </Box>
    )
}

export default InboxPeople