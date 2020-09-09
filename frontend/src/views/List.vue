<template>
  <div>
    <div class="bg-primary p-3 text-white text-center h3">방 목록</div>
    <div
      v-if="lists.length"
      class="d-flex flex-wrap justify-content-center p-3"
    >
      <div
        class="border-top shadow ml-3 mt-3 card-wrapper"
        v-for="list in lists"
        :key="list.id"
      >
        <!-- <span :class="getImage(`img${list.id}`, list.Images[0].src)"></span> -->
        <!-- <div :ref="'img' + list.id"  ></div> -->
        <div
          v-if="list.image"
          class="post-image"
          :style="{ backgroundImage: `url(${list.image})` }"
        ></div>
        <!-- <img :src="list.image"> -->
        <div class="text-center">{{ list.title }}</div>
        <div class="border-top p-3 text-center">{{ list.content }}</div>
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
      imageList: [],
    };
  },
  async mounted() {
    // console.log(this.$route.query.search);
    // 검색 받을 때 리팩토링 진행하기
    const { data } = await postApi.getList(this.$route.query.search);
    console.log(data);
    // this.lists = data.room;

    // const srcList = data.room.map(li => li.Images);
    // console.log(srcList);
    for (const li of data.room) {
      console.log(li);
      if (li.Images.length) {
        const res = await postApi.getFile(li.Images[0].src);
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        this.lists.push({ ...li, image: window.URL.createObjectURL(blob) });
      }
    }
    //  await Promise.all(list.map(async(li) => {
    //     console.log(li);
    //       const res = await postApi.getFile(li[0].src);
    //      const blob = new Blob([res.data], { type: res.headers["content-type"] });
    //      return window.URL.createObjectURL(blob);
    //   }));
    // console.log(aa);
    // console.log(this.imageList);
  },
  methods: {
    // async getImage(id, src) {
    //   // console.log(id);
    //   // console.log("aa");
    //   const res = await postApi.getFile(src);
    //   // console.log(res);
    //   const blob = new Blob([res.data], { type: res.headers["content-type"] });
    //   const url = await window.URL.createObjectURL(blob);
    //   // console.log(url);
    //   // this.$refs[id][0].src = url;
    //   this.$refs[id][0].style.backgroundImage = `url(${url})`;
    //   this.$refs[id][0].classList.add("post-image");
    //   // document.querySelector(`#${id}`).src = url;
    //   return url;
    // },
    // setImageList (list){
    // }
  },
};
</script>

<style>
.post-image {
  width: 400px;
  height: 300px;
  background-size: cover;
}
.card-wrapper:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
