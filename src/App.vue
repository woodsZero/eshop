<template>
  <div id="app">
   
   <keep-alive>
   <router-view v-if="isRouterAlive"></router-view>
   </keep-alive>
   <!-- <router-view v-if="isRouterAlive"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  },
}
</script>

<style>

</style>
