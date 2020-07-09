import '../bootstrap';

const configMongodb = {
  url: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
  user: process.env.USER,
  pass: process.env.PASS,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

console.log(configMongodb);

export default configMongodb;
