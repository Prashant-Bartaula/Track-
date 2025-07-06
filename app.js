import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
//socket runs on http server
import  http from 'http';
const app=express();

const server=http.createServer(app);
const io=new Server(server);


app.set('view engine', 'ejs');

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('send-location', (data)=>{
        io.emit('receive-location', {id:socket.id, ...data})
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
})

app.get('/', (req, res)=>{
    res.render("index");
    try {
        
    } catch (error) {
        
    }
})

server.listen(3000, ()=>[
    console.log('listening on port 3000')
])