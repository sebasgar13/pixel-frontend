import { Box, Grid, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/types';

export const Searchbox = () => {
    const {auth, logout} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const salir = () => {
        logout();
        dispatch({
            type: types.reset
        })
    }

    return (
        <Box
            width='100%'
            position="absolute" top="0px"
            sx={{backgroundColor: '#585886', padding: '8px 16px'}}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid 
                    item
                >
                    <Typography variant='h5' color={'#fff'} fontWeight={"bold"}>{auth.name}</Typography>
                </Grid>
                <Grid 
                    item
                >
                    <Box>
                        <IconButton onClick={salir} aria-label="upload picture" component="span">
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
