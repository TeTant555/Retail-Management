type HistoryType = {
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

type HistoryResponse = {
    message: string;
    status: number;
    data: HistoryType[];
}