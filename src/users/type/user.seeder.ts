export type IUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
};

export const users: IUser[] = [
  {
    name: 'admin',
    email: 'admin@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    isAdmin: true,
  },
  {
    name: 'ucup',
    email: 'ucup@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    isAdmin: false,
  },
  {
    name: 'udin',
    email: 'udin@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    isAdmin: false,
  },
];
