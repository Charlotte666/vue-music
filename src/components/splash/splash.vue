<template>
  <div class="splash">
      <img src="./111.jpg">
  </div>
</template>

<script>
export default {
    mounted(){
        setTimeout(() => {
          this._showSplash()
        }, 2500)
    },
    methods:{
      _showSplash(){
          this.$router.push({
              path:'/appShow/recommend'
          })
      }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.splash 
  img
    position:fixed
    width:100%
    height:100%
//   #splash
//     position fixed
//     top 0
//     left 0
//     z-index 6
//     width 100%
//     height 100%
//     opacity 1
//     transition opacity .3s ease
//     box-sizing border-box
//     &.fade-enter,&.fade-leave-to
//       opacity 0;
</style>