<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="submitData">
          <fieldset>
            <fieldset class="form-group">
                <input v-model="title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="tags" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button @click="submitData" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {getArticleDetail,createArticle,updateArticle} from '@/api/article'

export default {
  name: 'editor',
  middleware: 'auth',
  mounted() {
    console.log(this)
  },
  async asyncData ({params}) {
    console.log(params)
    if(params.slug) {
      const {data} = await getArticleDetail(params.slug)
      return {
        ...data.article,
        tags:data.article.tagList?.join(',')
      }
    }else {
      return {
        title:'',
        description:'',
        body:'',
        tags:'',
      }
    }
  },
  methods:{
    async submitData(){
      const tags = this?.tags?.split(',')||[];
      console.log(this)
      let res;
      if (!this.slug) {
        res = await createArticle({
          title:this.title,
          description:this.description,
          body:this.body,
          tagList:tags,
        });
        
      }else {
        res = await updateArticle({
          slug:this.slug,
          article:{
            title:this.title,
            description:this.description,
            body:this.body,
            tagList:tags,
          }
        })
      }
      const slug = res?.data?.article?.slug;
        if(slug) {
          this.$router.push({
            name:'article',
            params:{
              slug,
            }
          })
        }
    }
  }
}
</script>