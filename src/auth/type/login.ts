type User = {
  email: string;
  name: string;
  avatar: string;
};

export type SuccessLogin = User & { _token: string };
