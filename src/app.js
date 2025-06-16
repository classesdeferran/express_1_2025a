// DEPENDENCIAS DEL PROYECTO
const path = require("node:path");
const express = require("express");
const morgan = require("morgan");
const server = express();
// const util = require("node:util");
const fs = require("node:fs");

// LECTURA DEL FICHERO CON LAS VISITAS ACTUALIZADAS
const visitasJSON = require("../visitas.json");
let visitas = visitasJSON["visitas"];

// LECTURA DE LAS VARIABLES DE ENTORNO
process.loadEnvFile();
const PUERTO = process.env.PUERTO || 30000;

// Ruta de los ficheros estáticos
server.use(express.static(path.join(__dirname, "../public")));

// Middleware de librería
// server.use(morgan("dev"));
// Middleware personalizado
server.use((req, res, next) => {
  visitas++;
  let objetoVisitas = `{"visitas": ${visitas}}`;
  fs.writeFileSync("visitas.json", objetoVisitas, (err) => {
    if (err) throw err;
    console.log("Fichero actualizado");
  });
  next();
});

server.get("/", (req, res) => {
  //   console.log(visitas);
  console.log(util.styleText("green", "Conectados a HOME"));
  console.log(util.styleText("blue", __dirname));
  let mensaje = "<h1>Estamos en la ruta raiz o home</h1>";
  mensaje += `Total visitas: ${visitas}`;
  res.send(mensaje);
});

server.get("/clientes", (req, res) => {
  let mensaje = "<h1>Estamos en la ruta clientes</h1>";
  mensaje += `Total visitas: ${visitas}`;
  res.send(mensaje);
});

server.get("/api/cliente", (req, res) => {
  res.json({ nombre: "James", apellido: "Bond", direccion: "Bahamas" });
});

server.get("/james", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/james.html"));
});

server.use((req, res) => {
  //   res.status(404).send("Pagina no encontrada");
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

server.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
