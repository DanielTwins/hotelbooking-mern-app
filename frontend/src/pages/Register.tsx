import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';

// define the type structure of the form data using typescript
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// define the Register component
const Register = () => {
  // destructure functions and properties from useForm hook
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  // use the useMutation hook to manage the registration mutation
  const mutation = useMutation(apiClient.register, {
    // onSuccess is called when the mutation is successful
    onSuccess: () => {
      console.log("Regsitration successful!")
    },
    // onError is called when the mutation encounters an error
    onError: (error: Error) => { // Error comes from api-client
      console.log(error.message)
    }
  })

  // onSubmit handler for form submittion
  const onSubmit = handleSubmit((data) => {
    console.log(data);

    // call mutation hook and register function from api-client
    mutation.mutate(data);
  })   
  
  return (
    // form element with onSubmit handler 
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password does not match";
              }
            },
          })}
        />
         {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
