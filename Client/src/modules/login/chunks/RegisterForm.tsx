import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import api from "@/api";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { setUserData } from "@/store/features/authSlice";
import { toast } from "sonner";
import { setOtp } from "@/store/features/verifySlice";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  // Chunk
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Schema
  const FormSchema = z.object({
    username: z.string().min(3, { message: "Name must be 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4, { message: "Password must be 4 characters long" }),
    confirmPassword: z.string().min(4, { message: "Password must be 4 characters long" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ["confirmPassword"],
  });

  // Register State
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add this line
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // API
  const { mutate: registerUser } = api.register.addRegister.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      // console.log("API Data", data);
      if (data.status == "Y" || data.otp == null) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast("Error during Login", {
          description: "User already exists. Register Failed",
          action: {
            label: "Retry",
            onClick: () => console.log("Retry"),
          },
          className: "!bg-bgu !text-pri montserrat",
          classNames: {
            title: "text-md",
            description: "text-sm crimson-pro !text-sec",
            actionButton: "!bg-pri !text-black" 
          }
        })
      } else {
      const payload = {
        email: data.email,
        userId: data.userID, // Assuming userId is returned from the API
      };
      dispatch(setUserData(payload));
      dispatch(setOtp(data.otp));
      navigate("/login/otp", { replace: true });
      }
    },
    onError: (error) => {
      console.error("Error during registration:", error);
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  // Form Handler
  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});
    // Validate with Zod
    const result = FormSchema.safeParse({
      username: userName,
      email,
      password,
      confirmPassword,
    });
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      const userData: AddRegisterType = { userName, email, password, confirmPassword };
      await registerUser(userData);
    } catch (error: unknown) {
      let apiMessage = "Registration failed. Please try again.";
      if (typeof error === "object" && error && "response" in error) {
        const errObj = error as { response?: { data?: { message?: string } } };
        apiMessage = errObj.response?.data?.message || apiMessage;
      }
      setErrorMessage(apiMessage);
      console.error("Registration error:", error);
    }
  };

  // Verify email mutation
  

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={onSubmit}>
      {errorMessage && (
        <div className="text-red-500 text-center font-semibold">{errorMessage}</div>
      )}
      {/* Username */}
      <div className="grid gap-3">
        <Label htmlFor="username" className="text-pri font-semibold montserrat">
          Username
        </Label>
        <input
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="text"
          placeholder={fieldErrors.username || "Enter your name"}
          required
          className={`bg-black ${fieldErrors.username ? "text-txt border-red-500" : "text-sec !border-pri"} border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-0 ring-0`}
        />
      </div>

      {/* Email */}
      <div className="grid gap-3">
        <Label htmlFor="email" className="text-pri font-semibold montserrat">
          Email
        </Label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          placeholder={fieldErrors.email || "example@gmail.com"}
          required
          className={`bg-black ${fieldErrors.email ? "text-txt border-red-500" : "text-sec !border-pri"} border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-0 ring-0`}
        />
      </div>

      {/* Password */}
      <div className="grid gap-3">
        <Label
          htmlFor="password"
          className="text-pri font-semibold montserrat"
        >
          Password
        </Label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={fieldErrors.password || "********"}
            required
            className={`bg-black w-full ${fieldErrors.password ? "text-txt border-red-500" : "text-sec !border-pri"} border-2 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-0 ring-0 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute inset-y-0 right-3 flex items-center ${fieldErrors.password ? "text-red-500" : "text-pri"}`}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="grid gap-3">
        <Label
          htmlFor="confirmPassword"
          className="text-pri font-semibold montserrat"
        >
          Confirm Password
        </Label>
        <div className="relative">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            // Only show the length error as placeholder, not the match error
            placeholder={
              fieldErrors.confirmPassword && fieldErrors.confirmPassword.includes("4 characters")
                ? fieldErrors.confirmPassword
                : "********"
            }
            required
            className={`bg-black w-full ${fieldErrors.confirmPassword ? "text-txt border-red-500" : "text-sec !border-pri"} border-2 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-0 ring-0 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className={`absolute inset-y-0 right-3 flex items-center ${fieldErrors.confirmPassword ? "text-red-500" : "text-pri"}`}
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {/* Show the match error only as a message below the input */}
        {fieldErrors.confirmPassword && fieldErrors.confirmPassword === "Password and confirm password must be same" && (
          <div className="text-red-500 text-md crimson-pro mt-1">{fieldErrors.confirmPassword}</div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full !text-sw text-lg crimson-pro bg-pri hover:bg-pri/90"
      >
        Register
      </Button>

      {/* Or Continue With */}
      <div className="bg-grid relative text-center text-sm">
        <div className="after:border-sec relative after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-black text-sec relative z-10 px-2 crimson-pro text-md">
            Or continue with
          </span>
        </div>
      </div>

      {/* Already Have Account */}
      <div className="text-center crimson-pro text-md text-sec">
        Already have an account?{" "}
        <Link
          to=".."
          className="underline underline-offset-4 crimson-pro text-md"
          relative="path"
        >
          Login
        </Link>
      </div>
    </form>
  );
}