import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { SidebarCharItem } from './SidebarCharItem'
import { Box, Grid } from '@mui/material'

export const Sidebar = () => {

    const {chatState} = useContext( ChatContext) ;
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        //console.log(chatState.usuarios);
    },[chatState])

    return (
        <Box
            sx={{
                height: '100vh',
                backgroundColor: '#f8f8f6', padding: '8px 16px'}}
        >
            <Grid
                container
                direction="column"

            >
                {
                    chatState.usuarios.filter(usuario => usuario.id !== auth.uid).map((usuario, index) => (
                        <Grid
                            item
                            key={`${usuario.id}--${index}`}
                            xs={12}
                        >
                            <SidebarCharItem 
                                usuario={usuario}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
