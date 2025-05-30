type AddOrder = {
    productId: number;
    productName: string;
    quantity: number;
    orderDate: Date;
    userId: number;
}

type OrderItem = {
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    profit: number;
    isOrder: string;
    totalPrice: number;
    totalProfit: number;
    saleDate: Date;
}

type OrderConfirmationResponse = {
  message: string;
  status: number;
  data: {
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    profit: number;
    isOrder: string;
    totalPrice: number;
    totalProfit: number;
    saleDate: string; 
    userId: number;
  };
};