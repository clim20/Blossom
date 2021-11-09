const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB, CLOUDINARY_URL } = require('./config');


const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

cloudinary.config({ 
  CLOUDINARY_URL,
  secure: true
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err);
  })