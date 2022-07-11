import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography} from "@mui/material";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { AuthContext } from "../../src/context/AuthContext";
  
export default function Login() {
    const {login, auth} = useContext(AuthContext);
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
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
        if(name === 'rememberme'){
            toggleCheck();
            return;
        }
        setForm(prev => ({...prev, [name]: value}));
    }

    const toggleCheck = () => {
        console.log()
        setForm(prev => ({
            ...prev, rememberme: !prev.rememberme
        }))
    }

    const onSubmit = async () => {
        (form.rememberme) ? localStorage.setItem('email', form.email) : localStorage.removeItem('email');
        //LLamar al backend
        const {email, password} = form;
        const ok = await login(email, password);
        if(!ok){
            Swal.fire('Error', 'Verifique el usuario y contraseña')
        }
    }

    const todoOk = () => {
        return( form.email.length > 0 && form.password.length > 3 ? true : false)
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
                            Bienvenido
                        </Typography>
                        
                        <TextField 
                            label="email"
                            name="email" 
                            variant="filled"
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
                        <FormControlLabel control={<Checkbox name="rememberme" checked={form.rememberme} onChange={onChange} />} label="Recordarme" />

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
                                <Box sx={{width: '100%', margin: '20px 0'}}>
                                    <Button onClick={onSubmit} fullWidth variant="contained" disabled={!todoOk()}>
                                        <Typography
                                            sx={{width: '100%'}}
                                        >
                                        INICIAR SESIÓN
                                        </Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box>
                            <Link href="/auth/register" className="txt1">
                                No tengo una cuenta
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>

    )
}