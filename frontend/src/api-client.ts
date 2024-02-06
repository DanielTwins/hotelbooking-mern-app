import { RegisterFormData } from "./pages/Register";

// get the API base URL from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// define a function to register a user by making a POST request to the server
export const register = async (formData: RegisterFormData) => {
  // make a POST request to the registration endpoint
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST", // use the http POST method
    headers: {
      "Content-Type": "application/json", // set the request content type to JSON
    },
    body: JSON.stringify(formData), // convert form data to JSON and send it in the request body
  });

  // parse the response body as JSON
  const responseBody = await response.json();

  // check if the response status is OK
  if (!response.ok) {
    // if not OK, throw an error with the message from the response body
    throw new Error(responseBody.message); 
  }
};
