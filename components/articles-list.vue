<template>
  <div>
    <template v-for="article in articles" >
      <div class="article-preview" :key="article.slug">
        <div class="article-meta">
          <a href="profile.html"><img :src="article.author.image" /></a>
          <div class="info">
            <nuxt-link 
              :to="{
                name:'profile',
                params:{
                  username: article.author.username
                }
              }"
              class="author"
            >{{article.author.username}}</nuxt-link>
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
        <nuxt-link 
          :to="{
            name:'article',
            params:{
              slug:article.slug
            }
          }" 
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
        </nuxt-link>
      </div>
    </template>
    <nav>
      <ul class="pagination">
        <li
          class="page-item"
          :class="{active: item == page}"
          v-for="item in totalPage"
          :key="item"
        >
          <span
            class="page-link" 
            @click="pageClick(item)" 
            style="cursor: pointer"
          >
            {{item}}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

import { likeArticle, unLikeArticle} from '@/api/article';
export default {
  name: 'articles-list',
  computed:{
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  props: {
    articles:{
      type:Array,
      required:true,
    },
    articlesCount:{
      type:Number,
      required:true,
    },
    pageClick:{
      type:Function,
      required:true,
    },
    limit:{
      type:Number,
      default:20,
    },
    page:{
      type:Number,
      default:1,
    }
  },
  data () {
    return {}
  },
  methods: {
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
  },
}
</script>