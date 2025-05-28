import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import axios from "axios";

export const getById = {
    useQuery: (userId: number, opt?: Partial<UseQueryOptions<HistoryType[], Error>>) => {
        return useQuery<HistoryType[], Error>({
            queryKey: ['history', userId],
            queryFn: async () => {
                const response = await axios.get(`Order/GetByUserId/${userId}`);
                return response.data.data.result;
            },
            ...opt
        })
    }
}