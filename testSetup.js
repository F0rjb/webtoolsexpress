const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async () => {
  const mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();

  process.env.MONGODB_URI = mongoUri;
};
