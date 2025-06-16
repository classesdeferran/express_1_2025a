const express = require('express')
const server = express()
const util = require('node:util')

process.loadEnvFile()
const PUERTO = process.env.PUERTO || 30000

server.get("/", (req, res) => {
    console.log(util.styleText("green", "Conectados a HOME"));
    res.send("<h1>Estamos en la ruta raiz o home</h1>")
})

server.get("/clientes", (req, res) => {
    res.send("Estamos en la ruta clientes")
})

server.get("/api/cliente", (req, res) => {
    res.json({"nombre": "James", "apellido": "Bond", "direccion" : "Bahamas"})
})

server.use( (req, res) => {
    res.status(404).send('Pagina no encontrada')
})

server.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})