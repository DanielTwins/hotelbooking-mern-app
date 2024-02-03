import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create an instance of Express Router
const router = express.Router();

// define a user login route
router.post(
  "/login",
  [
    // use express-validator to validate the request body
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "errors.array()" });
    }

    // destructure email and password from the request body
    const { email, password } = req.body;

    try {
      // find the user in the database based on the provided email
      const user = await User.findOne({ email });

      // if no user found, return an error
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // compare the provided password with the hashed password stored,
      //* return bolean value
      const isMatch = await bcrypt.compare(password, user.password);

      // if the password doesn't match, return an error
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // create an access token using JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      // set the access token as an HTTP cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_EMV === "production",
        maxAge: 86400000,
      });

      // return the user's ID as a response
      res.status(200).json({ userId: user._id }); // _id comes from mongoddb document
    } catch (error) {
      console.log(error); // logs any errors to the backend console

      // send a generic message to the client
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
