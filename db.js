const mongoose = require("mongoose");
mongoURI = 'mongodb+srv://deepakshukla091827:Pappu@cluster0.m2q945t.mongodb.net/FoodieMern?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
        const fetchedData = await mongoose.connection.db.collection("food_items");
        const data = await fetchedData.find({}).toArray(); // Use await here to get the result
        // console.log(data);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};
module.exports = connectToMongo;