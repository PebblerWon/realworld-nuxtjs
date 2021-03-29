import { request } from '@/plugins/request';

export const getArticleDetail = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
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

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

//添加评论
export const addComment = (params) => {
  return request({
    method: 'POST',
    url: `/api/articles/${params.slug}/comments`,
    data: {
      comment: {
        body: params.comment
      }
    }
  })
}

export const createArticle = (params) => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data: params,
  })
}
export const updateArticle = (params) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${params.slug}`,
    data:{ article:params.article},
  })
}
export const delArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}