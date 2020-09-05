<template>
  <div >
    <div class="bg-primary p-3 text-white text-center h3">방 목록 </div>
    <div v-if="lists.length" class="d-flex flex-wrap justify-content-center p-3">
    
    <div class="border-top shadow ml-3 card-wrapper" v-for="list in lists" :key="list.id">
      <span :class="getImage(`img${list.id}`, list.Images[0].src)"></span>
      <div :ref="'img' + list.id" ></div>
      <div class="text-center">{{ list.title }}</div>
      <div class="border-top p-3 text-center">{{list.content}}</div>
    </div>
  </div>
  </div>
</template>

<script>
import { postApi } from "../utils/axios";
export default {
  data() {
    return {
      lists: [],
      z: "",
    };
  },
  async mounted() {
    const { data } = await postApi.getList();
    console.log(data);
    this.lists = data.room;
  },
  methods: {
    async getImage(id, src) {
      console.log(id);
      console.log("aa");
      const res = await postApi.getFile(src);
      console.log(res);
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = await window.URL.createObjectURL(blob);
      console.log(url);
      // this.$refs[id][0].src = url;
      this.$refs[id][0].style.backgroundImage = `url(${url})`;
      this.$refs[id][0].classList.add("post-image");
      // document.querySelector(`#${id}`).src = url;
      // return url;
    },
  },
};
</script>

<style>
.post-image {
  width: 400px;
  height: 300px;
  background-size: cover;
}
.card-wrapper:hover{
  opacity: 0.5;
  cursor: pointer;
}
</style>
