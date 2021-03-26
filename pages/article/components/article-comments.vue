<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea v-model="commentInput" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button type="button" class="btn btn-sm btn-primary" @click="submitComment()">
          Post Comment
        </button>
      </div>
    </form>
        
    <div 
      class="card" 
      v-for="comment in comments" 
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getComments, addComment} from '@/api/article';
import {mapState} from 'vuex';
export default {
  name: 'article-comments',
  props: {
    article:{
      type:Object,
      required:true,
    }
  },
  computed:{
    ...mapState(['user']),
  },
  data () {
    return {
      commentInput:'',
      comments:[],
    }
  },
  methods:{
    async submitComment() {
      await addComment({
        slug: this.article.slug,
        comment: this.commentInput
      });
      this.commentInput=''
      this.getAllComments();
    },
    async getAllComments() {
      const {data} = await getComments(this.article.slug);
      this.comments = data.comments;
    }
  },
  async mounted() {
    this.getAllComments();
  }
}
</script>