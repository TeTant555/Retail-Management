import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import axios from 'axios'

export const addLogin = {
  useMutation: (opt?: Partial<UseMutationOptions<LoginType, Error, AddLoginType>>) => {
    return useMutation<LoginType, Error, AddLoginType>({
      mutationFn: async (login) => {
        const request = await axios.post(`Login/LoginWeb`, login)
        return request.data.data
      },
      ...opt,
    })
  },
}