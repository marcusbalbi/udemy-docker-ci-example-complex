require("dotenv").config();
const keys = require("./keys");
const { createClient } = require("redis");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

const redisClient = createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');

  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  try {
    const data = await redisClient.hGetAll('values');
    res.send(data);
  } catch(err) {
    console.log('fail', err);
    res.status(500).send(err);
  }
});

app.post('/values', async (req, res) => {
  try {
    const { index } = req.body;
    if (parseInt(index) > 40 || isNaN(parseInt(index))) {
      return res.status(422).send("value for index invalid or too high");
    }

    await redisClient.hSet('values', index, 'Nothing yet');
    await redisPublisher.publish('insert', index);

    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
  } catch (err) {
    console.log('failed to post value', index, 'error:', err);
    res.status(500).send({ error: err });
  }
})

const redisPublisher = redisClient.duplicate();

app.listen(5000, async () => {
  await redisClient.connect();
  await redisPublisher.connect();
  console.log('server listening...')
});
