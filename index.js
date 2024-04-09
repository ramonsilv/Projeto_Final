const express = require('express')
const app = express()
const port = 3001
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:postgres@localhost:5433/Cursos')

const IP_1 = `172.16.221.204`
const PORT_1 = 3000
const SERVER_1 = [IP_1,PORT_1].join(':');

var server1 = require('axios').create({
  baseURL: 'http://' + SERVER_1
})
const IP_2 = `172.16.221.33`
const PORT_2 = 3030
const SERVER_2 = [IP_2,PORT_2].join(':');

const IP_3 = `172.16.222.233`
const PORT_3 = 3001
const SERVER_3 = [IP_3,PORT_3].join(':');

const IP_4 = `172.16.221.55`
const PORT_4 = 3000
const SERVER_4 = [IP_4,PORT_4].join(':');

const IP_5 = `172.16.221.155`
const PORT_5 = 3090
const SERVER_5 = [IP_5,PORT_5].join(':');


// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

app.get('/cursos', (req, res) => {
  db.any('SELECT * FROM cursos')
  .then(function (data) {
    res.json({
      status: "success",
      data: data,
      message: "Retornou todas as pessoas"
    });
  })
  .catch(function(error) {
    console.log('ERROR:', error)
  })
})

// Rota GET para obter todas as cursos
app.get('/cursos', (req, res) => {
  db.any('SELECT * FROM cursos')
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou todas os cursos"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao obter cursos"
      });
    })
})

// Rota GET para obter um curso por ID
app.get('/cursos/:id', (req, res) => {
  const cursosId = req.params.id;
  db.one('SELECT * FROM cursos WHERE id = $1', cursosId)
    .then(function (data) {
      res.json({
        status: "success",
        data: data,
        message: "Retornou o curso com ID " + cursosId
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(404).json({
        status: "error",
        message: "Curso não encontrado"
      });
    })
})

// Rota POST para criar uma novo Curso
app.post('/cursos', (req, res) => {
  const { descricao, motivo, dataInicio, dataFim } = req.body;
  db.none('INSERT INTO cursos(id_curso, descrisao_curso, carga_horaria_curso, modalidade, eixo) VALUES($1, $2, $3, $4, $5)', [id_curso, descrisao_curso, carga_horaria_curso, modalidade, eixo])
    .then(function () {
      res.status(201).json({
        status: "success",
        message: "Curso criado com sucesso"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao criar Cursos"
      });
    })
})

// Rota PUT para atualizar um cursos existente
app.put('/cursos/:id', (req, res) => {
  const cursosId = req.params.id;
  const { id_curso, descrisao_curso, carga_horaria_curso, modalidade, eixo } = req.body;
  db.none('UPDATE cursos SET   id_curso=$1, descrisao_curso=$2, carga_horaria_curso=$3, modalidade=$4, eixo=$5', [ id_curso, descrisao_curso, carga_horaria_curso, modalidade, eixo])
    .then(function () {
      res.json({
        status: "success",
        message: "Cursos atualizado com sucesso"
      });
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao atualizar Cursos"
      });
    })
})

// Rota DELETE para excluir uma cursos
app.delete('/cursos/:id', (req, res) => {
  const cursosId = req.params.id;
  db.result('DELETE FROM cursos WHERE id = $1', id_cursos)
    .then(function (result) {
      if (result.rowCount > 0) {
        res.json({
          status: "success",
          message: "cursos excluída com sucesso"
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Cursos não encontrada"
        });
      }
    })
    .catch(function (error) {
      console.log('ERROR:', error)
      res.status(500).json({
        status: "error",
        message: "Erro ao excluir cursos"
      });
    })
})

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})