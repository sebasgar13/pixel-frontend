import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { AuthContext } from "../../src/context/AuthContext";

const register = () => {
    const {register, auth} = useContext(AuthContext);
    const router = useRouter();
    const [form, setForm] = useState({
        name: 'Sebas',
        email: 'test@test.com',
        password: '123456',
        rememberme: true
    })

    useEffect(() => {
        const email = localStorage.getItem('email');
        if(email){
            setForm(form => ({
                ...form,
                email, 
                rememberme: true,
            }))
        }
    }, [])

    useEffect(() => {
        if(auth.logged){
            router.push("/");
        }
    },[auth])
    

    const onChange = ({target}) => {
        const {name, value} = target;
        setForm(prev => ({...prev, [name]: value}));
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        (form.rememberme) ? localStorage.setItem('email', form.email) : localStorage.removeItem('email');
        //LLamar al backend
        const {name, email, password} = form;
        const msg = await register(name, email, password);
        if(msg !== true){
            Swal.fire('Error', msg)
        }
    }

    const todoOk = () => {
        return( form.email.length > 0 && form.name.length > 0 && form.password.length > 3 ? true : false)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{minHeight: '100vh'}}
        >
            <Grid 
                item
                sx={10}
                md={5}
            >
                <Paper
                    sx={{
                        width: '100%',
                        padding: '16px 20px'
                    }}
                >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {my: 2, width: '100%' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <Typography sx={{width: '100%'}} variant="h4" fontWeight='bold'>
                            Registro
                        </Typography>

                        <TextField 
                            label="name"
                            name="name" 
                            variant="filled"
                            value={form.name}
                            onChange={onChange}
                        />
                        <TextField 
                            label="email"
                            name="email" 
                            variant="filled"
                            placeholder="Email" 
                            value={form.email}
                            onChange={onChange}
                        />
                        <TextField  
                            type="password" 
                            label="password" 
                            name="password"
                            variant="filled" 
                            value={form.password}
                            onChange={onChange}
                        />

                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid 
                                item
                                xs={12}
                            >
                                <Button onClick={onSubmit} style={{width: '100%'}} variant="contained" disabled={!todoOk()}>INICIAR SESIÓN</Button>
                            </Grid>
                        </Grid>
                        <Box >
                            <Link href="/auth/login" >
                                Ya tienes cuenta?
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default register