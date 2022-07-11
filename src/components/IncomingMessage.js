import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { horaMes } from '../helpers/horaMes';

const IncomingMessage = ({msg}) => {
    
    return (
        <Grid item xs={12}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <Avatar src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </Grid>
                <Grid item xs={10}>
                    <Box
                        width={'100%'}
                        position='relative'
                        padding='8px 16px'
                        borderRadius='8px'
                        marginLeft='6px'
                        bgcolor='#DCDDF5'
                    >
                        <Typography>{msg.mensaje}</Typography>
                        <Box 
                            position='abosolute' bottom={0} right={0}
                        >
                            <Typography variant='caption' textAlign='end' > { horaMes(msg.createdAt)} </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default IncomingMessage;