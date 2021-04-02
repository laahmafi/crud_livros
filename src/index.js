const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
let id = 2;
let livros = [{
        id: 1,
        titulo: "Nome do Vento",
        descricao: "fantasia",
        autor: "Patrick Rothfuss",
        isbn: " 8599296493"
    },
    {
        id: 2,
        titulo: "O Temor do Sabio",
        descricao: "fantasia",
        autor: "Patrick Rothfuss",
        isbn: "8580410320"
    }
];
let livros2 = [];

app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro)
    res.status(201).json(livro);
});

app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
})

app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.descricao = req.body.descricao;
            livro.titulo = req.body.titulo;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn
        }
    })
    res.status(204).end();
});

app.delete("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id != req.body.id) {
            const livro2 = {
                id: livro.id,
                titulo: livro.titulo,
                descricao: livro.descricao,
                autor: livro.autor,
                isbn: livro.isbn
            }
            livros2.push(livro2)
        }
    });
    livros = livros2;
    res.status(204).end();
});