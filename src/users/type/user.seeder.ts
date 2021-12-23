export type IUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  is_admin: boolean;
};

export const users: IUser[] = [
  {
    name: 'admin',
    email: 'admin@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    is_admin: true,
  },
  {
    name: 'ucup',
    email: 'ucup@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    is_admin: false,
  },
  {
    name: 'udin',
    email: 'udin@email.com',
    password: 'password',
    avatar: 'https://via.placeholder.com/100',
    is_admin: false,
  },
];
