import server from './app';

server.listen(3333, () => {
  console.log(`server running port 3333`);
});

// killall -9 node
