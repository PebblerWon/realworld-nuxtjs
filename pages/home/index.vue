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
              <a class="nav-link" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        <template v-for="article in articles" >
          <div class="article-preview" :key="article.slug">
            <div class="article-meta">
              <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">{{article.author.username}}</a>
                <span class="date">{{article.createdAt | date()}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </template>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <template v-for="tag in tags">
              <NuxtLink :key="tag" :to="{name:'home',query:{tag,}}" class="tag-pill tag-default">{{tag}}</NuxtLink>
            </template>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import {getArticles, getTags} from '@/api/article';
import {mapState} from 'vuex';

export default {
  name: 'home',
  computed:{
    ...mapState(['user']),
  },
  async asyncData({params}) {
    const {data: articleData} = await getArticles();
    const {articles, articlesCount} = articleData;

    const {data: tagData} = await getTags();
    const {tags} = tagData;
    return {
      tags,
      articles,
      articlesCount,
    }
  }
}
</script>