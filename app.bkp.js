const express = require("express");
const app = express();
const port = 3080;
const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://postgres:postgres@localhost:5432/Cursos");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/turma", (req, res) => {
  res.send("Turma PDS 2023.4!");
});

app.get("/turma", (req, res) => {
  res.send("Eu me amo demais!");
});




app.get("/usuarios", (req, res) => {
  db.any('SELECT * from usuarios')
  .then((data) => {
    // console.log('DATA:', data.value)
    res.json({
      mensage: 'Deu bom!',
      data: data
    })
  })
  
  .catch((error) => {
    console.log('ERROR:', error)
  })
});


app.get("/turma/:authors/cumprimentos/:person", (req, res) => {
  let pessoas = req.params.person;
  let autores = req.params.authors;
  res.send(`{pessoas}, seja bem - vindo a API de ${autores}!!!`);
});

app.get("/authors", (req, res) => {
  res.send("Ramon e Andreia");
});

app.get("/cumprimentos/:pessoa", (req, res) => {
  let p = req.params.pessoa;
  res.send(Olá, `${p}!`);
});

function cumprimentos(pessoa) {
  return "Olá, ${pessoa}!";
}

app.listen(port, () => {
  console.log("Example app listening on port" `${port}`);
});