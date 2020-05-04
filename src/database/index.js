import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.connect = async () => {
      if (mongoose.connection.readyState === 0) {
        this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        });
      }
    };
    this.truncate = async () => {
      if (mongoose.connection.readyState !== 0) {
        const { collections } = mongoose.connection;

        const promises = Object.keys(collections).map(collection =>
          mongoose.connection.collection(collection).deleteMany({})
        );

        await Promise.all(promises);
      }
    };
    this.disconnect = async () => {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    };
  }
}

export default new Database();
