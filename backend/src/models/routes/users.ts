import express, { Request, Response } from "express";
import User from "../user";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    // check if user already exists - check user model (user doc in database)
    // if the email matches the email which we received in the body of our request
    let user = await User.findOne({
      email: req.body.email,
    });

    // if user already exists return with a 400 response and print a message to the client side
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // else create a new user, pass in the request body which includes
    // firstName, lastName, email and password using userSchema
    user = new User(req.body);
    await user.save(); // save the new user
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});
