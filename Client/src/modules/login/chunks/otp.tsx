"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useDispatch } from "react-redux";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";

// Validation schema
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP = () => {
  // Chunk
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const email = useAppSelector((state) => state.auth.email);
  const verifyotp = useAppSelector((state) => state.verify.otp);

  // API
  const { mutate: verifyOtp } = api.otp.addOtp.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      toast(data.message, {
        description: "Enter your email and password to login to your account",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        className: "!bg-bgu !text-pri montserrat",
        classNames: {
          title: "text-md",
          description: "text-sm crimson-pro !text-sec",
        },
      });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Error during OTP verification:", error);
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Add onChange handler to ensure only numbers are entered
  const handlePinChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    form.setValue('pin', numericValue);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (Number(data.pin) == verifyotp) {
      verifyOtp({
        email: email,
        otp: Number(data.pin),
      });
    } else {
      form.reset({ pin: "" });
      toast("OTP Error", {
        description: "The code you entered is incorrect",
        action: {
          label: "Retry",
          onClick: () => console.log("Retry"),
        },
        className: "!bg-bgu !text-pri montserrat",
        classNames: {
          title: "text-md",
          description: "text-sm crimson-pro !text-sec",
          actionButton: "!bg-pri !text-black" 
        },
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Back button at the top */}
      <button
        type="button"
        className="montserrat self-start mb-6 flex items-center gap-2 text-sec hover:underline"
        onClick={() => window.history.back()}
        aria-label="Go back"
      >
        <LuArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xs space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-3xl montserrat !text-pri mb-2">
                  Email Verification
                </FormLabel>
                <FormControl>
                  <InputOTP 
                    maxLength={6} 
                    {...field}
                    onChange={(value) => handlePinChange(value)}
                    inputMode="numeric"
                  >
                    <InputOTPGroup className="border-1 border-pri">
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={0}
                        inputMode="numeric"
                      />
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={1}
                        inputMode="numeric"
                      />
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={2}
                        inputMode="numeric"
                      />
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={3}
                        inputMode="numeric"
                      />
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={4}
                        inputMode="numeric"
                      />
                      <InputOTPSlot
                        className="p-5 text-sec border-1 border-pri"
                        index={5}
                        inputMode="numeric"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <span className="text-pri text-sm crimson-pro">OTP will expire in 10 minutes</span>
                <FormDescription className="crimson-pro text-md text-sec mt-2">
                  Introduce the 6-digit verification code sent to {email}. <br />
                  <FormMessage className="text-sec text-md crimson-pro" />
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full montserrat text-black hover:bg-pri/80 bg-pri font-semibold"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OTP;
