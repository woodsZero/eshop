<template>
<div class="index">
    <router-view></router-view>
    <foot-nav></foot-nav>
</div>
</template>
<script>
import footNav from './views/footNav'
export default {
    components:{
        footNav
    }
};
</script>
<style scoped>

</style>