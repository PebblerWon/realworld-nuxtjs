import { request } from '@/plugins/request';

export const login = (params) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: params
  })
}
export const update = (params) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: params
  })
}

export const register = (params) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: params
  })
}