import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// created an endpoint api/test and will return a json object as response
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express endpoint!"})
});

// start the server, listen to port 7000 
app.listen(7000, () => {
  console.log("Server running on localhost:7000")
})
