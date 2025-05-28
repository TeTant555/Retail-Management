import OrderCard from "./chunks/OrderCard";
import Transaction from "./chunks/Transaction";
import { Footer } from "@/components/footer";

const Cart = () => {
  return (
    <div className="pb-24 pt-11 w-screen">
      <div className="w-screen mb-11 text-center">
        <p className="text-pri text-4xl crimson-pro">Fusion Market</p>
      </div>
      <div className="container pb-17 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-5 justify-center">
        <div className="lg:w-2/3 max-w-full">
          <OrderCard />
        </div>
        <div className="lg:w-1/3 max-w-full">
          <Transaction />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;