import React, { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}

export const AuthProvider = ({children}) => {
    const [auth, setAuth ] = useState(initialState);

    const login = async (email, password) => {
        const resp = await fetchSinToken('login', {email, password}, 'POST')
        if(resp.ok){
            const usuario = resp.usuario;
            localStorage.setItem('token', resp.token);
            setAuth({
                uid: usuario.id,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        }

        return resp.ok
    }
    const register = async (nombre, email, password) => {
        const resp = await fetchSinToken('login/new', {nombre, email, password}, 'POST')
        if(resp.ok){
            const usuario = resp.usuario;
            localStorage.setItem('token', resp.token);
            setAuth({
                uid: usuario.id,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
            //console.log(usuario);
            return true
        }

        return resp.msg
    }

    const verificaToken = useCallback( async () => { //Esta función es especial porque esta dentro de un useEffect
        const token = localStorage.getItem('token');

        if(!token){
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false;
        }
        const resp = await fetchConToken('login/renew');
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            const usuario = resp.usuario;
            setAuth({
                uid: usuario.id,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
            //console.log(usuario);
            return true
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false;
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            ...initialState,
            checking: false
        })        
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                register,
                verificaToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
