import { useRef, useState } from "react";
import { z } from 'zod';
import { fetch } from "@tauri-apps/plugin-http";
import {API_BASE_URL} from '../config.js';

const ConnectionStatusSchema = z.enum(['idle', 'connecting', 'connected', 'error']).catch("error");
const stream_ticket_schema=z.object({status:z.enum(["error",'success']),stream_ticket:z.string()});

function useForensicStream() {
    const retryCount = useRef(null);
    const watchdogTimer = useRef(null);
    const controller = useRef(null);
    const [connectionStatus, setConnectionStatus_] = useState("idle");
    const setConnectionStatus = (value) => {
        const result = ConnectionStatusSchema.parse(value);
        setConnectionStatus_(result);
    }


    const resetWatchdog = () => {
        clearTimeout(watchdogTimer.current);
        setLastHeartbeatTime(Date.now());
        watchdogTimer.current = setTimeout(disconnect_timer_ends, 25000);
    }
    const disconnect_timer_ends = () => {
        console.error("FORENSIC_WATCHDOG: Heartbeat missed. Killing connection.")
        if (controller.current) {
            controller.current.abort();
            controller.current = null;
        }
        setConnectionStatus("error");
    }
    const [lastHeartbeatTime, setLastHeartbeatTime] = useState(Date.now());
    const connect= async (user_id,sso_token)=>{
        if(connectionStatus=="connected"){
            return;
        }
        setConnectionStatus("connnecting");
        controller.current=new AbortController();
        try {
            var response=await fetch("")
        } catch (error) {
            
        }
    }
}