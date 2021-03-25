import request from '@/utils/request';

export const login = (params) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
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