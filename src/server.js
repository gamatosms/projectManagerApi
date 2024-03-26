import { fastify } from "fastify";
import { DatabasePostgres } from "./database/database-sql.js";
const server = fastify();

server.listen({
  port: 3000,
});

const database = new DatabasePostgres();

server.post("/projetos", async (req, res) => {
  const { name, description, thumbnail, repositorylink, projectlink } =
    req.body;

  await database.create({
    name,
    description,
    thumbnail,
    repositorylink,
    projectlink,
  });

  console.log(database.list());
  return res.status(201).send();
});

server.get("/projetos", async (req) => {
  const search = req.query.search;
  const projetos = await database.read(search);

  return projetos;
});

server.put("/projetos/:id", (req, res) => {
  const projetosId = req.params.id;
  const { name, description, thumbnail, repositorylink, projectlink } =
    req.body;

  database.update(projetosId, {
    name,
    description,
    thumbnail,
    repositorylink,
    projectlink,
  });

  return res.status(204).send();
});

server.delete("/projetos/:id", (req, res) => {
  const projetosId = req.params.id;
  database.delete(projetosId);

  return res.status(204).send("delete realizado.");
});
