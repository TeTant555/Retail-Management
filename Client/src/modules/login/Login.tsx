import { Store } from 'lucide-react';
import { Outlet } from "react-router-dom";
import shopping from "@/assets/shopping.json";
import Lottie from "lottie-react";

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start montserrat font-semibold text-sec">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Store className="size-4 text-pri bg-bgu" />
            </div>
            Fusion Market
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block h-screen">
        <Lottie
          animationData={shopping}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Login;
