import Head from "next/head";
import { useContext, useEffect } from "react";
import { ChatContext } from "../src/context/chat/ChatContext";
import styles from "../styles/Home.module.css";

import InboxPeople from '../src/components/InboxPeople';
import {Messages} from '../src/components/Messages';
import ChatSelect from '../src/components/ChatSelect';  
import { AuthContext } from "../src/context/AuthContext";
import { useRouter } from "next/router";
import { Box, Grid } from "@mui/material";

export default function Home() {
    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if(!auth.logged){
        router.push("/auth/login");
      }
    },[auth])

    return (
        <div>
            <Head>
                <title>Pixels Chat APP</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
  
            <Box
                height='100vh'
                width='100%'
                overflow='hidden' 
            >
                <Grid container>
                    <Grid item xs={3}>
                        <InboxPeople />
                    </Grid>
                    <Grid item xs={9}>
                        {
                            (chatState.chatActivo) ?
                            <Messages /> :
                            <ChatSelect />
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
