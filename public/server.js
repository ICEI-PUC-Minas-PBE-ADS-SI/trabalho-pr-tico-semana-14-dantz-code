const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json'); // Caminho para o db.json
const middlewares = jsonServer.defaults();

// Usando CORS com configuração específica
server.use(cors({ origin: '*' })); // Permite qualquer origem
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
