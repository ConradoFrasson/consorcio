<<<<<<< HEAD
import "dotenv/config";
import "./config/db.js";
import e from "express";
import consortiumCardsRoute from "./routes/consortiumCardsRoute.js";

const app = e();

app.use(e.json());

app.use("/consortium", consortiumCardsRoute);

=======
import "dotenv/config";
import "./config/db.js";
import e from "express";
import consortiumCardsRoute from "./routes/consortiumCardsRoute.js";

const app = e();

app.use(e.json());

app.use("/consortium", consortiumCardsRoute);

>>>>>>> da2b8811db024d8bd3a8f8d6773c3fee914a8231
app.listen(process.env.PORT, () => console.log("App running!"));