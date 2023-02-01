import io from 'socket.io-client';

export default io.connect(process.env.REACT_APP_ROOT_API, {
  cors: {
      origin: '*'
  }
});