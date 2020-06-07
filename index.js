console.log("WebSocket Server");

const express = require('epxress');
const WebSocket=require('ws');
const SocketServer=require('ws').Server;

const server=express().listen(3000);

const wss=new SocketServer({server});

wss.on('connection',(ws)=>{
    console.log('[Server]: a client was connected');

    ws.on('close',()=>console.log('[Server]: connection was closed with client'));

    ws.on('message',(message)=>{
        //broadcast to everyone else
        console.log('[Server] Recieved message:%s',message);

        wss.clients.forEach(function each(client){
            if(client!==ws && client.readyState ===WebSocket.OPEN){
                client.send(message);
            }
        })

    })
})