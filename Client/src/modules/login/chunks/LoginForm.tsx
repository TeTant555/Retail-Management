import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import useAuth from "@/hooks/useAuth";
import { setUserData } from "@/store/features/authSlice";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { userLogin } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);

  // Chunk
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, {
      message: "Password must be 4 characters long",
    }),
  });

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState("");

  // API
  const { mutate: loginUser } = api.login.addLogin.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      const payload = {
        userId: data.userId,
        email: data.email,
      };
      dispatch(setUserData(payload));
      userLogin(data.token);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error(error)
      console.error("Error during login:", error);
      setEmail("");
      setPassword("");
      setErrorMessage("Invalid email or password");
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  // Form Handler
  const onSubmit = async () => {
    try {
      setFieldErrors({});
      LoginSchema.parse({ email, password });
      const userData: AddLoginType = { email, password };
      await loginUser(userData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map errors to fields
        const errors: { email?: string; password?: string } = {};
        error.errors.forEach((e) => {
          if (e.path[0] === "email") errors.email = e.message;
          if (e.path[0] === "password") errors.password = e.message;
        });
        setErrorMessage("Invalid email or password");
        setFieldErrors(errors);
        setEmail("");
        setPassword("");
        console.error("Validation errors:", errors);
      } else if (error) {
        setErrorMessage("Invalid email or password");
        console.error("Error during login:", error);
      } else {
        console.error(error);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold montserrat text-pri">Login to your account</h1>
        <p className="text-muted-foreground text-balance crimson-pro text-md">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-pri font-semibold montserrat">
            Email
          </Label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
            placeholder={fieldErrors.email || errorMessage ? errorMessage : "example@gmail.com"}
            required
            className={fieldErrors.email || errorMessage 
              ? "bg-black text-txt !border-red-500 !border-2 rounded-lg px-4 py-2 pr-10 ring-0 focus:outline-none focus-visible:ring-0" 
              : "bg-black text-sec !border-pri border-2 rounded-lg px-4 py-2 pr-10 ring-0 focus:outline-none focus-visible:ring-0"}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-pri font-semibold montserrat">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-md text-sec underline-offset-4 hover:underline crimson-pro font-semibold"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder={fieldErrors.password ? fieldErrors.password : "********"}
              required
              className={fieldErrors.password || errorMessage
                ? "bg-black text-txt w-full !border-red-500 !border-2 rounded-lg px-4 py-2 pr-10 ring-0 focus:outline-none focus-visible:ring-0"
                : "bg-black text-sec w-full !border-pri border-2 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-0 ring-0 pr-10"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={fieldErrors.password || errorMessage
                ? "absolute inset-y-0 right-3 flex items-center text-red-500"
                : "absolute inset-y-0 right-3 flex items-center text-pri"
              }
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full !text-sw text-lg crimson-pro bg-pri hover:bg-pri/90">
          Login
        </Button>
        <div className="bg-grid relative text-center text-sm">
          <div className="after:border-sec relative after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-black text-sec relative z-10 px-2 crimson-pro text-md">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <div className="text-center crimson-pro text-md text-sec">
        Don&apos;t have an account?{" "}
        <Link to="register" className="underline underline-offset-4 crimson-pro text-md">
          Sign up
        </Link>
      </div>
    </form>
  );
}