import { useForm } from "react-hook-form";

// define the type structure of the form data using typescript
type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  // destructure functions and properties from useForm hook
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  // handle form submision 
  const onSubmit = handleSubmit((data) => {
    console.log(data) // log form data to the console
  }) 

  return (
    // form element with onSubmit handler 
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
