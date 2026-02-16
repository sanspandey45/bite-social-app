"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import z from "zod";
import { FaRegStar } from "react-icons/fa6";

const registerSchema = z.object({
  name: z.string().min(2, "* Name is required"),
  email: z.email("* Invalid email address"),
  username: z.string().min(3, "* Username must be at least 3 characters"),
  password: z.string().min(6, "* Password must be at least 6 characters"),
});

/*
  Typically I would create a FormType here and pass it to useForm<>, BUT since we already created our
  Zod register schema, we can INFER the type from it:
*/

type RegisterFormData = z.infer<typeof registerSchema>;

// Made this file to make a client component without converting whole sign up page to client component.
// This way, our sign up page is still a server component and we can do server side logic in it.

// In this client component, we can now use Zod (form validation) and React Hook Form (form handling).
// Installed and connected both using: npm i react-hook-form Zod @hookform/resolvers

export default function SignupComponent() {
  // to redirect to home page once user registers
  // next.js router instance
  const router = useRouter();
  // from React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    // "Register" connects React Hook Form to form input
    // Connecting react hook form to Zod
    resolver: zodResolver(registerSchema), // Passing in Zod instance we created
  });

  // Checking for server error
  // Will sending data inside function so async
  const onSubmit = async (data: RegisterFormData) => {
    // console.log(data);
    try {
      const res = await axios.post("/api/auth/register", data); //Because the register route takes a post request

      if (res.status === 201) {
        // -----login the user here automatically if they registered
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (!res.error) {
          reset();
          router.replace("/home");
        }

        // alert("Registration successful");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data.error || "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Logo & Message */}
      <motion.div
        className="w-1/3 relative bg-rose-100 flex flex-col items-center justify-center border-r border-gray-300"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* logo
        <FaStarHalfAlt size={50} color="black" className="mb-5" /> */}
        <motion.h1
          className="text-4xl font-bold text-blue-primary mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <p> Create an account </p>
        </motion.h1>
        <motion.p
          className="text-lg text-black font-semibold text-center px-11"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Join the best platform for <span className="text-black">saving</span>{" "}
          and <span className="text-black">sharing</span> your{" "}
          <span className="text-black">bites</span>.
        </motion.p>
      </motion.div>

      {/* Right side of screen - Signup Form */}
      <motion.div
        className="w-2/3 bg-lightpurp flex items-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[320px] w-[90%] ml-20">
          {/* logo */}
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FaRegStar size={45} color="#4076dbea" className="[stroke:black] [stroke-width:10px] [paint-order:stroke_fill] drop-shadow-[0_0_2px_black]"/>
            <span className="text-4xl font-semibold tracking-wide text-gray-900">
              Bite
            </span>
          </motion.div>

          {/* heading */}
          {/* <h2 className="text-center text-3xl font-semibold mb-3 text-gray-200">
            Create a new account
          </h2> */}
          <motion.p
            className="text-gray-700 text-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Please enter your details
          </motion.p>

          {/* form */}
          <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              // FIRST handling root error for form not submitting due to existing user
              <p className="right-0 py-2 text-red-700 text-md -mb-2 -mt-4">
                <BiErrorCircle className="inline mr-2 mb-1" size={20} />
                {errors.root.message}
              </p>
            )}

            {/* Registering 4 input fields */}
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-3xl outline-none text-gray-100 my-3"
            />
            {errors.name && (
              <p className="text-red-700 text-sm mb-1.5 -mt-1.5">{errors.name.message}</p>
            )}

            <input
              {...register("email")}
              type="text"
              placeholder="Email Address"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-3xl outline-none text-gray-100 my-3"
            />
            {errors.email && (
              <p className="text-red-700 text-sm mb-1.5 -mt-1.5">
                {errors.email.message}
              </p>
            )}

            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-3xl outline-none text-gray-100 my-3"
            />
            {errors.username && (
              <p className="text-red-700 text-sm mb-1.5 -mt-1.5">
                {errors.username.message}
              </p>
            )}

            <input
              {...register("password")} // Now all inputs are connected to React Hook Form
              type="password" // changed from text to password
              placeholder="Password"
              className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-3xl outline-none text-gray-100 my-3"
            />
            {errors.password && (
              <p className="text-red-700 text-sm mb-1.5 -mt-1.5">
                {errors.password.message}
              </p>
            )}

            <button
              disabled={isSubmitting} // so button disabled when it is submitting currently
              className="bg-blue-primary w-full my-2 py-2.5 text-white rounded-3xl cursor-pointer"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}{" "}
              {/* using isSubmitting boolean to disable sign up button */}
            </button>
          </form>

          <div className="my-3 text-center text-gray-700">
            <span> Already have an account?</span>
            <Link href="/" className="ml-2 text-blue-primary">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// DIFFERENT layout option if needed:
//-----------------------------------------------------------------------------------------------
// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaStarHalfAlt } from "react-icons/fa";
// import z from "zod";
// import { motion } from "framer-motion";

// // Creating Zod instance
// const registerSchema = z.object({
//   name: z.string().min(2, "* Name is required"),
//   email: z.email("* Invalid email address"),
//   username: z.string().min(3, "* Username must be at least 3 characters"),
//   password: z.string().min(6, "* Password must be at least 6 characters"),
// });

// /*
//   Typically I would create a FormType here and pass it to useForm<>, BUT since we already created our
//   Zod register schema, we can INFER the type from it:
// */

// type RegisterFormData = z.infer<typeof registerSchema>;

// // Made this file to make a client component without converting whole sign up page to client component.
// // This way, our sign up page is still a server component and we can do server side logic in it.

// // In this client component, we can now use Zod (form validation) and React Hook Form (form handling).
// // Installed and connected both using: npm i react-hook-form Zod @hookform/resolvers

// export default function SignupComponent() {
//   // to redirect to home page once user registers
//   // next.js router instance
//   const router = useRouter();
//   // from React Hook Form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterFormData>({
//     // "Register" connects React Hook Form to form input
//     // Connecting react hook form to Zod
//     resolver: zodResolver(registerSchema), // Passing in Zod instance we created
//   });

//   // Checking for server error
//   // Will sending data inside function so async
//   const onSubmit = async (data: RegisterFormData) => {
//     // console.log(data);
//     try {
//       const res = await axios.post("/api/auth/register", data); //Because the register route takes a post request

//       if (res.status === 201) {
//         // -----login the user here automatically if they registered
//         const res = await signIn("credentials", {
//           email: data.email,
//           password: data.password,
//           redirect: false,
//         });

//         if (!res.error) {
//           reset();
//           router.replace("/home");
//         }

//         // alert("Registration successful");
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         setError("root", {
//           message: error.response?.data.error || "Something went wrong",
//         });
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left side - Logo & Message */}
//       <div className="w-1/3 relative bg-blue-primary/30 flex flex-col items-center justify-center border-r border-white">
//         {/* logo
//         <FaStarHalfAlt size={50} color="black" className="mb-5" /> */}
//         <h1 className="text-4xl font-bold text-white mb-4">
//           <p> Create an account </p>
//         </h1>
//         <p className="text-lg text-black font-semibold text-center px-11">
//           Join the best platform for{" "}
//           <span className="text-black">saving</span> and{" "}
//           <span className="text-black">sharing</span> your{" "}
//           <span className="text-black">bites</span>.
//         </p>
//       </div>

//       {/* Right side of screen - Signup Form */}
//       <div className="w-2/3 flex items-center ml-20 bg-dark-1">
//         <div className="max-w-[320px] w-[90%]">
//           {/* logo */}
//           <div className="flex items-center gap-2 mb-4">
//             <FaStarHalfAlt size={40} color="#4076dbea" />
//             <span className="text-3xl font-semibold tracking-wide text-white">
//               Bite
//             </span>
//           </div>

//           {/* heading */}
//           {/* <h2 className="text-center text-3xl font-semibold mb-3 text-gray-200">
//             Create a new account
//           </h2> */}
//           <p className="text-gray-400 text-sm">
//             To use Bite, please enter your details
//           </p>

//           {/* form */}
//           <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
//             {errors.root && (
//               // FIRST handling root error for form not submitting due to existing user
//               <p className="py-2 text-red-500 text-sm">{errors.root.message}</p>
//             )}

//             {/* Registering 4 input fields */}
//             <input
//               {...register("name")}
//               type="text"
//               placeholder="Full Name"
//               className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
//             )}

//             <input
//               {...register("email")}
//               type="text"
//               placeholder="Email Address"
//               className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mb-2">
//                 {errors.email.message}
//               </p>
//             )}

//             <input
//               {...register("username")}
//               type="text"
//               placeholder="Username"
//               className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mb-2">
//                 {errors.username.message}
//               </p>
//             )}

//             <input
//               {...register("password")} // Now all inputs are connected to React Hook Form
//               type="password" // changed from text to password
//               placeholder="Password"
//               className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mb-2">
//                 {errors.password.message}
//               </p>
//             )}

//             <button
//               disabled={isSubmitting} // so button disabled when it is submitting currently
//               className="bg-blue-primary w-full my-2 py-2.5 text-white rounded-lg cursor-pointer"
//             >
//               {isSubmitting ? "Signing up..." : "Sign up"}{" "}
//               {/* using isSubmitting boolean to disable sign up button */}
//             </button>
//           </form>

//           <div className="my-3 text-center text-white">
//             <span> Already have an account?</span>
//             <Link href="/" className="ml-2 text-blue-primary">
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

//------------------------------------------------------------------------------------
// DIFFERENT layout option if needed:
//------------------------------------------------------------------------------------
// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import Link from "next/link";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaStarHalfAlt } from "react-icons/fa";
// import z from "zod";

// // Creating Zod instance
// const registerSchema = z.object({
//   name: z.string().min(2, "* Name is required"),
//   email: z.email("* Invalid email address"),
//   username: z.string().min(3, "* Username must be at least 3 characters"),
//   password: z.string().min(6, "* Password must be at least 6 characters"),
// });

// /*
//   Typically I would create a FormType here and pass it to useForm<>, BUT since we already created our
//   Zod register schema, we can INFER the type from it:
// */

// type RegisterFormData = z.infer<typeof registerSchema>;

// // Made this file to make a client component without converting whole sign up page to client component.
// // This way, our sign up page is still a server component and we can do server side logic in it.

// // In this client component, we can now use Zod (form validation) and React Hook Form (form handling).
// // Installed and connected both using: npm i react-hook-form Zod @hookform/resolvers

// export default function SignupComponent() {
//   // from React Hook Form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterFormData>({
//     // "Register" connects React Hook Form to form input
//     // Connecting react hook form to Zod
//     resolver: zodResolver(registerSchema), // Passing in Zod instance we created
//   });

//   // Checking for server error
//   // Will sending data inside function so async
//   const onSubmit = async (data: RegisterFormData) => {
//     // console.log(data);
//     try {
//       const res = await axios.post("/api/auth/register", data); //Because the register route takes a post request

//       if (res.status === 201) {
//         // -------------login the user here automatically if they registered
//         alert("Registration successful");
//         reset();
//       }
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         setError("root", {
//           message: error.response?.data.error || "Something went wrong",
//         });
//       }
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div className="max-w-[320px] w-[90%]">
//         {/* logo */}
//         <div className="flex items-center gap-2 justify-center mb-8">
//           <FaStarHalfAlt size={40} color="#4076dbea" />
//           <span className="text-3xl font-semibold tracking-wide text-gray-400">
//             Bite
//           </span>
//         </div>

//         {/* heading */}
//         <h2 className="text-center text-3xl font-semibold mb-3 text-gray-200">
//           Create a new account
//         </h2>
//         <p className="text-gray-500 text-center text-sm">
//           To use Bite, please enter your details
//         </p>

//         {/* form */}
//         <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
//           {errors.root && ( // FIRST handling root error for form not submitting due to existing user
//             <p className="py-2 text-red-500 text-sm">{errors.root.message}</p>
//           )

//            // Registering 4 input fields
//           }
//           <input
//             {...register("name")}
//             type="text"
//             placeholder="Full Name"
//             className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
//           )}

//           <input
//             {...register("email")}
//             type="text"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
//           )}

//           <input
//             {...register("username")}
//             type="text"
//             placeholder="Username"
//             className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//           />
//           {errors.username && (
//             <p className="text-red-500 text-sm mb-2">
//               {errors.username.message}
//             </p>
//           )}

//           <input
//             {...register("password")} // Now all inputs are connected to React Hook Form
//             type="text" // ?? Should be password or text ??
//             placeholder="Password"
//             className="w-full px-4 py-3 placeholder-text-gray-400 bg-dark-3 rounded-lg outline-none text-gray-100 my-3"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mb-2">
//               {errors.password.message}
//             </p>
//           )}

//           <button
//             disabled={isSubmitting} // so button disabled when it is submitting currently
//             className="bg-blue-primary w-full my-2 py-2.5 text-white rounded-lg cursor-pointer"
//           >
//             {
//               isSubmitting ? "Signing up..." : "Sign up" // using isSubmitting boolean to disable sign up button
//             }
//           </button>
//         </form>

//         <div className="my-3 text-center text-white">
//           <span> Already have an account?</span>
//           <Link href="/" className="ml-2 text-blue-primary">
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
