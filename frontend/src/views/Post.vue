<template>
  <div class="post-container">
    <PostComponent class="mt-5 ">
      <div slot="posting">
        <div class="text-center border-bottom p-3">위치 정보</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">주소</div>
          <div class="h-100 flex-container border-left" style="flex:5">
            <div class="d-flex">
              <!-- <input type="text"> -->
              <!-- <button class="bg-primary text-white border-0">주소 검색</button> -->
            </div>
          </div>
          <div
            ref="map"
            class="h-100  flex-container border-left"
            style="flex:5"
          >
            지도
          </div>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">옵션</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">주소</div>
          <div class="h-100 flex-container border-left" style="flex:5">
            <div class="d-flex">
              <!-- <input type="text"> -->
              <!-- <button class="bg-primary text-white border-0">주소 검색</button> -->
            </div>
          </div>
          <div
            ref="map"
            class="h-100  flex-container border-left"
            style="flex:5"
          >
            지도
          </div>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">제목</div>
        <div class="d-flex" style="height:300px;">
          <div>
              <b-form-checkbox-group
                v-model="selected"
                :options="options"
                buttons
                button-variant="primary"
                size="lg"
                name="buttons-2"
              ></b-form-checkbox-group>
          </div>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">이미지</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">주소</div>
          <div class="h-100 flex-container border-left" style="flex:5">
            <div class="d-flex">
              <!-- <input type="text"> -->
              <!-- <button class="bg-primary text-white border-0">주소 검색</button> -->
            </div>
          </div>
          <div
            ref="map"
            class="h-100  flex-container border-left"
            style="flex:5"
          >
            지도
          </div>
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
  data() {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],
    };
  },
  mounted() {
    console.log(this.$refs.map);
  },
};
</script>

<style>
.post-container {
  width: 1180px;
  margin: 40px auto;
}
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
