import app from "./src/app";
import mongoose from "mongoose";
import config from "config";

const port = process.env.PORT || 3000;

const databaseUrl: string = config.get("database.url");

mongoose.connect(databaseUrl);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
