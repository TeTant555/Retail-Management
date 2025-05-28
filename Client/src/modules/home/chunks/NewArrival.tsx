import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useState } from "react";
import api from "@/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addToCart } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store";

interface Product {
  productId: number;
  name: string;
  price: number;
  img: string;
  stock: number;
  createdDate: string;
}

const NewArrival = () => {
  
  // Chunk
  const dispatch = useDispatch();

  // Product Data API
  const { data: products, isLoading } = api.product.getProduct.useQuery();
  const [showAll, setShowAll] = useState(false);
  const API_BASE_URL = "http://localhost:5164";

  // Sorting Latest Data
  const sortedProducts = products
    ? [...products].sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      )
    : [];
  const latestProducts = sortedProducts.slice(0, 8);

  // State and redux store
  const userId = useAppSelector((state) => state.auth.userId);
  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.name,
        price: product.price,
        quantity: 1,
        img: product.img,
        orderDate: new Date(),
        userId: userId
      })
    );
    toast.success("Added to cart successfully!", {
      className: "!bg-bgu !text-pri montserrat",
      classNames: {
        title: "text-md",
        description: "text-sm crimson-pro !text-sec",
        actionButton: "!bg-pri !text-black",
      },
    });
  };

  // Show skeletons while loading
  if (isLoading) {
    return (
      <div className="py-24">
        <nav className="flex justify-between mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-3xl crimson-pro">New Arrival</div>
          <Button className="montserrat">Stock: 8</Button>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <Skeleton key={idx} className="h-96 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Fallback if no products
  if (!products || products.length === 0) {
    return (
      <div className="py-24 montserrat text-pri text-2xl text-center">
        No new arrivals found.
      </div>
    );
  }

  // Show only 4 products if not showing all
  const visibleProducts = showAll ? latestProducts : latestProducts.slice(0, 4);

  return (
    <div className="py-24">
      <nav className="flex justify-between mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-3xl crimson-pro">New Arrival</div>
        <Button className="montserrat font-semibold">Stock: 8</Button>
      </nav>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, idx) => (
            <Card
              key={product.productId || idx}
              className="w-full bg-bgu border-0"
            >
              <CardHeader className="flex justify-between montserrat">
                <CardTitle>Fusion Market</CardTitle>
                <CardTitle>Stock {product.stock}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`${API_BASE_URL}/${product.img}`}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-70 object-cover rounded-xl"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </CardContent>
              <CardHeader className="text-txt text-nowrap montserrat text-sm font-semibold">
                {product.name}
              </CardHeader>
              <CardFooter className="text-gray-400 flex justify-between crimson-pro text-lg">
                <p>{product.price} MMK</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-black montserrat text-xs font-semibold text-pri border-2 border-pri hover:bg-pri hover:text-black transition-colors duration-300">
                      Add to cart
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-bgu rounded text-txt border-0">
                    <DialogHeader>
                      <DialogTitle className="montserrat text-xl font-semibold">
                        Order Item
                      </DialogTitle>
                      <DialogDescription className="text-gray-400 text-md crimson-pro">
                        Review your selected item below. Confirm your order when
                        you're ready.
                      </DialogDescription>
                    </DialogHeader>
                    <img
                      src={`${API_BASE_URL}/${product.img}`}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="w-full h-70 object-cover rounded-xl"
                      style={{ aspectRatio: "600/400", objectFit: "cover" }}
                    />
                    <DialogFooter className="text-gray-400 crimson-pro text-lg">
                      <DialogClose>
                        <Button className="w-23 bg-black montserrat text-xs font-semibold text-pri border-2 border-pri hover:bg-pri hover:text-black transition-colors duration-300">
                          Close
                        </Button>
                      </DialogClose>
                      <Button 
                        className="w-23 bg-black montserrat text-xs font-semibold text-pri border-2 border-pri hover:bg-pri hover:text-black transition-colors duration-300"
                        onClick={() => handleAddToCart(product)}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
          {/* Show All button for small screens */}
          {!showAll && products.length > 4 && (
            <div className="block lg:hidden col-span-1 sm:col-span-2 relative -mt-6">
              {/* Mask/gradient background */}
              <div className="absolute inset-x-0 bottom-10 h-20 bg-gradient-to-t from-pri/75 via-pri/30 to-transparent pointer-events-none rounded-b-xl mask-x-from-80% mask-x-to-100% mask-b-from-90% mask-b-to-100% " />
              <div className="relative flex justify-center items-end h-20">
                <Button
                  className="text-sec mb-13 crimson-pro border-0 shadow-none text-xl z-10 pointer-events-auto"
                  onClick={() => setShowAll(true)}
                >
                  Show All
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* Show All button with mask for large screens */}
        {!showAll && products.length > 4 && (
          <div className="hidden lg:flex absolute inset-x-0 bottom-0 justify-center pointer-events-none">
            <div className="w-full flex justify-center relative">
              <div className="w-full text-sec h-28 absolute bottom-0 left-0 top-6 bg-gradient-to-t from-pri/75 via-pri/30 to-transparent mask-x-from-80% mask-x-to-100% mask-b-from-90% mask-b-to-100% pointer-events-none" />
              <div className="relative flex justify-center items-end h-28">
                <Button
                  className="mt-4 text-sec crimson-pro bg-transparent border-0 shadow-none text-xl z-10 pointer-events-auto"
                  onClick={() => setShowAll(true)}
                >
                  Show All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
