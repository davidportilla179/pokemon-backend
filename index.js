const express = require("express");
const pokemon = require("./pokemon.json");

const app = express();
app.use(express.json());

let lastId = 3;

app.get("/", function (request, response) {
  response.end("API Pokemon Trainers");
});

app.get("/getTrainers", function (request, response) {
  const trainers = pokemon.map(trainer => [trainer.id,trainer.nombre])
  console.log(trainers)
  response.json(trainers);
});

app.get("/getTrainers/:trainerId", function (request, response) {
  const { trainerId } = request.params;
  const getTrainerId = pokemon.filter((trainer) => trainer.id === Number(trainerId));
  console.log(getTrainerId)
  response.json(getTrainerId);
});

app.get("/getPokemons/:trainerId", function (request, response) {
  const { trainerId } = request.params;
  const getPokemonsTrainer = pokemon.filter((trainer) => trainer.id === Number(trainerId));
  console.log(getPokemonsTrainer[0].pokemon)
  response.json(getPokemonsTrainer[0].pokemon);
});

app.get("/createTrainer", function (request, response) {
  const trainer = request.body;
  pokemon.push({ ...trainer, id: ++lastId });
  response.end("Pokemon agregado");
});

app.get("/addPokemon", function (request, response) {
  const { trainerId, pokemon } = request.body;
  const getTrainer = pokemon.filter((trainer) => trainer.id === Number(trainerId));
  getTrainer[0].pokemon.push({ pokemon });
  response.end("Pokemon agregado");
});

app.listen(8080, function () {
  console.log("> Escuchando puerto 8080");
});