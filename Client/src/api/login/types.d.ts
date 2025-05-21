type LoginType = {
  message: string,
  status: number,
  token: string
  data: {
      userId: number
      email: string
      emailStatus: boolean
      token: string
      passwordStatus: boolean
  }
}
  
type AddLoginType = {
  email: string
  password: string
}
  
module.export = { AddLoginType, LoginType }