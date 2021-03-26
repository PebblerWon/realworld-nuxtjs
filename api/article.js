import { request } from '@/plugins/request';

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
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

export const likeArticle = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
export const unLikeArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}