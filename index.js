import "dotenv/config";
import "./config/db.js";
import e from "express";
import consortiumCardsRoute from "./routes/consortiumCardsRoute.js";

const app = e();

app.use(e.json());

app.use("/consortium", consortiumCardsRoute);

app.listen(process.env.PORT, () => console.log("App running!"));