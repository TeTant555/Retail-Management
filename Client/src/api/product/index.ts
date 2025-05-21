import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getProduct = {
    useQuery: (opt?: Partial<UseQueryOptions<ProductType[], Error>>) => {
        return useQuery<ProductType[], Error>({
            queryKey: ['product'],
            queryFn: async () => {
                const request = await axios.get(`Product`);
                return request.data.data; 
            },
            ...opt
        })
    }
}