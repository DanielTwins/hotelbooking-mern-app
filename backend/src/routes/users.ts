import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from 'express-validator'

const router = express.Router();

// request with /api/users/register then use this handler
//* add middleware to the endpoint handler - add array with validations using express-validator 
router.post("/register", [
  check("firstName", "First Name is required!").isString(),
  check("lastName", "First Name is required!").isString(),
  check("email", "Email is required!").isEmail(),
  check("password", "Password with 6 or more characters required!").isLength({ min: 6}),
], async (req: Request, res: Response) => {

  //* error handling using validator
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()})
  }    
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

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" } // the token expires in 1day in this case
    );

    res.cookie("auth_token", token, {
      httpOnly: true, // accessable only on the server side
      // only accepts cookies over https for production - not able in development with http
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // the same time as auth token expires in, maxAge in milliseconds
    })

    // send a JSON message to the response body instead of a plain text (string) of OK
    // check the request ersponse on the browser, network => preview tab
    return res.status(200).send({ message: "User registered OK"})

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
