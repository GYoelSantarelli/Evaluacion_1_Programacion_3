import { IUser } from '../types/IUser';

export const getUsers = (): IUser[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: IUser): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = (): IUser | null => {
  const user = localStorage.getItem('userData');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: IUser): void => {
  localStorage.setItem('userData', JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem('userData');
};