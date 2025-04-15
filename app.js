import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the server! After long time.");
});

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;