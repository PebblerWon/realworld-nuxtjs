<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link 
                class="nav-link"
                :class="{active: tab == 'your'}"
                :to="{
                  name:'home',
                  query:{
                    page:1,
                    tab:'your',
                  }
                }"
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item" >
              <nuxt-link 
                class="nav-link"
                :class="{active: tab == 'global'}"
                :to="{
                  name:'home',
                  query:{
                    tab:'global',
                    page:1,
                  }
                }"
              >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link
                class="nav-link"
                :class="{active: tab === 'tag'}" 
                :to="{
                  name:'home',
                  query:{
                    page:1,
                    tag,
                    tab:'tag',
                  }
                }"
              >{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <template v-for="article in articles" >
          <div class="article-preview" :key="article.slug">
            <div class="article-meta">
              <a href="profile.html"><img :src="article.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{article.author.username}}</a>
                <span class="date">{{article.createdAt | date()}}</span>
              </div>
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: article.favorited}"
                @click="onLikeClick(article)"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </template>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <template v-for="tag in tags">
              <NuxtLink :key="tag" :to="{name:'home',query:{tag,tab:'tag'}}" class="tag-pill tag-default">{{tag}}</NuxtLink>
            </template>
          </div>
        </div>
      </div>

      <nav>
        <ul class="pagination">
          <li
            class="page-item"
            :class="{active: item == page}"
            v-for="item in totalPage"
            :key="item"
          >
            <nuxt-link
              class="page-link"
              :to="{
                name:'home',
                query:{
                  page:item,
                  tag,
                  tab,
                }
              }"
            >
              {{item}}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>

</div>
</template>
<script>
import {getArticles, getFeedArticles, getTags, likeArticle, unLikeArticle} from '@/api/article';
import {mapState} from 'vuex';

export default {
  name: 'home',
  computed:{
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  watchQuery:['page','tab','tag'],
  async asyncData({query}) {
    const limit = 20;
    const page = +query.page || 1;
    const tab = query.tab || 'global';
    const tag = query.tag
    const articleParams = {
      limit,
      offset:(page-1)*limit,
      tag,
    }
    const [articleRes, tagRes] = await Promise.all([
      tab === 'your' ? getFeedArticles(articleParams) : getArticles(articleParams),
      getTags()
    ])

    const {articles, articlesCount} = articleRes.data;
    const {tags} = tagRes.data;
    return {
      tags,
      articles,
      articlesCount,
      limit,
      page,
      tab,
      tag,
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
    }
  }
}
</script>