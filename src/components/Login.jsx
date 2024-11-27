import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const [formData, setFormData] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useGSAP(() => {
    gsap.from(".login", {
      scale: 0,
      opacity: 0,
      duration: 1,
     
    });
  });

  useGSAP(() => {
    gsap.from(".login-btn", {
      y:30,
      opacity: 0,
      duration: 0.5,
      delay:1,
      ease: "power2.out",
     
    });
  });

  useGSAP(() => {
    gsap.from(".google-btn", {
      y:30,
      opacity: 0,
      duration: 0.5,
      delay:1.5,
      ease: "power2.out",
    });
  });





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data) => {
    console.log("dataaa", data);

    // e.preventDefault();
    // const { email, password } = formData;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setSuccess("Login successful!");
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Invalid email or password.");
      setLoading(false);
      setSuccess("");
    }

    // Optionally reset the form (comment this out if you want to keep user input)
    setFormData({ email: "", password: "" });
  };

  const signupWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="  login w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
          
            type="submit"
            disabled={loading}
            className="login-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <div className="flex items-center justify-center ">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-white-200 animate-spin dark:text-white-600 fill-blue-800 ." 
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </>
            ) : (
              <>Login</>
            )}
          </button>
          <button
            onClick={() => signupWithGoogle()}
            type="button"
            disabled={loading}
            className="google-btn w-full flex items-center justify-center gap-2  text-slate-900 border-red-700 border-2 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign In with Google
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
