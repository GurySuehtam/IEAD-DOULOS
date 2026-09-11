const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

let estadoAtual = {};

io.on('connection', (socket) => {
  console.log('Conectado:', socket.id);
  socket.emit('update', estadoAtual);
  socket.on('update', (data) => {
    estadoAtual = { ...estadoAtual, ...data };
    io.emit('update', estadoAtual);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'display.html'));
});
app.get('/display', (req, res) => {
  res.sendFile(path.join(__dirname, 'display.html'));
});
app.get('/display.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'display.html'));
});
app.get('/controle', (req, res) => {
  res.sendFile(path.join(__dirname, 'controle.html'));
});
app.get('/controle.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'controle.html'));
});
app.get('/controle-obs', (req, res) => {
  res.sendFile(path.join(__dirname, 'controle-obs.html'));
});
app.get('/controle-obs.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'controle-obs.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ RODANDO na porta ${PORT}`);
  console.log(`Display: /display.html`);
  console.log(`Controle GC: /controle.html`);
  console.log(`Controle OBS: /controle-obs.html`);
});
