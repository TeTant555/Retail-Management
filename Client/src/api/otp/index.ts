import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import axios from 'axios'

export const addOtp = {
  useMutation: (opt?: Partial<UseMutationOptions<OtpType, Error, AddOtpType>>) => {
    return useMutation<OtpType, Error, AddOtpType>({
      mutationFn: async (verify) => {
        const url = `User/VerifyEmail?email=${encodeURIComponent(verify.email)}&otp=${verify.otp}`;
        const request = await axios.post(url)
        return request.data.data
      },
      ...opt,
    })
  },
}