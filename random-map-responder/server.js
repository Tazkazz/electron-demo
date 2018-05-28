const fs = require('fs');
const express = require('express');

const getRandomMap = () => fs.readFileSync(`maps/${Math.floor(Math.random() * 5) + 1}.png`);
const app = express();

app.get('/map', (req, res) => res.send(getRandomMap()));

app.listen(1997);
