// server.js - Servidor IEAD 2.0 - CORRIGIDO PRO RENDER
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

let estadoAtual = {}; // guarda o último estado

io.on('connection', (socket) => {
  console.log('Conectado:', socket.id);
  // manda o estado atual pra quem acabou de entrar
  socket.emit('update', estadoAtual);

  socket.on('update', (data) => {
    estadoAtual = { ...estadoAtual, ...data };
    io.emit('update', estadoAtual); // manda pra todo mundo
  });

  socket.on('timer_tick', (val) => {
    io.emit('timer_tick', val);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'display.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ SERVIDOR IEAD RODANDO em http://localhost:${PORT}`);
  console.log(`Display: http://localhost:${PORT}/display.html`);
  console.log(`Controle: http://localhost:${PORT}/controle.html`);
  console.log(`Available at your primary URL https://iead-doules.onrender.com`);
});
