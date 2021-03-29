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
        <articles-list 
          v-bind:articles="articles"
          v-bind:articlesCount="articlesCount"
          v-bind:pageClick="pageClick"
          v-bind:limit="limit"
          v-bind:page="page"
        ></articles-list>
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
    </div>
  </div>

</div>
</template>
<script>
import {getArticles, getFeedArticles, getTags} from '@/api/article';
import {mapState} from 'vuex';
import ArticlesList from '@/components/articles-list';

export default {
  name: 'home',
  components:{
    ArticlesList
  },
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
    pageClick(page) {
      this.$router.push({
        name:'home',
        query:{
          page,
          tag:this.tag,
          tab:this.tab,
        }
      })
    }
  }
}
</script>