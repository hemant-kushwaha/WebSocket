const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

async function setupRedis(io) {
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();


  pubClient.on("error", (err) => console.error("Pub Error:", err));
  subClient.on("error", (err) => console.error("Sub Error:", err));

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  console.log("Redis adapter connected");
}

module.exports = setupRedis;