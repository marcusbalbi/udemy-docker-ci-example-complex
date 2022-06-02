require('dotenv').config();
const keys = require('./keys')
const { createClient } = require('redis');

const client = createClient({ url: `redis://${keys.redisHost}:${keys.redisPort}` });
client.connect().then(() => {});

const sub = client.duplicate();

function fib(index) {
  if (index < 2) { return 1; }

  return fib(index -1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  client.hSet('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');

console.log('worker ready!')