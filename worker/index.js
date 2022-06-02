require('dotenv').config();
const keys = require('./keys')
const { createClient } = require('redis');

const client = createClient({ url: `redis://${keys.redisHost}:${keys.redisPort}` });
client.connect();

const sub = client.duplicate();
sub.connect();

function fib(index) {
  if (index < 2) { return 1; }

  return fib(index -1) + fib(index - 2);
}

sub.subscribe("insert", (message, channel) => {
  const result = fib(parseInt(message));
  client.hSet("values", message, result);
  console.log("Working...", message, result);
});


console.log('worker ready!')