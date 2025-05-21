type RegisterType = {
  message: string;
  userID: number;
  name: string;
  email: string;
  password: string;
  status: string;
  otp: number;
  role: string;
};
type AddRegisterType = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
