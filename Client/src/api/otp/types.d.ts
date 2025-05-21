type OtpType = {
    message: string
    status: number
    data: {
        userID: number
        name: string
        email: string
        password: string
        status: string
        role: string
    }
}

type AddOtpType = {
    email: string
    otp: number
}