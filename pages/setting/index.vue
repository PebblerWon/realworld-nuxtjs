<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" name="f">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {update} from '@/api/users';
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  middleware:'auth',
  name: 'setting',
  data() {
    return {
      user:{}
    }
  },
  mounted() {
    const initialValue = this.$store.state.user;
    this.user = {...initialValue}
  },
  methods:{
    async onSubmit() {
      const {data} = await update(this.user);
      const user = data.user;
      if(user.token !== this.$store.state.user.token) {
        this.$store.commit('setUser', '')
        Cookie.set('user', '')
        this.$router.push({
          name:'login'
        })
      }else {
        this.$store.commit('setUser', user)
        Cookie.set('user', user)
      }
    }
  }
}
</script>