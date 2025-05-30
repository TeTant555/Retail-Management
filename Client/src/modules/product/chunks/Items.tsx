import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductPagination from "../../../components/pagination"; // Import your pagination component
import { useState } from "react";
import api from "@/api";
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

const Items = () => {

  // Chunk
  const ITEMS_PER_PAGE = 8;
  const dispatch = useDispatch();

  // API
  const { data: products } = api.product.getProduct.useQuery();
  const API_BASE_URL = "http://localhost:5164";

  // State and redux store
  const cart = useAppSelector((state) => state.cart.items);
  const userId = useAppSelector((state) => state.auth.userId);
  const handleAddToCart = (product: Product) => {
    const exists = cart.some((item) => item.productId === product.productId);
    if (exists) return; // Prevent dispatching
    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.name,
        price: product.price,
        quantity: 1,
        img: product.img,
        orderDate: new Date(),
        userId: userId,
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

  // Showing only 8 items on one page
  const [page, setPage] = useState(1);
  const safeProducts = products ?? [];
  const totalPages = Math.ceil(safeProducts.length / ITEMS_PER_PAGE);
  const paginatedData = safeProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="pb-12 pt-5">
      <nav className="flex justify-between mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-3xl crimson-pro text-pri">Products</div>
        <Button className="montserrat">Stock: {products?.length}</Button>
      </nav>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedData.map((product, idx) => (
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
              <CardHeader className="text-txt text-wrap montserrat text-sm font-semibold">
                <div className="line-clamp-2 min-h-[2.5em]">{product.name}</div>
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
                        disabled={cart.some((item) => item.productId === product.productId)}
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
        </div>
        <div className="flex justify-center mt-8">
          <ProductPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Items;
