import { ShoppingCart, CreditCard, Truck, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    name: "Seamless Shopping",
    description:
      "Enjoy a smooth and intuitive shopping experience with easy product discovery and quick checkout.",
    icon: ShoppingCart,
  },
  {
    name: "Secure Payments",
    description:
      "Multiple payment options with robust security to keep your transactions safe and reliable.",
    icon: CreditCard,
  },
  {
    name: "Fast Delivery",
    description:
      "Get your orders delivered quickly and track your shipments in real-time.",
    icon: Truck,
  },
  {
    name: "Exclusive Deals",
    description:
      "Benefit from special offers, discounts, and loyalty rewards tailored just for you.",
    icon: DollarSign,
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-screen h-auto pb-24 sm:pb-32 overflow-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base montserrat font-semibold text-pri">
            Shop smarter
          </h2>
          <p className="crimson-pro mt-2 text-4xl font-semibold tracking-tight text-txt sm:text-5xl">
            Everything you need for a modern ecommerce experience
          </p>
          <p className="mt-6 text-lg text-gray-400 montserrat">
            Discover, shop, and save with our all-in-one ecommerce platform
            designed for your convenience.
          </p>
          <br />
          <Link
            to="/product"
            className="text-pri p-2 font-semibold border-pri border-2 rounded montserrat hover:bg-pri hover:text-black transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:max-w-none lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-pri montserrat">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-xl bg-pri shadow-md">
                    <feature.icon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-gray-400 crimson-pro text-lg">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
