type LoginType = {
  token: string;
  userId: number;
  email: string;
  emailStatus: boolean;
  token: string;
  passwordStatus: boolean;
};

type AddLoginType = {
  email: string;
  password: string;
};

module.export = { AddLoginType, LoginType };
