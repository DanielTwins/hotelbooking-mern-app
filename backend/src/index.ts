// import required modules
import express, { Request, Response } from "express"; // import types Request and Response
import cors from "cors"; // import the CORS middleware for handling cross-origin resource sharing
import "dotenv/config"; // import and configuering dotenv module for managing environment variables
import mongoose from 'mongoose'; // connect to the database and interact with database

// connect to MongoDB database using mongoose by providing the connection string from .env
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) 

const app = express(); // create and initialize an express app 
app.use(express.json()); // convert automatically the body of API requests into JSON 
app.use(express.urlencoded({ extended: true })); // use middleware to parse URL-encoded data in incoming requests
app.use(cors()); // use CORS middleware to handle cross-origin resource sharing

// create an API endpoint at "/api/test"
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express endpoint!"}) // responde with a JSON object when a GET request is made to "/api/test"
});

// start the server, listen to port 7000
app.listen(7000, () => { 
  console.log("Server running on localhost:7000")
}) 
 