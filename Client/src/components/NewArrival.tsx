import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import api from "@/api";
import Shopping from "@/assets/shopping.jpg";

const NewArrival = () => {

  // API
  const { data: products, isLoading } = api.product.getProduct.useQuery();
  const [showAll, setShowAll] = useState(false);
  const API_BASE_URL = "http://localhost:5164/wwwroot";

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
    return <div className="py-24 montserrat text-pri text-2xl text-center">No new arrivals found.</div>;
  }

  // Show only 4 products if not showing all
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="py-24">
      <nav className="flex justify-between mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-3xl crimson-pro">New Arrival</div>
        <Button className="montserrat">Stock: {products.length}</Button>
      </nav>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, idx) => (
            <Card key={product.productId || idx} className="w-full bg-bgu border-0">
              <CardContent>
                <img
                  src={product.img ? `${API_BASE_URL}${product.img}` : Shopping}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </CardContent>
              <CardFooter className="text-gray-400 crimson-pro text-md">
                {product.price}
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
