import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import SendMessage from './SendMessage'

export const Messages = () => {
    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    return (
        <Box 
            height='100vh'
            position="relative"
            paddingBottom='50px'
            overflow={'hidden'}
        >   
            <Box 
                width='100%'
                height='100%'
                padding={'16px'}
                overflow={'auto'}
                id="mensajes"
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    {
                        chatState.mensajes.map(msg => (
                            (msg.para === auth.uid)
                            ? <IncomingMessage key={msg._id} msg={msg} />
                            : <OutgoingMessage key={msg._id} msg={msg} />
                        ))
                    }
                </Grid>
            </Box>
            <SendMessage />
        </Box>
    )
}
