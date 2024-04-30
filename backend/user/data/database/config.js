import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        }).then(() => console.log('Connected😊'))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
