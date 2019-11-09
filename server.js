const jServer = require('json-server');

const server = jServer.create();
const middlewares = jServer.defaults({
  static: './build'
})
const router = jServer.router('db.json');

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 4500;

server.listen(port, () => {
  console.log(`Listening on ${port}`);
})
