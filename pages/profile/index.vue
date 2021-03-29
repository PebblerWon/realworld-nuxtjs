<template>
<div class="profile-page">
  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button 
            class="btn btn-sm btn-outline-secondary action-btn"
            @click="onFlowClick"
            v-if="!isMe"
          >
            <i class="ion-plus-round"></i>
             {{profile.following?'followed': `Follow ${profile.username}`}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link 
                class="nav-link" 
                :class="{
                  active: tab==='my'
                }" 
                :to="{
                  name:'profile',
                  params:{
                    username,
                  },
                  query:{
                    page:1,
                    tab:'my'
                  }
                }"
              >My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                class="nav-link" 
                :class="{
                  active: tab==='fav'
                }"
                :to="{
                  name:'profile',
                  params:{
                    username,
                  },
                  query:{
                    page:1,
                    tab:'fav'
                  }
                }"
              >Favorited Articles</nuxt-link>
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
    </div>
  </div>

</div>
</template>
<script>
import {getProfile,follow,unFollow} from '@/api/profiles'
import {getArticles} from '@/api/article'

import ArticlesList from '@/components/articles-list';

export default {
  name: 'profile',
  components:{
    ArticlesList
  },
  computed:{
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  data() {
    return {
      limit:20,
      articles:[],
      articlesCount:0,
    }
  },
  methods:{
    async getArticles () {
      const param = {limit:this.limit};
      if(this.tab === 'my') {
        param.author = this.username;
      }else if(this.tab === 'fav') {
        param.favorited = this.username;
      }
      const {data} = await getArticles(param)
      this.articles = data.articles;
      this.articlesCount = data.articlesCount;
    },
    pageClick(page) {
      console.log(page)
    },
    async onFlowClick() {
      let res;
      if(!this.profile.following) {
        res = await follow(this.username);
      }else {
        res = await unFollow(this.username);
      }
      this.profile = res.data.profile;
    },
  },
  async mounted() {
    this.getArticles();
  },
  async asyncData ({params,query,store}) {
    const {data} = await getProfile(params.username);
    return {
      tab:query.tab||'my',
      page: parseInt(query.page,10) || 1,
      profile: data.profile,
      username: params.username,
      isMe:params.username === store?.state?.user?.username
    }
  },
  watchQuery:['page','tab'],
  watch:{
    tab: function() {
      this.getArticles();
    },
  }
}
</script>