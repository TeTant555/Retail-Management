import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store";
import { toast } from "sonner";
import { clearCart } from "@/store/features/cartSlice";
import api from "@/api";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";

const Transaction = () => {

  // State
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = useAppSelector((state) => state.cart.total);
  const dispatch = useAppDispatch();

  // API
  const { mutate: addOrder } = api.order.addOrder.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: () => {
      dispatch(clearCart());
    },
    onError: (error) => {
      console.error("Error during registeration" ,error);
    },
    onSettled: () => {
      dispatch(hideLoader());
    }
  })

  // Handlers
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        className: "!bg-bgu !text-pri montserrat",
        classNames: {
          title: "text-md",
          description: "text-sm crimson-pro !text-sec",
          actionButton: "!bg-pri !text-black",
        },
      });
      return;
    }
    cartItems.forEach((item) => {
      addOrder({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        orderDate: item.orderDate,
        userId: item.userId,
      })
    })
    toast.success("Order placed successfully!", {
      className: "!bg-bgu !text-pri montserrat",
      classNames: {
        title: "text-md",
        description: "text-sm crimson-pro !text-sec",
        actionButton: "!bg-pri !text-black",
      },
    });
  };

  return (
    <div>
      <Card className="bg-bgu border-0">
        <CardHeader>
            <CardTitle className="montserrat text-3xl">Transaction</CardTitle>
            <CardDescription className="text-gray-400 crimson-pro text-lg">The list of your orders through transaction</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-col gap-3">
            {cartItems.map((item) => (
              <div key={item.productId} className="text-xs sm:text-sm flex montserrat justify-between">
                <p>{item.productName} x {item.quantity}</p>
                <p>{item.price * item.quantity} MMK</p>
              </div>
            ))}
            {cartItems.length === 0 && (
              <div className="text-center text-gray-400 montserrat py-4">
                No items in cart
              </div>
            )}
            <div className="h-0.5 bg-pri w-full mt-2"></div>
            <div className="flex text-sm montserrat justify-between">
                <p>Sales Tax</p>
                <p>Included</p>
            </div>
            <div className="h-0.5 bg-pri w-full mt-2"></div>
            <div className="flex montserrat justify-between text-sm">
                <p>Total</p>
                <p>{total} MMK</p>
            </div>
            <Button 
              className="bg-pri text-black montserrat hover:bg-pri/80 rounded mt-1"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transaction;
