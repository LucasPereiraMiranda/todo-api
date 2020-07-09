import server from './app';

server.listen(80, () => {
  console.log(`server running`);
});

// killall -9 node
