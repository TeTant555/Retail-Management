import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import ProductPagination from "./pagination"; // Import your pagination component

import { useState } from "react";

// Set cardData to 24 items
const cardData = Array(24).fill({
  title: "Title",
  description: "Here is the card description.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum in incidunt necessitatibus deserunt. Architecto, cupiditate quia optio quam alias explicabo quae voluptates ex nostrum beatae nemo, eius hic perspiciatis. Possimus?",
  footer: "Here is the card footer.",
});

const ITEMS_PER_PAGE = 8;

const Items = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(cardData.length / ITEMS_PER_PAGE);
  const paginatedData = cardData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="py-24">
      <nav className="flex justify-between mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-3xl crimson-pro">Products</div>
        <Button className="montserrat">Stock: 24</Button>
      </nav>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedData.map((card, idx) => (
            <Card key={idx} className="w-full bg-bgu border-0">
              <CardHeader>
                <CardTitle className="text-2xl montserrat">{card.title}</CardTitle>
                <CardDescription className="crimson-pro text-md text-gray-400">{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full rounded-xl h-50 bg-black" />
              </CardContent>
              <CardFooter className="text-gray-400 crimson-pro text-md">{card.footer}</CardFooter>
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
