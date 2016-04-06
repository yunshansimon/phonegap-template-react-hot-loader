<style scope>
  .home{
    position: relative;
    top:50%;
    margin: auto;
  }


</style>

<template>
  <div class="home">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data(){
      return {msg:'hello world!'}
    },
    route:{
      data({next}){
        this.msg += 'route once'
        next()
      }
    }

  }


</script>
