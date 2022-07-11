import React, { createContext, useReducer } from "react";
import { chatReducer } from "./ChatReducer";

export const ChatContext = createContext()

const initialState = {
    uid: '',
    chatActivo: null,
    usuarios: [], // Todos los usuarios de la base de datoa
    mensajes: [], //Chat seleccionado
}

export const ChatProvider = ({children}) => {
    const [chatState, dispatch] = useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider
            value={{    
                chatState,
                dispatch
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
