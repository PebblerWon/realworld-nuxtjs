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
          v-if="!myArticle"
        >
          <i class="ion-plus-round"></i>
          &nbsp;
          {{article.author.following? 'unFollow':'Follow' }}&nbsp;&nbsp;{{article.author.username}}
        </button>
        <button 
          class="btn btn-sm btn-outline-primary"
          :class="{active: article.favorited}"
          @click="onLikeClick(article)"
          v-if="!myArticle"
        >
          <i class="ion-heart"></i>
          {{article.favorited ? 'unFavorite':'Favorite'}} Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
        <button 
          class="btn btn-outline-secondary btn-sm"
          @click="onEdit(article)"
          v-if="myArticle"
        >
          <i class="ion-edit"></i>
          &nbsp;Edit Article
        </button>
        <button 
          class="btn btn-outline-danger btn-sm"
          @click="onDel(article)"
          v-if="myArticle"
        >
          <i class="ion-trash-a"></i>
          &nbsp;Del Article
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
import {getArticleDetail,likeArticle, unLikeArticle, delArticle} from '@/api/article';
import {follow,unFollow} from '@/api/profiles';
import ArticleComments from './components/article-comments'

export default {
  name: 'article',
  components:{
    ArticleComments,
  },
  async asyncData({params,store}) {
    const {data} = await getArticleDetail(params.slug);
    const {article} = data;
    return {
      article,
      myArticle: article.author.username === store.state.user.username
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
        await follow(article.author.username);
      }else {
        article.favorited = true;
        article.favoritesCount += 1;
        await unFollow(article.author.username);
      }
    },
    onEdit(article) {
      this.$router.push({
        name:'editor',
        params:{
          slug:article.slug,
        }
      })
    },
    async onDel(article) {
      const res = await delArticle(article.slug);
      this.$router.push({name:'home'})
    }
  }
}
</script>