const app = require("fastify")({ logger: true });
const project = {
  name: "test",
  description: "test",
  imageUrl: "test",
  repositoryLink: "test",
  projectLink: "test",
};
app.get("/", function handler(request, reply) {
  reply.send(project);
});

// Run the server!
app.listen({ port: 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
