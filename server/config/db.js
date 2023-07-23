const mongoose = require('mongoose');

const connectDb = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch(err => console.error(err));
}

module.exports = connectDb