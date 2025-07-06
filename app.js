import express from 'express';
import { Server } from 'socket.io';

//socket runs on http server
import  http from 'http';
const app=express();

const server=http.createServer(app);
const io=new Server(server);

app.get('/', (req, res)=>{
    res.send('hey')
    try {
        
    } catch (error) {
        
    }
})

app.listen(3000, ()=>[
    console.log('listening on port 3000')
])