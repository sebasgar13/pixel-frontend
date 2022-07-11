import { Box, Button, Grid, Input, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { SocketContext } from '../context/SocketContext'
import SendIcon from '@mui/icons-material/Send';

const SendMessage = () => {
    const {socket} = useContext(SocketContext);
    const {auth} = useContext(AuthContext);
    const {chatState} = useContext(ChatContext);

    const [mensaje, setMensaje] = useState('');

    const onChange = ({target}) => {
        setMensaje(target.value)
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(mensaje.trim().length === 0){ return;}
        setMensaje('');

        //Emitir un evento de sockets para enviar mensaje
        // {
        //     de: '',
        //     para: '',
        //     mensaje: '',
        // }

        socket.emit('mensaje-personal',
        {
            de: auth.uid,
            para: chatState.chatActivo,
            mensaje
        })

        //TODO: Hacer el dispatch de el mensaje...
    }

    return (
        <Box
            width='100%'
            position="absolute" bottom="0px"
            bgcolor='#585886'
            padding={'16px'}
        >
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid
                        item
                        xs={8}
                        md={9}
                        lg={10}
                    >
                        <Input 
                            bgcolor='#fff'
                            size="small"
                            placeholder='Mensaje'
                            sx={{width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '2px 16px'}}
                            value={mensaje}
                            onChange={onChange} 
                        />
                    </Grid>
                    <Grid
                        item
                        xs
                    >
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default SendMessage