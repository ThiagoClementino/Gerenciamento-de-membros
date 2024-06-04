const mongodb = require('mongodb');

const connectDB = async () => {
  const client = await mongodb.MongoClient.connect('mongodb+srv://thidf57:Nova*427@gerenciador-de-membros.ua4raq8.mongodb.net/?retryWrites=true&w=majority&appName=Gerenciador-de-Membros', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const db = client.db();
  return db;
};

module.exports = connectDB;
