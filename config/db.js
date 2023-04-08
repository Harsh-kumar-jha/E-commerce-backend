import mongoose from "mongoose";
import color from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `the database is connected ${connect.connection.host} ${connect.connection.name}`
        .bgGreen.white
    );
  } catch (error) {
    console.log(`The error occur in the db ${error}`.bgRed.white);
  }
};

export default connectDB;
