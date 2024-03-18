import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import app from "./app/app.js";
dotenv.config({
    path: "/.env",
});

// Server
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running  http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("error while starting server", error);
    }
})();
