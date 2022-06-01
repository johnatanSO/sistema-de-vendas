const mongoose = require("mongoose");
require("dotenv").config();
const URL = 'mongodb+srv://johnatan:ZUjIilQjyoFHUEHs@desafiocluster.dyzp3.mongodb.net/?retryWrites=true&w=majority'



mongoose.connect(process.env.URL_MONGODB || URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
