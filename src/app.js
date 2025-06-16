const path = require('node:path')
const express = require('express')
const server = express()
const util = require('node:util')

process.loadEnvFile()
const PUERTO = process.env.PUERTO || 30000

server.use(express.static(path.join(__dirname, "../public")))

server.get("/", (req, res) => {
    console.log(util.styleText("green", "Conectados a HOME"));
    console.log(util.styleText("blue", __dirname));
    res.send("<h1>Estamos en la ruta raiz o home</h1>")
})

server.get("/clientes", (req, res) => {
    res.send("Estamos en la ruta clientes")
})

server.get("/api/cliente", (req, res) => {
    res.json({"nombre": "James", "apellido": "Bond", "direccion" : "Bahamas"})
})

server.get("/james", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/james.html"))
})

server.use( (req, res) => {
    res.status(404).send('Pagina no encontrada')
})

server.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})