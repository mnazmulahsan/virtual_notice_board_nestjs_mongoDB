export default {
  uri: process.env.MONGOURI,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: process.env.dbName,
};
