const { response } = require("express");
const express = require("express");
const app = express();
// Dummy DB
let notes = [
  {
    id: 1,
    content: "HTML is  sure",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];
// Activating the JSON Parser
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else response.status(404).end();
});

app.post("/api/notes", (request, response) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  const reqBody = request.body;

  if (!reqBody.content) {
    return response.status(400).json({
      error: "Content cannot be left empty",
    });
  }
  const note = {
    id: maxId + 1,
    content: reqBody.content,
    date: new Date(),
    important: reqBody.important | false,
  };
  notes = notes.concat(note);
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
