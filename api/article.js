import { request } from '@/plugins/request';

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}