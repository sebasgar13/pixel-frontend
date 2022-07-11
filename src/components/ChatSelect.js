import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const ChatSelect = () => {
    return (
        <Box
            width={'100%'}
            height='100%'
        >   
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"  
                sx={{minHeight: '100vh'}} 
            >
                <Grid
                    item
                >
                    <Box
                    >
                        <Typography variant='h3' fontWeight='bold' textAlign={'center'}>Bienvenido al Chat</Typography>
                        <Typography variant='h6' textAlign={'center'}>Selecciona un chat para comenzar una conversación</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChatSelect