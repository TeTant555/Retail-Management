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
import { setOrderId } from "@/store/features/orderSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const Transaction = () => {

  // State
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = useAppSelector((state) => state.cart.total);
  const orderId = useAppSelector((state) => state.order.orderId);
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  // API for order adding
  const { mutate: addOrder } = api.order.addOrder.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      dispatch(setOrderId(data.orderId));
    },
    onError: (error) => {
      console.error("Error during registeration" ,error);
    },
    onSettled: () => {
      dispatch(hideLoader());
    }
  })

  // API for order confirming
  const { mutate: confirmOrder } = api.order.orderConfirm.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      toast.success(data.message, {
        className: "!bg-bgu !text-pri montserrat",
        classNames: {
          title: "text-md",
          description: "text-sm crimson-pro !text-sec",
          actionButton: "!bg-pri !text-black",
        },
    });
    dispatch(clearCart());
    setDialogOpen(false);
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
    setDialogOpen(true);
  };

  const handleConfirm = () => {
  if (typeof orderId === "number") {
    confirmOrder(orderId);
  } else {
    toast.error("Order ID is missing.");
  }
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

      {/* Dialog for order confirmation */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-bgu rounded text-txt border-0 max-w-md">
          <DialogHeader>
            <DialogTitle className="montserrat text-xl font-semibold">
              Confirm Your Order
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-md crimson-pro">
              Please review your order before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 my-2">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 montserrat py-4">
                No items in cart
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm montserrat"
                >
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <span>{item.price * item.quantity} MMK</span>
                </div>
              ))
            )}
            <div className="flex justify-between text-md font-semibold mt-4">
              <span>Total</span>
              <span>{total} MMK</span>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button className="border-2 w-25 border-red-700 text-red-400 hover:bg-red-700 hover:text-red-200 transition-colors duration-300 rounded montserrat">
                Close
              </Button>
            </DialogClose>
            <Button
              className="bg-pri w-25 text-black montserrat hover:bg-pri/80 rounded"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transaction;
