import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import { CalendarDays } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/store/features/cartSlice";
import { toast } from "sonner";

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  img: string;
  orderDate: Date;
}

const OrderCard = () => {

  // Chunk
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const API_BASE_URL = "http://localhost:5164";

  // Amount handlers
  const handleIncrement = (item: CartItem) => {
    dispatch(updateQuantity({ 
      productId: item.productId, 
      quantity: item.quantity + 1 
    }));
  };
  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        productId: item.productId, 
        quantity: item.quantity - 1 
      }));
    }
  };

  // Remove cart item
  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart", {
      className: "!bg-bgu !text-pri montserrat",
      classNames: {
        title: "text-md",
        description: "text-sm crimson-pro !text-sec",
        actionButton: "!bg-pri !text-black",
      },
    });
  };

  // No value rendering
  if (cartItems.length === 0) {
    return (
      <div className="bg-bgu rounded font-semibold text-center py-8 text-gray-400 montserrat">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <Card key={item.productId} className="bg-bgu border-0">
          <CardContent className="gap-5 flex flex-col sm:flex-row">
            <img
              src={`${API_BASE_URL}/${item.img}`}
              alt={item.productName}
              width={600}
              height={400}
              className="w-full h-64 object-cover rounded-xl basis-1/3"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="basis-2/3 flex flex-col gap-4">
              <div>
                <CardTitle className="text-3xl montserrat">{item.productName}</CardTitle>
                <div className="crimson-pro text-xl text-gray-400 mt-3">{item.price} MMK</div>
              </div>
              <div className="badges mt-4">
                <button className="yellow crimson-pro">Pending</button>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <p className="montserrat">Quantity</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-txt size-8 hover:bg-transparent hover:text-txt/80"
                    onClick={() => handleDecrement(item)}
                  >
                    <LuMinus className="h-4 w-4" />
                  </Button>
                  <div className="border text-pri border-pri px-4 py-1 rounded-md">
                    <span className="montserrat text-md">{item.quantity}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-txt size-8 hover:bg-transparent hover:text-txt/80"
                    onClick={() => handleIncrement(item)}
                  >
                    <LuPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 mt-auto">
                <Button 
                  className="border-2 w-30 border-red-700 text-red-400 hover:bg-red-700 hover:text-red-200 transition-colors duration-300 rounded montserrat"
                  onClick={() => handleRemove(item.productId)}
                >
                  Cancel
                </Button>
                <Badge className="bg-pri tracking-widest w-30 text-xs rounded text-black montserrat">
                  <CalendarDays className="mr-1" /> 
                  {new Date(item.orderDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderCard;
