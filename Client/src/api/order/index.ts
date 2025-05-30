import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

export const addOrder = {
  useMutation: (
    opt?: Partial<UseMutationOptions<OrderItem, Error, AddOrder>>
  ) => {
    return useMutation<OrderItem, Error, AddOrder>({
      mutationFn: async (order) => {
        const request = await axios.post(`Order/Add`, order);
        return request.data.data;
      },
      ...opt,
    });
  },
};

export const orderConfirm = {
  useMutation: (
    opt?: Partial<UseMutationOptions<OrderConfirmationResponse, Error, number>>
  ) => {
    return useMutation<OrderConfirmationResponse, Error, number>({
      mutationFn: async (id: number) => {
        const response = await axios.post(`/Confirm/Confirm?id=${id}`);
        return response.data;
      },
      ...opt
    });
  }
};