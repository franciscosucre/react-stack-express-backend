let conf = {
  uri: "mongodb://localhost:27017",
  options: {
    useNewUrlParser: true,
    dbName: "sugo-stack-express-backend-dev"
  }
};

if (process.env.NODE_ENV === "production") {
  conf = Object.assign(conf, {});
} else if (process.env.NODE_ENV === "test") {
  conf = Object.assign(conf, {
    uri: "mongodb://localhost:27017",
    options: {
      useNewUrlParser: true,
      dbName: "sugo-stack-express-backend"
    }
  });
} else if (process.env.NODE_ENV === "development") {
  conf = Object.assign(conf, {});
}

module.exports = conf;
