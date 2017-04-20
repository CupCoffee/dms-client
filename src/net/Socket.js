import io from 'socket.io-client';

const HOST = '217.121.167.9';
const PORT = 8080;

export const GameSocket = io(`${HOST}:${PORT}/game`);