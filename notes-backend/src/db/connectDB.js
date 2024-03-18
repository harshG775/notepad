import mongoose from "mongoose";
export default async function connectDB() {
    const { MONGODB_LOCAL_URL, MONGODB_URL, MONGODB_PASSWORD, MONGODB_NAME } =
        process.env;
    // const fullUrl = `${MONGODB_URL.replace("<PASSWORD>", MONGODB_PASSWORD)}/${MONGODB_NAME}`;
    const fullUrl = `${MONGODB_LOCAL_URL}/${MONGODB_NAME}`;
    try {
        const conn = await mongoose.connect(fullUrl);
        console.log(`mongoose connected !! Host:${conn.connection.host}`);
    } catch (error) {
        console.log("mongoose connection field !!", error);
        process.exit(1);
    }
}
