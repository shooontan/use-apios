import axios from 'axios';

export const http = axios.create({
  baseURL: '/api',
});

type User = {
  id: string;
  name: string;
  old?: number;
};

export type GetRes = {
  request: boolean;
  user: User;
};

export type PostReq = User;

export type PostRes = {
  request: boolean;
  user: User;
};

export const get = () => http.get<GetRes>('/user');

export const post = (data: PostReq) => http.post<PostRes>('/user', data);
