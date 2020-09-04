<template>
  <div class="post-container">
    <PostComponent>
      <div slot="posting">
        <div class="text-center border-bottom ">위치 정보</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">주소</div>
          <div class="h-100 flex-container border-left" style="flex:5">주소</div>
          <div ref="map" class="h-100  flex-container border-left" style="flex:5">지도</div>
        </div>
      </div>
    </PostComponent>
    <!-- aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -->
  </div>
</template>

<script>
import PostComponent from "../components/PostComponent";
export default {
  components: {
    PostComponent,
  },
  mounted(){
    console.log(this.$refs.map);
  }
};
</script>

<style>
.post-container {
  width: 1180px;
  margin-left: auto;
  margin-right: auto;
}
.flex-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
