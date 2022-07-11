import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SidebarCharItem =  ({usuario}) => {
    const {dispatch} = useContext(ChatContext);

    const activarChat = async() => {
        dispatch({
            type: types.activarChat,
            payload: usuario.id
        })

        //Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${usuario.id}`);

        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        })

        scrollToBottom('mensajes');
    }

    return (
        <Box 
            onClick={activarChat} 
            sx={{width: '100%', padding: '8px 16px'}}
        > 
            <Grid 
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item >
                    <Avatar alt="Remy Sharp" src="https://ptetutorials.com/images/user-profile.png" />
                </Grid>
                <Grid item xs>
                    <Typography variant='text' m={1}>{usuario.nombre}</Typography>
                    <Box>
                        {
                            usuario.online 
                            ? <Typography variant='caption' color={'#600060'}>Online</Typography>
                            : <Typography variant='caption' color={'#a0a0a0'}>Offline</Typography>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
