import { useRef, useState,useEffect, use } from "react";
import { z } from 'zod';
import { fetch } from "@tauri-apps/plugin-http";
import {RETRY_DELAY_MS, API_BASE_URL } from '../config.js';

const ConnectionStatusSchema = z.enum(['idle', 'connecting', 'connected', 'error']).catch("error");
const stream_ticket_schema = z.object({ status: z.enum(["error", 'success']), stream_ticket: z.string() });

export function useForensicStream(user_id,sso_token) {
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
    const connect = async (user_id, sso_token) => {
        if (connectionStatus == "connected" || connectionStatus == "connecting") {
            return;
        }
        setConnectionStatus("connecting");
        controller.current = new AbortController();
        try {
            const postData = { user_id: user_id, sso_token: sso_token };
            var response = await fetch(API_BASE_URL + "/api/get_stream_ticket", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(postData) });
            if (!response.ok) {
                throw new Error("Response failed.");
            }
            const json_data = await response.json();
            const parsed = stream_ticket_schema.parse(json_data);
            const stream_ticket = json_data["stream_ticket"];
            var request_stream = await fetch(API_BASE_URL + "/events?stream_ticket=" + stream_ticket, { signal: controller.current.signal });
            if (!request_stream) {
                throw new Error("Cannot open request stream.");
            }
            setConnectionStatus("connected");
            retryCount.current = 0;
            var request_stream_reader=request_stream.body.getReader();
            var text_decoder=new TextDecoder("utf-8");
            while(true){
                var {done,value}=await request_stream_reader.read();
                if(done){
                    break;
                }
                const decoded=text_decoder.decode(value,{stream:true});
                if(decoded==": keepalive"){
                    resetWatchdog();
                }
                else if(decoded.includes("data:")){
                    console.log(decoded);
                }
            }
        } catch (error) {
            if(error.name==="AbortError"){
                return;
            }
            console.error(error);
            setConnectionStatus("error");
            setTimeout(()=>{
                connect(user_id,sso_token)
            },RETRY_DELAY_MS)
        }
    }
    useEffect(()=>{
        if (!user_id || !sso_token) return;
        connect(user_id, sso_token);
        return () => {
            if (controller.current) controller.current.abort();
            clearTimeout(watchdogTimer.current);
        }
    },[user_id,sso_token]);
    return { connectionStatus, lastHeartbeatTime };
}