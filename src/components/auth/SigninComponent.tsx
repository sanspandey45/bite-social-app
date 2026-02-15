"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaStarHalfAlt } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import z from "zod";
import { FaSpinner } from "react-icons/fa";

// Creating Zod instance
const LoginSchema = z.object({
  email: z.email("* Invalid email address"),
  // Changed this from the sign up page since don't need to display how long password should be
  password: z.string().min(1, "* Password required "),
});

/*
  Typically I would create a FormType here and pass it to useForm<>, BUT since we already created our
  Zod register schema, we can INFER the type from it:
*/

type LoginFormData = z.infer<typeof LoginSchema>;

export default function SignupComponent() {
  // next.js router instance
  const router = useRouter();
  // from React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    // "Register" connects React Hook Form to form input
    // Connecting react hook form to Zod
    resolver: zodResolver(LoginSchema), // Passing in Zod instance we created
  });

  // handles the submit to check if it causes our root error
  // this onSubmit needs to be hooked up to the form in the form tag
  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result.error) {
      setError("root", {
        message: "Invalid email or password",
      });
    } else {
      reset();
      router.replace("/home");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[320px] w-[90%]">
        {/* logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <FaStarHalfAlt size={40} color="#4076dbea" />
          <span className="text-3xl font-semibold tracking-wide text-white">
            Bite
          </span>
        </div>

        {/* heading */}
        <h2 className="text-center text-2xl mb-3 text-gray-400">
          Sign in to your account
        </h2>
        <p className="text-gray-500 text-center text-sm"></p>

        {/* form */}
        <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            // FIRST handling root error for form not submitting due to existing user
            <p className="right-0 py-2 text-red-500 text-sm">
              <BiErrorCircle className="inline mr-2 mb-1" size={20} />
              {errors.root.message}
            </p>
          )}

          <input
            {...register("email")}
            type="text"
            placeholder="Email Address"
            className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            {...register("password")} // Now all inputs are connected to React Hook Form
            type="password" // changed from text to password
            placeholder="Password"
            className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="bg-blue-primary w-full my-2 py-2.5 text-white rounded-lg cursor-pointer flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin " size={18} />
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="my-3 text-center text-white">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="ml-2 text-blue-primary">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
