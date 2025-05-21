import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import axios from 'axios'

export const addRegister = {
  useMutation: (opt?: Partial<UseMutationOptions<RegisterType, Error, AddRegisterType>>) => {
    return useMutation<RegisterType, Error, AddRegisterType>({
      mutationFn: async (register) => {
        const request = await axios.post(`User/Register`, register)
        return request.data.data
      },
      ...opt,
    })
  },
}