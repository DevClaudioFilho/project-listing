const express = require("express");

const server = express();
server.use(express.json());

//Middleware

function projectExist(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(404).json({ mensager: "Projeto nao encontrado" });
  }

  return next();
}

//Middleware Requisições
let requests = 0;

function checkRequest(req, res, next) {
  requests++;

  console.log(`Requisições: ${requests}`);

  return next();
}

server.use(checkRequest);

const projects = [];

//Rota que lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//cadastrar
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//editar
server.put("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//apagar
server.delete("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send(projects);
});

//cadastrar tasks

server.post("/projects/:id/tasks", projectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3333);
