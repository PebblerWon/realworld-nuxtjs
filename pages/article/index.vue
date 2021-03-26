<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <div class="article-meta">
        <nuxt-link 
          :to="{
            name:'profile',
            params:{
              username: article.author.username
            }
          }"
        ><img :src="article.author.image" /></nuxt-link>
        <div class="info">
          <a href="" class="author">{{article.author.username}}</a>
          <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <button 
          class="btn btn-sm btn-outline-secondary"
          :class="{active: article.author.following}"
        >
          <i class="ion-plus-round"></i>
          &nbsp;
          {{article.author.following? 'unFollow':'Follow' }}&nbsp;&nbsp;{{article.author.username}}
        </button>
        <button 
          class="btn btn-sm btn-outline-primary"
          :class="{active: article.favorited}"
          @click="onLikeClick(article)"
        >
          <i class="ion-heart"></i>
          {{article.favorited ? 'unFavorite':'Favorite'}} Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12">
        {{article.body}}
      </div>
    </div>

    <hr />
    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <ArticleComments :article="article"/>
      </div>

    </div>

  </div>

</div>
</template>
<script>
import {getArticleDetail,likeArticle, unLikeArticle} from '@/api/article';
import ArticleComments from './components/article-comments'

export default {
  name: 'article',
  components:{
    ArticleComments,
  },
  async asyncData({params}) {
    const {data} = await getArticleDetail(params.slug);
    const {article} = data;
    return {
      article
    }
  },
  methods:{
    async onLikeClick(article) {
      if(article.favorited) {
        article.favorited = false;
        article.favoritesCount += -1;
        await unLikeArticle(article.slug);
      }else {
        article.favorited = true;
        article.favoritesCount += 1;
        await likeArticle(article.slug);
      }
    },
    async onFlowClick(article) {
      if(article.favorited) {
        article.favorited = false;
        article.favoritesCount += -1;
        await unLikeArticle(article.slug);
      }else {
        article.favorited = true;
        article.favoritesCount += 1;
        await likeArticle(article.slug);
      }
    },
  }
}
</script>